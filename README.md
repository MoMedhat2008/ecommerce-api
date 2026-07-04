# E-Commerce REST API

## Overview

This project is a RESTful API built with Node.js, Express.js, and MongoDB using the MVC architecture.

## Features

- Product CRUD
- Category CRUD
- Shopping Cart
- Orders
- Filtering
- Searching
- Sorting
- Pagination
- Database Seeding
- Error Handling

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-async-handler
- dotenv

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_connection_string
```

## Run Project

```bash
npm run dev
```

## Seed Database

```bash
npm run seed
```

## API Endpoints

### Products

- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

### Categories

- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id

### Cart

- GET /api/cart
- POST /api/cart
- PUT /api/cart/:productId
- DELETE /api/cart/:productId
- DELETE /api/cart

### Orders

- GET /api/orders
- POST /api/orders
- PUT /api/orders/:id