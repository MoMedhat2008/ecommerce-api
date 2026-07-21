const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/connectDB.js');
const productRoutes = require('./routes/productRoutes.js');
const categoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./middleware/error");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
// Load environment config
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Mount Routing Files
app.use('/api/products', productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use(errorHandler);

const PORT = process.env.PORT ||5000;

app.listen(PORT, () => {
  console.log(`Server running in environment mode on port: ${PORT}`);
});
