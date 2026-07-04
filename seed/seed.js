const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Category = require("../models/Category");
const Product = require("../models/Product");

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ======================
// Categories
// ======================
const categoryData = [
  {
    name: "Electronics & Accessories",
    description: "Updated description",
  },
  {
    name: "Clothing",
    description: "Clothes and fashion products",
  },
  {
    name: "Books",
    description: "Books and educational materials",
  },
  {
    name: "Sports",
    description: "Sports equipment and accessories",
  },
];

// ======================
// Products
// ======================
const productData = [
  {
    name: "MacBook Pro",
    price: 15000,
    category: "Electronics & Accessories",
    inStock: true,
  },
  {
    name: "Samsung Galaxy S25",
    price: 1200,
    category: "Electronics & Accessories",
    inStock: true,
  },
  {
    name: "Dell XPS 15",
    price: 2200,
    category: "Electronics & Accessories",
    inStock: true,
  },
  {
    name: "Nike T-Shirt",
    price: 300,
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Nike Air Max 270",
    price: 180,
    category: "Clothing",
    inStock: false,
  },
  {
    name: "Adidas Hoodie",
    price: 80,
    category: "Clothing",
    inStock: true,
  },
  {
    name: "Clean Code",
    price: 45,
    category: "Books",
    inStock: true,
  },
  {
    name: "The Pragmatic Programmer",
    price: 50,
    category: "Books",
    inStock: false,
  },
  {
    name: "JavaScript: The Good Parts",
    price: 35,
    category: "Books",
    inStock: false,
  },
  {
    name: "Adidas Football",
    price: 40,
    category: "Sports",
    inStock: true,
  },
  {
    name: "Nike Goalkeeper Gloves",
    price: 60,
    category: "Sports",
    inStock: false,
  },
  {
    name: "Skipping Rope",
    price: 15,
    category: "Sports",
    inStock: true,
  },
];

// ======================
// Import Data
// ======================
const importData = async () => {
  try {
    // Delete old data
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Old data deleted");

    // Insert categories
    const categories = await Category.insertMany(categoryData);

    console.log("Categories inserted");

    // Create category map
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    // Replace category names with ObjectIds
    const products = productData.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    // Insert products
    await Product.insertMany(products);

    console.log("Products inserted");
    console.log("Database seeded successfully!");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();