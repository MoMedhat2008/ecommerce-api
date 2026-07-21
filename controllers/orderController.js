const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// @desc    Create new order (Checkout)
// @route   POST /api/orders
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;

  if (!shippingAddress) {
    return next(new AppError("Shipping address is required to place an order", 400));
  }

  // 1. Fetch Cart with populated products
  const cart = await Cart.findOne().populate("items.product");

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty. Add products before checking out.", 400));
  }

  const orderItems = [];
  let totalPrice = 0;

  // 2. Validate product availability & prepare order items
  for (const item of cart.items) {
    const product = item.product;

    if (!product) {
      return next(new AppError("One or more items in your cart no longer exist", 404));
    }

    if (product.stock < item.quantity) {
      return next(
        new AppError(`Insufficient stock for product: "${product.name}". Available: ${product.stock}`, 400)
      );
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });

    totalPrice += product.price * item.quantity;
  }

  // 3. Deduct stock levels from Product inventory
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // 4. Generate Order Number & Create Order
  const orderNumber = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const order = await Order.create({
    orderNumber,
    items: orderItems,
    totalPrice,
    shippingAddress,
    status: "pending",
  });

  // 5. Clear Cart Items
  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    data: order,
  });
});

// @desc    Get all orders
// @route   GET /api/orders
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().sort("-createdAt");

  res.status(200).json({
    status: "success",
    message: "Orders fetched successfully",
    count: orders.length,
    data: orders,
  });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("items.product", "name price images");

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order fetched successfully",
    data: order,
  });
});

// @desc    Update order status
// @route   PATCH /api/orders/:id/status (or PUT /api/orders/:id)
exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  if (!status || !validStatuses.includes(status)) {
    return next(
      new AppError(`Invalid status. Allowed values: ${validStatuses.join(", ")}`, 400)
    );
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    data: order,
  });
});