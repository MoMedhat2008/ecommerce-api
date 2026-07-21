const Category = require("../models/Category");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// @desc    Get all categories
// @route   GET /api/categories
exports.getCategories = asyncHandler(async (req, res, next) => {
  const { name, sort } = req.query;
  let query = {};

  // Filter by Name
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }

  let categoriesQuery = Category.find(query);

  // Sorting
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    categoriesQuery = categoriesQuery.sort(sortBy);
  } else {
    categoriesQuery = categoriesQuery.sort("name");
  }

  const categories = await categoriesQuery;

  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    count: categories.length,
    data: categories,
  });
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category,
  });
});

// @desc    Create a new category
// @route   POST /api/categories
exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  if (!name) {
    return next(new AppError("Category name is required", 400));
  }

  // Check for duplicate category name
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return next(new AppError("Category with this name already exists", 409));
  }

  const category = await Category.create({ name, description });

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

// @desc    Update a category
// @route   PUT /api/categories/:id (or PATCH)
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;
  let updateData = {};

  if (description !== undefined) updateData.description = description;

  if (name) {
    updateData.name = name;
    updateData.slug = name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  }

  const category = await Category.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
});

// @desc    Delete a category
// @route   DELETE /api/categories/:id
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  // Prevent deletion if products are linked to this category
  const associatedProducts = await Product.countDocuments({ category: req.params.id });

  if (associatedProducts > 0) {
    return next(
      new AppError(
        `Cannot delete category. It is associated with ${associatedProducts} product(s).`,
        400
      )
    );
  }

  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: null,
  });
});