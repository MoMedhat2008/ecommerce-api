const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

// Base routes: /api/orders
router
  .route("/")
  .post(createOrder)
  .get(getOrders);

// ID-specific routes: /api/orders/:id
router
  .route("/:id")
  .get(getOrder)
  .put(updateOrderStatus)
  .patch(updateOrderStatus); // Added to support standard status updates

module.exports = router;