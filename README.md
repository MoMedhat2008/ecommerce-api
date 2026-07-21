# 🛒 E-Commerce REST API

A backend **E-Commerce REST API** built using **Node.js**, **Express.js**, and **MongoDB**.

The project follows the **MVC (Model-View-Controller)** architecture and provides APIs for managing:

- Products
- Categories
- Shopping Cart
- Orders

The goal of this project was to practice building a real-world REST API while applying backend concepts such as:

- CRUD operations
- MongoDB relationships
- Mongoose models
- Search
- Filtering
- Sorting
- Pagination
- Error handling
- Reusable utility functions

---

# 🔗 GitHub Repository

Repository:

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
E-Commerce REST API

│
├── controllers/
│   └── productController.js
│
├── db/
│   └── Database connection files
│
├── middleware/
│   └── error.js
│
├── models/
│   ├── Product.js
│   ├── Category.js
│   ├── Cart.js
│   └── Order.js
│
├── routes/
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
├── seed/
│   └── seed.js
│
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

---

# 📁 Folder Responsibilities

## Controllers

Contains the application logic and handles requests/responses.

Example:

- Product operations
- Database queries
- Business logic

---

## Models

Contains MongoDB schemas using Mongoose.

Current models:

- Product
- Category
- Cart
- Order

Models define:

- Database structure
- Relationships
- Data validation

---

## Routes

Contains all API endpoints and connects routes with controllers.

Available routes:

- Product routes
- Category routes
- Cart routes
- Order routes

---

## Middleware

Contains reusable middleware functions.

Current middleware:

- `error.js`

Responsible for centralized error handling.

---

## Utils

Contains reusable helper functions.

Current utilities:

### asyncHandler.js

Used to handle asynchronous controller errors without repeating `try/catch`.

### AppError.js

Custom error class used for creating application-specific errors.

---

## DB

Contains MongoDB connection configuration.

Responsible for connecting the application with MongoDB database.

---

## Seed

Contains database seed files.

Used to insert sample:

- Categories
- Products

into MongoDB.

---

# ✨ Features

# 📁 Categories

Features:

- Create category
- Get all categories
- Get category by ID
- Update category
- Delete category

---

# 📦 Products

Features:

- Create product
- Get all products
- Get product by ID
- Update product
- Delete product

---

# 🔍 Product Advanced Features

## Search Products

Search by product name:

```http
GET /api/products?keyword=mac
```

---

## Filter Products

Filter by category:

```http
GET /api/products?category=<categoryId>
```

Filter by stock:

```http
GET /api/products?inStock=true
```

---

## Sort Products

Ascending:

```http
GET /api/products?sort=price
```

Descending:

```http
GET /api/products?sort=-price
```

---

## Pagination

Example:

```http
GET /api/products?page=1&limit=5
```

---

## Populate Relationships

Uses Mongoose:

```javascript
populate()
```

to return related category information.

---

# 🛒 Cart

Features:

- Add products to cart
- Validate product availability
- View cart items
- Calculate total price
- Update quantity
- Remove products
- Clear cart

---

# 📦 Orders

Features:

- Create order from cart
- Check product stock
- Deduct inventory after checkout
- Clear cart after successful order
- Get all orders
- Get order details
- Update order status

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/MoMedhat2008/ecommerce-api.git
```

---

## Enter Project Folder

```bash
cd ecommerce-api
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Run Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# 🌱 Seed Database

To insert sample data:

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

All API endpoints were tested using **Postman**.

Testing includes:

- Successful requests
- Invalid data testing
- Error handling
- CRUD operations
- Query features

---

# 📖 What I Learned

During this project, I practiced:

- Building REST APIs using Express.js
- Connecting MongoDB with Mongoose
- Designing database schemas
- Applying MVC architecture
- Creating CRUD operations
- Working with MongoDB relationships
- Using Mongoose `populate()`
- Implementing:
  - Search
  - Filtering
  - Sorting
  - Pagination
- Creating reusable utilities
- Handling errors professionally
- Managing shopping cart logic
- Building order workflows
- Using Git and GitHub

---

# 👨‍💻 Author

**Mohamed Medhat**

GitHub:

https://github.com/MoMedhat2008

Repository:

https://github.com/MoMedhat2008/ecommerce-api

Thank You for Reading