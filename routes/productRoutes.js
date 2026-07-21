const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Base routes: /api/products
router
  .route("/")
  .get(getProducts)
  .post(createProduct);

// ID-specific routes: /api/products/:id
router
  .route("/:id")
  .get(getProduct)
  .put(updateProduct)
  .patch(updateProduct) // Added to support partial updates
  .delete(deleteProduct);

module.exports = router;
