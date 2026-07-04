const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");

// @desc    Get all products
// @route   GET /api/products
exports.getProducts = asyncHandler(async (req, res) => {
  let query = {};

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by stock
  if (req.query.inStock !== undefined) {
    query.inStock = req.query.inStock === "true";
  }

  // Search by product name
  if (req.query.keyword) {
    query.name = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  let productsQuery = Product.find(query).populate("category");

  // Sorting
  if (req.query.sort) {
    productsQuery = productsQuery.sort(req.query.sort);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const skip = (page - 1) * limit;

  productsQuery = productsQuery.skip(skip).limit(limit);

  const products = await productsQuery;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// @desc    Get single product
// @route   GET /api/products/:id
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Create a product
// @route   POST /api/products
exports.createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

// @desc    Update a product
// @route   PUT /api/products/:id
exports.updateProduct = asyncHandler(async (req, res) => {
  // If category is being updated, make sure it exists
  if (req.body.category) {
    const category = await Category.findById(req.body.category);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).populate("category");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: product,
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});