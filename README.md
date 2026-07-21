# 🛒 E-Commerce REST API

This is a backend **E-Commerce REST API** built using **Node.js**, **Express.js**, and **MongoDB**. The project follows the **MVC (Model-View-Controller)** architecture and includes APIs for managing products, categories, shopping carts, and orders.

The goal of this project was to practice building a real-world REST API while applying concepts like CRUD operations, MongoDB relationships, filtering, searching, sorting, pagination, and error handling.

---

## 🔗 GitHub Repository

Repository Link:

https://github.com/MoMedhat2008/ecommerce-api

---

# 🛠 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Async Handler
- CORS
- Dotenv
- Postman
- Nodemon

---

# 📂 Project Structure

```text
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

### Folder Responsibilities

- **Models** → Define database schemas (Category, Product, Cart, Order).
- **Controllers** → Contain application logic and business rules.
- **Routes** → Define API endpoints.
- **Middleware** → Handle centralized errors and other middleware functions.
- **Config** → Contains MongoDB connection setup.
- **Seed** → Insert sample categories and products into the database.

---

# ✨ Features

## 📁 Categories

- Create a category
- Get all categories
- Get category by ID
- Update category
- Delete category
- Prevent deleting categories that still contain active products

---

## 📦 Products

- Create product
- Get all products
- Get single product
- Update product
- Delete product

### Additional Features

- 🔍 Search products by name

Example:

```
GET /api/products?keyword=mac
```

- 🗂 Filter products by category

```
GET /api/products?category=<categoryId>
```

- 📦 Filter by stock availability

```
GET /api/products?inStock=true
```

- ↕️ Sort products

Ascending:

```
GET /api/products?sort=price
```

Descending:

```
GET /api/products?sort=-price
```

- 📄 Pagination

```
GET /api/products?page=1&limit=5
```

- Populate category information using Mongoose `populate()`

---

# 🛒 Cart

Features:

- Add products to cart
- Validate inventory before adding products
- View cart with calculated total price
- Update product quantity
- Remove product from cart
- Clear cart

---

# 📦 Orders

Features:

- Create order from cart
- Check product stock before checkout
- Deduct inventory after successful order
- Automatically clear cart after checkout
- Get all orders
- Get single order details
- Update order status

---

# 🚀 Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/MoMedhat2008/ecommerce-api.git
```

---

## 2. Enter Project Folder

```bash
cd ecommerce-api
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 5. Run Application

Development mode:

```bash
npm run dev
```

Normal mode:

```bash
npm start
```

---

# 🌱 Seed Database

To insert sample categories and products:

```bash
npm run seed
```

---

# 📌 API Endpoints

## Categories

```http
GET     /api/categories
GET     /api/categories/:id
POST    /api/categories
PUT     /api/categories/:id
PATCH   /api/categories/:id
DELETE  /api/categories/:id
```

---

## Products

```http
GET     /api/products
GET     /api/products/:id
POST    /api/products
PUT     /api/products/:id
PATCH   /api/products/:id
DELETE  /api/products/:id
```

---

## Cart

```http
GET     /api/cart
POST    /api/cart
PUT     /api/cart/:productId
PATCH   /api/cart/:productId
DELETE  /api/cart/:productId
DELETE  /api/cart
```

---

## Orders

```http
GET     /api/orders
GET     /api/orders/:id
POST    /api/orders
PUT     /api/orders/:id
PATCH   /api/orders/:id
```

---

# 📬 Testing

All API requests are available in the Postman collection inside the repository.

Steps:

1. Open Postman
2. Import the collection
3. Test each endpoint
4. Check responses and status codes

---

# 📖 What I Learned

During this project, I practiced:

- Building RESTful APIs using Express.js
- Connecting applications with MongoDB
- Using Mongoose models and schemas
- Applying MVC architecture
- Creating CRUD operations
- Using MongoDB references and `populate()`
- Implementing:
  - Search
  - Filtering
  - Sorting
  - Pagination
- Handling errors using Express Async Handler
- Building shopping cart and order workflows
- Using Git and GitHub for version control

---

# 👨‍💻 Author

**Mohamed Medhat**

GitHub:

https://github.com/MoMedhat2008

Repository:

https://github.com/MoMedhat2008/ecommerce-api