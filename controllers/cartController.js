const Product = require("../models/Product");
const Cart = require("../models/Cart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Helper function to calculate total cart price
const recalculateCartTotal = (cart) => {
  cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

// @desc    Get current active Cart
// @route   GET /api/cart
exports.getCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne().populate("items.product", "name price images stock");

  if (!cart) {
    cart = await Cart.create({ items: [], totalPrice: 0 });
  }

  res.status(200).json({
    status: "success",
    message: "Cart fetched successfully",
    data: cart,
  });
});

// @desc    Add product to Cart
// @route   POST /api/cart or POST /api/cart/items
exports.addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const qty = Number(quantity);

  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  if (isNaN(qty) || qty < 1) {
    return next(new AppError("Quantity must be a positive number greater than 0", 400));
  }

  // 1. Check Product existence & stock
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  if (product.stock < qty) {
    return next(
      new AppError(`Requested quantity exceeds available stock (${product.stock} available)`, 400)
    );
  }

  // 2. Fetch or create cart
  let cart = await Cart.findOne();
  if (!cart) {
    cart = new Cart({ items: [], totalPrice: 0 });
  }

  // 3. Check if product already exists in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    const totalQty = cart.items[itemIndex].quantity + qty;
    if (product.stock < totalQty) {
      return next(
        new AppError(
          `Cannot add more. Total in cart (${totalQty}) would exceed available stock (${product.stock})`,
          400
        )
      );
    }
    cart.items[itemIndex].quantity = totalQty;
    cart.items[itemIndex].price = product.price;
  } else {
    cart.items.push({
      product: product._id,
      quantity: qty,
      price: product.price,
    });
  }

  recalculateCartTotal(cart);
  await cart.save();

  // Populate product info before returning
  await cart.populate("items.product", "name price images stock");

  res.status(200).json({
    status: "success",
    message: "Item added to cart",
    data: cart,
  });
});

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:productId or PATCH /api/cart/items/:productId
exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const qty = Number(quantity);

  const cart = await Cart.findOne();
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return next(new AppError("Product not found in cart", 404));
  }

  // If quantity set to 0 or negative, remove item
  if (qty <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    const product = await Product.findById(productId);
    if (product && product.stock < qty) {
      return next(
        new AppError(`Requested quantity exceeds available stock (${product.stock} available)`, 400)
      );
    }
    cart.items[itemIndex].quantity = qty;
    if (product) cart.items[itemIndex].price = product.price;
  }

  recalculateCartTotal(cart);
  await cart.save();

  await cart.populate("items.product", "name price images stock");

  res.status(200).json({
    status: "success",
    message: "Cart item updated",
    data: cart,
  });
});

// @desc    Remove single product from Cart
// @route   DELETE /api/cart/:productId or DELETE /api/cart/items/:productId
exports.removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  const initialLength = cart.items.length;
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  if (cart.items.length === initialLength) {
    return next(new AppError("Product not found in cart", 404));
  }

  recalculateCartTotal(cart);
  await cart.save();

  await cart.populate("items.product", "name price images stock");

  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    data: cart,
  });
});

// @desc    Clear all items in Cart
// @route   DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({ items: [], totalPrice: 0 });
  } else {
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }

  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: cart,
  });
});