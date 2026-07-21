const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// @desc    Get all products (with filtering, sorting, and pagination)
// @route   GET /api/products
exports.getProducts = asyncHandler(async (req, res, next) => {
  const { category, minPrice, maxPrice, inStock, keyword, sort, page = 1, limit = 10 } = req.query;
  let query = {};

  // Filter by Category
  if (category) {
    query.category = category;
  }

  // Filter by Price Range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Filter by Stock Status
  if (inStock !== undefined) {
    query.inStock = inStock === "true";
  }

  // Search Keyword (Name or Description)
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  // Pagination Math
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));
  const skip = (pageNum - 1) * limitNum;

  // Build Query
  let productsQuery = Product.find(query)
    .populate("category", "name description slug")
    .skip(skip)
    .limit(limitNum);

  // Apply Sorting (Default to newest first)
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    productsQuery = productsQuery.sort(sortBy);
  } else {
    productsQuery = productsQuery.sort("-createdAt");
  }

  // Execute Query & Count
  const totalProducts = await Product.countDocuments(query);
  const products = await productsQuery;

  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    results: products.length,
    pagination: {
      total: totalProducts,
      page: pageNum,
      pages: Math.ceil(totalProducts / limitNum),
      limit: limitNum,
    },
    data: products,
  });
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category", "name description slug");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
});

// @desc    Create a new product
// @route   POST /api/products
exports.createProduct = asyncHandler(async (req, res, next) => {
  // Validate Category Existence
  const category = await Category.findById(req.body.category);
  if (!category) {
    return next(new AppError("Referenced category does not exist", 404));
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: product,
  });
});

// @desc    Update an existing product
// @route   PUT /api/products/:id
exports.updateProduct = asyncHandler(async (req, res, next) => {
  // If Category is being updated, validate existence
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return next(new AppError("Referenced category does not exist", 404));
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("category", "name description slug");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: null,
  });
});