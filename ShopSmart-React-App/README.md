# 🛒 ShopSmart – AI Shopping Assistant

ShopSmart is a modern AI-powered shopping assistant web application built using React.js, Vite, React Router, and JSON Server.

The application allows users to browse products, search intelligently, use voice search, filter products by category, manage a shopping cart, register/login, and manage products through an Admin page.

---

## 🚀 Features

### 🏠 Home Page
- Modern responsive homepage
- ShopSmart branding
- Featured / best-selling products
- Quick navigation to products
- AI-powered shopping concept

### 🛍️ Products Page
- Display all available products
- Product images
- Product name and description
- Selling price
- Original price
- Product rating
- Best Seller badge
- Add to Cart functionality

### 🔍 Smart Search
Users can search products using natural-language queries.

Examples:

```text
laptop under ₹40000 with best battery
mobile
camera
headphone
```

The Smart Search filters the available products and displays suitable results.

### 🎤 Voice Search
ShopSmart supports browser-based voice search.

Users can:
- Click **Voice Search**
- Speak a product requirement
- Convert speech to search text
- Automatically search matching products

Voice recognition uses the browser Web Speech API where supported.

### 🔊 Voice Results
Search results can also be spoken aloud.

Features:
- Speak Results
- Stop Voice
- Text-to-speech output

This uses the browser Speech Synthesis API.

### 🗂️ Category Filters
Products can be filtered using:

- All
- Laptop
- Mobile
- Headphone
- Watch
- Tablet
- Camera

Clicking **All** resets the filter and displays all products.

### 🛒 Shopping Cart
Users can:
- Add products to cart
- Increase quantity
- Decrease quantity
- Remove products
- View individual product totals
- View complete order total
- View cart item count
- Proceed to Checkout interface

### 👤 User Registration & Login
New users can register before logging in.

Registered users can:
- Login using their credentials
- Maintain a logged-in session
- View their username in the navigation bar
- Logout

### ⚙️ Admin Product Management
The Admin page allows product management.

Admin functionality includes:
- Add new products
- Product name
- Brand
- Category
- Selling price
- Original price
- Rating
- Description
- Image URL
- Battery score
- Best Seller option
- Delete existing products

### 💾 JSON Server
JSON Server is used as a mock REST API for development.

Example endpoints:

```text
http://localhost:3001/products
http://localhost:3001/cart
```

---

## 🧰 Technologies Used

- React.js
- JavaScript
- Vite
- React Router DOM
- HTML5
- CSS3
- JSON Server
- Fetch API
- Local Storage
- Web Speech API
- Speech Recognition API
- Speech Synthesis API

---

## 📁 Project Structure

```text
ShopSmart-Mini-Project/
│
├── ShopSmart-React-App/
│   │
│   ├── public/
│   │   └── products/
│   │       ├── smartbook-air-14.jpg
│   │       ├── probook-x15.jpg
│   │       ├── studentbook-lite.jpg
│   │       ├── smartphone-neo-5g.jpg
│   │       ├── vision-pro-mobile.jpg
│   │       ├── soundmax-wireless.jpg
│   │       ├── beatlite-headphones.jpg
│   │       ├── fitwatch-pro.jpg
│   │       ├── studytab-10.jpg
│   │       └── clickpro-camera.jpg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── data/
│   │   │   └── smartSearch.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── db.json
└── README.md
```

---

## 📦 Installation

Clone or download the project and open it in Visual Studio Code.

Navigate to the React application:

```bash
cd ShopSmart-React-App
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run the React Application

Start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🗄️ Run JSON Server

Open another terminal.

Run:

```bash
npm run server
```

The JSON Server should run on:

```text
http://localhost:3001
```

Products API:

```text
http://localhost:3001/products
```

Cart API:

```text
http://localhost:3001/cart
```

Keep both the **Vite server** and **JSON Server** running while using the application.

---

## 🛣️ Application Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Products |
| `/cart` | Shopping Cart |
| `/admin` | Product Management |
| `/login` | Login |
| `/register` | Registration |
| `*` | 404 / Not Found |

---

## 🎙️ Voice Search Browser Support

Voice recognition depends on browser support.

For the best experience, use:

**Google Chrome**

The browser may request microphone permission when Voice Search is used.

---

## 🖼️ Product Images

Product images are stored inside:

```text
public/products/
```

Example:

```text
public/products/smartbook-air-14.jpg
```

The corresponding path in `db.json` is:

```json
"image": "/products/smartbook-air-14.jpg"
```

---

## 📱 Responsive Design

ShopSmart is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

## 🎯 Project Objective

The objective of ShopSmart is to demonstrate the development of an interactive shopping application using modern React concepts, REST API operations, intelligent product searching, voice interaction, authentication-style functionality, and shopping cart management.

---

## 🔮 Future Enhancements

Possible future improvements include:

- Real backend authentication
- Password hashing
- JWT authentication
- MongoDB database
- Node.js and Express.js backend
- Real AI API integration
- Payment gateway integration
- User-specific shopping carts
- Order history
- Wishlist
- Product reviews
- Admin authentication
- Cloud deployment

---

## ⚠️ Development Note

This project currently uses JSON Server and browser/local-storage functionality for learning and demonstration purposes.

For a production e-commerce application, authentication, passwords, user information, orders, and payment information should be handled securely through a backend server and database.

---

## 👨‍💻 Project

**ShopSmart – AI Shopping Assistant**

Built with React + Vite + JSON Server.

© 2026 ShopSmart Mini Project