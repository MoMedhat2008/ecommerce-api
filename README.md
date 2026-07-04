# 🛒 E-Commerce REST API

This is a backend E-Commerce REST API that I built using **Node.js**, **Express.js**, and **MongoDB**. The project follows the MVC (Model-View-Controller) architecture and includes APIs for managing products, categories, shopping carts, and orders.

The goal of this project was to practice building a real-world REST API while applying concepts like CRUD operations, MongoDB relationships, filtering, searching, sorting, pagination, and error handling.

---

## 🔗 GitHub Repository

Repository Link:

https://github.com/MoMedhat2008/ecommerce-api

---

## 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Async Handler
- Postman
- Nodemon

---

## 📂 Project Structure

```
config/
controllers/
middleware/
models/
routes/
seed/
server.js
package.json
README.md
```

Each folder has its own responsibility:

- **Models** define the database schema.
- **Controllers** contain the application logic.
- **Routes** define the API endpoints.
- **Middleware** handles errors.
- **Config** stores the MongoDB connection.
- **Seed** is used to insert sample data into the database.

---

## ✨ Features

### Categories

- Create a category
- Get all categories
- Get a category by ID
- Update a category
- Delete a category

### Products

- Create a product
- Get all products
- Get a single product
- Update a product
- Delete a product

Extra features:

- Search products by name
- Filter products by category
- Filter products by stock availability
- Sort products by any field
- Pagination
- Populate category information

### Cart

- Add products to the cart
- View the cart
- Update product quantity
- Remove products from the cart
- Clear the cart

### Orders

- Create an order from the cart
- Automatically calculate the total price
- Clear the cart after checkout
- View all orders

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/MoMedhat2008/ecommerce-api.git
```

Move into the project folder:

```bash
cd ecommerce-api
```

Install the required packages:

```bash
npm install
```

Create a `.env` file and add your MongoDB connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm run dev
```

or

```bash
npm start
```

---

## 🌱 Seed the Database

To insert sample categories and products into MongoDB, run:

```bash
node seed/seed.js
```

---

## 📌 API Endpoints

### Categories

- GET `/api/categories`
- GET `/api/categories/:id`
- POST `/api/categories`
- PUT `/api/categories/:id`
- DELETE `/api/categories/:id`

### Products

- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

Query examples:

```
GET /api/products?keyword=mac

GET /api/products?category=<categoryId>

GET /api/products?inStock=true

GET /api/products?sort=price

GET /api/products?sort=-price

GET /api/products?page=1&limit=5
```

### Cart

- GET `/api/cart`
- POST `/api/cart`
- PUT `/api/cart/:productId`
- DELETE `/api/cart/:productId`
- DELETE `/api/cart`

### Orders

- GET `/api/orders`
- POST `/api/orders`

---

## 📬 Testing

All API requests are included in the Postman collection inside the repository.

Import the collection into Postman and test each endpoint directly.

---

## 📖 What I Learned

While building this project, I practiced:

- Building RESTful APIs with Express.js
- Working with MongoDB using Mongoose
- Organizing projects using the MVC architecture
- Creating CRUD operations
- Using references and `populate()`
- Implementing search, filtering, sorting, and pagination
- Handling errors with Express Async Handler
- Managing a shopping cart and order workflow
- Using Git and GitHub for version control

---

## 👨‍💻 Author

**Mohamed Medhat**

GitHub: https://github.com/MoMedhat2008

Repository: https://github.com/MoMedhat2008/ecommerce-api

---

thank you