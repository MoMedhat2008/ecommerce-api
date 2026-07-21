const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

// Base cart routes: /api/cart
router
  .route("/")
  .get(getCart)
  .post(addToCart)
  .delete(clearCart);

// Item-specific routes: /api/cart/:productId
router
  .route("/:productId")
  .put(updateCartItem)
  .patch(updateCartItem) // Supports both PUT and PATCH for client flexibility
  .delete(removeFromCart);

module.exports = router;