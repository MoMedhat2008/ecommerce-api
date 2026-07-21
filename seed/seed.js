const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Category = require("../models/Category");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

dotenv.config();

// ======================
// Category Data
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
// Product Data
// ======================
const productData = [
  {
    name: "MacBook Pro",
    price: 15000,
    category: "Electronics & Accessories",
    inStock: true,
    stock: 10,
  },
  {
    name: "Samsung Galaxy S25",
    price: 1200,
    category: "Electronics & Accessories",
    inStock: true,
    stock: 15,
  },
  {
    name: "Dell XPS 15",
    price: 2200,
    category: "Electronics & Accessories",
    inStock: true,
    stock: 8,
  },
  {
    name: "Nike T-Shirt",
    price: 300,
    category: "Clothing",
    inStock: true,
    stock: 50,
  },
  {
    name: "Nike Air Max 270",
    price: 180,
    category: "Clothing",
    inStock: false,
    stock: 0,
  },
  {
    name: "Adidas Hoodie",
    price: 80,
    category: "Clothing",
    inStock: true,
    stock: 25,
  },
  {
    name: "Clean Code",
    price: 45,
    category: "Books",
    inStock: true,
    stock: 30,
  },
  {
    name: "The Pragmatic Programmer",
    price: 50,
    category: "Books",
    inStock: false,
    stock: 0,
  },
  {
    name: "JavaScript: The Good Parts",
    price: 35,
    category: "Books",
    inStock: false,
    stock: 0,
  },
  {
    name: "Adidas Football",
    price: 40,
    category: "Sports",
    inStock: true,
    stock: 20,
  },
  {
    name: "Nike Goalkeeper Gloves",
    price: 60,
    category: "Sports",
    inStock: false,
    stock: 0,
  },
  {
    name: "Skipping Rope",
    price: 15,
    category: "Sports",
    inStock: true,
    stock: 40,
  },
  {
    name: "Apple AirPods Pro",
    price: 249,
    category: "Electronics & Accessories",
    inStock: true,
    stock: 18,
  },
  {
    name: "Logitech MX Master 3S",
    price: 99,
    category: "Electronics & Accessories",
    inStock: true,
    stock: 12,
  },
  {
    name: "Samsung 27-inch Monitor",
    price: 320,
    category: "Electronics & Accessories",
    inStock: false,
    stock: 0,
  },
  {
    name: "Levi's 501 Jeans",
    price: 75,
    category: "Clothing",
    inStock: true,
    stock: 35,
  },
  {
    name: "Puma Running Shoes",
    price: 95,
    category: "Clothing",
    inStock: true,
    stock: 22,
  },
  {
    name: "Under Armour Jacket",
    price: 120,
    category: "Clothing",
    inStock: false,
    stock: 0,
  },
  {
    name: "Atomic Habits",
    price: 28,
    category: "Books",
    inStock: true,
    stock: 60,
  },
  {
    name: "Deep Work",
    price: 32,
    category: "Books",
    inStock: true,
    stock: 45,
  },
  {
    name: "Design Patterns",
    price: 55,
    category: "Books",
    inStock: false,
    stock: 0,
  },
  {
    name: "Basketball",
    price: 30,
    category: "Sports",
    inStock: true,
    stock: 15,
  },
  {
    name: "Yoga Mat",
    price: 25,
    category: "Sports",
    inStock: true,
    stock: 30,
  },
  {
    name: "Dumbbell Set",
    price: 110,
    category: "Sports",
    inStock: false,
    stock: 0,
  },
];

// ======================
// Import Script Execution
// ======================
const importData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    // 1. Delete old data across all collections
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    console.log("Old database records cleared.");

    // 2. Insert Categories
    const categories = await Category.insertMany(categoryData);
    console.log(`Inserted ${categories.length} Categories.`);

    // 3. Create Name-to-ID Category Map
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // 4. Map Products to Category ObjectIds
    const productsToInsert = productData.map((prod) => ({
      name: prod.name,
      price: prod.price,
      stock: prod.stock !== undefined ? prod.stock : (prod.inStock ? 10 : 0),
      inStock: prod.inStock,
      category: categoryMap[prod.category],
    }));

    // 5. Insert Products
    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`Inserted ${createdProducts.length} Products.`);

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error(`Seeding Failure: ${error.message}`);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
};

importData();