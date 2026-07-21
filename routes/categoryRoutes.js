const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Base routes: /api/categories
router
  .route("/")
  .get(getCategories)
  .post(createCategory);

// ID-specific routes: /api/categories/:id
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .patch(updateCategory) // Added to support partial updates
  .delete(deleteCategory);

module.exports = router;