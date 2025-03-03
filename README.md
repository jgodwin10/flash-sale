# **📌 Flash Sale API**

🚀 A high-performance **Flash Sale System** built with **Node.js, Express, MongoDB, Redis, and Bull Queue** to handle high concurrency purchases efficiently.

---

## **📌 Features**

✅ **User Authentication (JWT-based)**  
✅ **Flash Sale Product Management**  
✅ **Concurrency-Controlled Purchase System (Redis + Transactions)**  
✅ **Leaderboard for Tracking Purchases**  
✅ **Redis-Based Stock Management**  
✅ **Bull Queue for High-Traffic Processing**  
✅ **Pagination & Filtering Support**

---

## **🚀 Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/jgodwin10/flash-sale.git
cd flash-sale
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables (`.env`)**

Create a `.env` file in the root directory and add the following:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/flash-sale
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
REDIS_PORT=6379
REDIS_HOST=localhost
```

### **4️⃣ Start the Server**

```sh
docker run --name redis -p 6379:6379 -d redis
npm run dev  # For development mode
npm run start # For production mode
```

---

# **📌 API Endpoints**

## **🛠 Authentication**

### **🔹 1. Register a User**

**Endpoint:** `POST /api/auth/signup`  
**Description:** Registers a new user (admin or regular user).  
📌 **Request Body (JSON)**

```json
{
	"name": "John Doe",
	"email": "john@example.com",
	"password": "securepassword"
}
```

📌 **Response (200 OK)**

```json
{
	"message": "User registered successfully",
	"user": { "id": "65f47b9e9e8f3b001c2a9f77", "name": "John Doe", "email": "john@example.com" }
}
```

---

### **🔹 2. User Login**

**Endpoint:** `POST /api/auth/login`  
**Description:** Logs in a user and returns an access token.  
📌 **Request Body (JSON)**

```json
{
	"email": "john@example.com",
	"password": "securepassword"
}
```

📌 **Response (200 OK)**

```json
{
	"message": "Login successful",
	"tokens": { "accessToken": "eyJhbGciOiJIUzI1NiIsInR..." }
}
```

---

## **🛒 Flash Sale Products**

### **🔹 4. Create a Product**

**Endpoint:** `POST /api/product`  
📌 **Request Body (JSON)**

```json
{
	"name": "Limited Edition Sneakers",
	"stock": 200,
	"saleStartTime": "2025-01-10T09:00:00Z",
	"saleEndTime": "2025-04-11T23:59:59Z"
}
```

📌 **Response**

```json
{
	"message": "Product created successfully",
	"product": { "id": "65f48c9e9e8f3b001c2a9f78", "name": "Limited Edition Sneakers", "stock": 200 }
}
```

---

### **🔹 5. Get All Products**

**Endpoint:** `GET /api/product/all`

📌 **Response**

```json
{
	"products": [{ "id": "65f48c9e9e8f3b001c2a9f78", "name": "Sneakers", "stock": 200 }]
}
```

---

## **🛍️ Purchase System**

### **🔹 6. Make a Flash Sale Purchase**

**Endpoint:** `POST /api/purchase`  
📌 **Request Body (JSON)**

```json
{
	"productId": "65f48c9e9e8f3b001c2a9f78",
	"quantity": 2
}
```

📌 **Response**

```json
{ "message": "Purchase successful" }
```

---

## **🏆 Leaderboard**

### **🔹 7. Get Flash Sale Leaderboard**

**Endpoint:** `GET /api/leaderboard`

📌 **Response**

```json
{
	"success": true,
	"leaderboard": [{ "userId": { "id": "65f47b9e9e8f3b001c2a9f77", "name": "John Doe" }, "productId": { "id": "65f48c9e9e8f3b001c2a9f78", "name": "Sneakers" }, "quantity": 3 }]
}
```

---

# **📌 Technologies Used**

✅ **Node.js (Express.js) - Backend Framework**  
✅ **MongoDB + Mongoose - Database**  
✅ **Redis - Caching & Stock Management**  
✅ **Bull Queue - Background Job Processing**  
✅ **JWT - Authentication**  
✅ **Zod - Input Validation**  
✅ **TypeScript - Strong Typing**
