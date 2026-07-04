const Order = require("../models/Order");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

// @desc    Create Order
// @route   POST /api/orders
exports.createOrder = asyncHandler(async (req, res) => {

  const cart = await Cart.findOne().populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const items = cart.items.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    items,
    totalPrice,
  });

  // Clear cart after checkout
  cart.items = [];
  await cart.save();

  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc    Get All Orders
// @route   GET /api/orders
exports.getOrders = asyncHandler(async (req, res) => {

  const orders = await Order.find().populate("items.product");

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });

});

// @desc    Update Order Status
// @route   PUT /api/orders/:id
exports.updateOrderStatus = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status;

  await order.save();

  res.status(200).json({
    success: true,
    data: order,
  });

});