const Product = require("../models/Product");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

// @desc    Get Cart
// @route   GET /api/cart
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");

  if (!cart) {
    return res.status(200).json({
      success: true,
      data: {
        items: [],
      },
    });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// @desc    Add Product to Cart
// @route   POST /api/cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne();

  if (!cart) {
    cart = await Cart.create({
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  res.status(201).json({
    success: true,
    data: cart,
  });
});

// @desc    Update Cart Item Quantity
// @route   PUT /api/cart/:productId
exports.updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  const cart = await Cart.findOne();

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    res.status(404);
    throw new Error("Product not found in cart");
  }

  item.quantity = quantity;

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// @desc    Remove Product From Cart
// @route   DELETE /api/cart/:productId
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne();

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    data: cart,
  });
});

// @desc    Clear Cart
// @route   DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne();

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = [];

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    data: cart,
  });
});