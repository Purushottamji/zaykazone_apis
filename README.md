# 🚀 ZaykaZone API

Backend API for the ZaykaZone food delivery platform.

ZaykaZone API is a RESTful backend service that powers the ZaykaZone ecosystem, enabling seamless communication between customers, restaurants, delivery partners, and administrators. The API handles authentication, restaurant management, menu operations, order processing, user management, and real-time business workflows.

---

## 📋 Features

### 🔐 Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role-Based Access Control

### 👤 User Management

- Create User Account
- Update Profile
- Get User Details
- Manage Delivery Addresses

### 🏪 Restaurant Management

- Register Restaurant
- Update Restaurant Details
- Manage Restaurant Profile
- View Restaurant Information

### 🍔 Food Management

- Add Food Items
- Update Food Items
- Delete Food Items
- Get Restaurant Menu
- Manage Food Categories

### 🛒 Cart Management

- Add Items to Cart
- Update Quantity
- Remove Items
- View Cart Details

### 📦 Order Management

- Create Orders
- View Order History
- Get Order Details
- Update Order Status
- Cancel Orders

### 🚚 Delivery Management

- Assign Delivery Partner
- Track Delivery Status
- Update Delivery Progress

### 👨‍💼 Admin Features

- Manage Users
- Manage Restaurants
- Monitor Orders
- Dashboard Analytics
- Generate Reports

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MySQL

### Authentication

- JWT (JSON Web Token)
- bcrypt.js

### API Architecture

- RESTful APIs

### Development Tools

- Postman
- Git & GitHub

---

## 📂 Project Structure

```bash
zaykazone-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── restaurantController.js
│   ├── foodController.js
│   └── orderController.js
│   └── .....
│
├── middleware/
│   ├── authMiddleware.js
│   └── upload.js
│
├── models/
│   ├── userModel.js
│   ├── addModel.js
│   ├── favouritesModel.js
│   └── orderModel.js
│   └── token.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── restaurantRoutes.js
│   ├── foodRoutes.js
│   └── orderRoutes.js
│   └── ....
│
├── uploads/
│
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/zaykazone-api.git
```

### Navigate to Project

```bash
cd zaykazone-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=zaykazone

JWT_SECRET=your_secret_key
```

### Start Production Server

```bash
npm start
```

---

## 🔑 API Endpoints

### Authentication

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| POST   | /auth/register        | Register User        |
| POST   | /auth/login           | Login User           |
| POST   | /auth/refresh         | Refresh Token        |
| POST   | /auth/logout          | Logout User          |
| POST   | /auth/forgot-password | Forgot-Password User |
| POST   | /auth/login           | Login User           |

### Users

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /users            |
| PUT    | /users/update/:id |
| PATCH  | /users/patch/:id  |
| DELETE | /users/delete/:id |

### Restaurants

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /restaurant/all_res  |
| POST   | /restaurant/post_res |
| PUT    | /restaurant/:res_id  |
| DELETE | /restaurant/:res_id  |

### Adding Restaurants Food

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | /restaurant/:res_id/food |
| PUT    | /restaurant/:res_id      |
| PATCH  | /restaurant/:res_id/food |

### Foods

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | /food/get         |
| GET    | /food/get/:res_id |
| POST   | /food/post        |
| PUT    | /food/:id         |
| DELETE | /food/:id         |

### Orders

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | /order            |
| GET    | /order            |
| GET    | /order/:id        |
| PUT    | /order/:id/status |

---

## 🔒 Authentication Example

Add JWT Token in request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📤 Sample Response

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": 101,
    "totalAmount": 599
  }
}
```

---

## 📈 Future Improvements

- Payment Gateway Integration
- Real-Time Order Tracking
- Socket.IO Notifications
- Push Notifications
- Google Maps Integration
- Rating & Review System
- Coupon & Offer Engine
- Analytics Dashboard

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

---

### Built with ❤️ for ZaykaZone
