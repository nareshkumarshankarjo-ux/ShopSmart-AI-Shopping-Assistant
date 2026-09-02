# 🛒 ShopSmart – AI Shopping Assistant

ShopSmart is a modern AI-powered shopping assistant web application built using **React.js, Vite, React Router DOM, and JSON Server**.

The application allows users to browse products, search intelligently, use voice search, filter products by category, manage a shopping cart, register/login, and manage products through an Admin page.

---

## 🌐 Live Project

### Live Demo

https://nareshkumarshankarjo-ux.github.io/ShopSmart-AI-Shopping-Assistant/

### GitHub Repository

https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant

---

## 🌐 Live REST API

The JSON Server REST API is deployed online using **Render**.

### API Base URL

https://shopsmart-ai-shopping-assistant.onrender.com

### Products API

https://shopsmart-ai-shopping-assistant.onrender.com/products

### Cart API

https://shopsmart-ai-shopping-assistant.onrender.com/cart

---

# 🚀 Features

## 🏠 Home Page

- Modern responsive homepage
- ShopSmart branding
- Featured / best-selling products
- Quick navigation to products
- AI-powered shopping concept

## 🛍️ Products Page

- Display all available products
- Product images
- Product name and description
- Selling price
- Original price
- Product rating
- Best Seller badge
- Add to Cart functionality

## 🔍 Smart Search

Users can search products using natural-language queries.

Examples:

```text
laptop under ₹40000 with best battery
mobile
camera
headphone
```

The Smart Search filters the available products and displays suitable results.

## 🎤 Voice Search

ShopSmart supports browser-based voice search.

Users can:

- Click **Voice Search**
- Speak a product requirement
- Convert speech to search text
- Automatically search matching products

Voice recognition uses the browser **Web Speech API** where supported.

## 🔊 Voice Results

Search results can also be spoken aloud.

Features include:

- Speak Results
- Stop Voice
- Text-to-speech output

This functionality uses the browser **Speech Synthesis API**.

## 🗂️ Category Filters

Products can be filtered using:

- All
- Laptop
- Mobile
- Headphone
- Watch
- Tablet
- Camera

Clicking **All** resets the filter and displays all products.

## 🛒 Shopping Cart

Users can:

- Add products to cart
- Increase quantity
- Decrease quantity
- Remove products
- View individual product totals
- View complete order total
- View cart item count
- Proceed to Checkout interface

## 👤 User Registration & Login

New users can register before logging in.

Registered users can:

- Login using their credentials
- Maintain a logged-in session
- View their username in the navigation bar
- Logout

## ⚙️ Admin Product Management

The Admin page provides product management functionality.

Admin features include:

- Add new products
- Enter product name
- Enter brand
- Select category
- Enter selling price
- Enter original price
- Enter rating
- Enter description
- Enter image URL
- Enter battery score
- Select Best Seller option
- Delete existing products

---

# 🧰 Technologies Used

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
- Git
- GitHub
- GitHub Pages
- Render

---

# 📁 Project Structure

```text
ShopSmart-Mini-Project/
│
├── public/
│   └── .gitkeep
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
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── data/
│   │   │   └── smartSearch.js
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
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── db.json
├── package.json
├── Project-Links.txt
└── README.md
```

---

# 📦 Installation

Clone the GitHub repository:

```bash
git clone https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant.git
```

Open the project folder:

```bash
cd ShopSmart-AI-Shopping-Assistant
```

Navigate to the React application:

```bash
cd ShopSmart-React-App
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the React Application

Navigate to:

```bash
cd ShopSmart-React-App
```

Start the Vite development server:

```bash
npm run dev
```

The local application is available at:

```text
http://localhost:5173/ShopSmart-AI-Shopping-Assistant/
```

---

# 🗄️ JSON Server

JSON Server is used as the REST API for product and shopping cart data.

## 🌐 Live API – Render

API Base URL:

```text
https://shopsmart-ai-shopping-assistant.onrender.com
```

Products API:

```text
https://shopsmart-ai-shopping-assistant.onrender.com/products
```

Cart API:

```text
https://shopsmart-ai-shopping-assistant.onrender.com/cart
```

---

## 💻 Local JSON Server

For local development, open a separate terminal from the project root and run:

```bash
npm run server
```

The local JSON Server runs at:

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

When testing completely locally, keep both the **Vite development server** and **JSON Server** running.

---

# 🛣️ Application Routes

The application uses client-side routing.

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Products |
| `/cart` | Shopping Cart |
| `/admin` | Product Management |
| `/login` | Login |
| `/register` | Registration |
| `*` | 404 / Not Found |

When deployed to GitHub Pages, the application is served from:

```text
/ShopSmart-AI-Shopping-Assistant/
```

---

# 🎙️ Voice Search Browser Support

Voice recognition depends on browser support.

For the best experience, use:

**Google Chrome**

The browser may request microphone permission when **Voice Search** is used.

---

# 🖼️ Product Images

Product images are stored inside:

```text
ShopSmart-React-App/public/products/
```

Example:

```text
ShopSmart-React-App/public/products/smartbook-air-14.jpg
```

The corresponding image path in `db.json` is:

```json
"image": "/products/smartbook-air-14.jpg"
```

The application handles the configured Vite base path so product images can also display correctly when deployed through GitHub Pages.

---

# 📱 Responsive Design

ShopSmart is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

---

# 🚀 Deployment

ShopSmart has both its frontend and REST API deployed online.

## Frontend – GitHub Pages

The React/Vite frontend is deployed using **GitHub Pages**.

```text
https://nareshkumarshankarjo-ux.github.io/ShopSmart-AI-Shopping-Assistant/
```

## Backend API – Render

The JSON Server REST API is deployed using **Render**.

```text
https://shopsmart-ai-shopping-assistant.onrender.com
```

The deployed React application communicates with the online Render API for product and shopping cart data.

> **Note:** A free Render service may take additional time to respond after a period of inactivity.

---

# 🎯 Project Objective

The objective of **ShopSmart – AI Shopping Assistant** is to demonstrate the development of an interactive shopping application using modern React concepts, REST API operations, intelligent product searching, voice interaction, authentication-style functionality, shopping cart management, and cloud deployment.

The project demonstrates practical use of:

- React components
- React state management
- React Router
- REST API integration
- Fetch API
- JSON Server
- Local Storage
- Product filtering
- Smart search logic
- Voice recognition
- Speech synthesis
- Shopping cart operations
- Admin product management
- Responsive web design
- Git and GitHub
- GitHub Pages deployment
- Render API deployment

---

# 🔮 Future Enhancements

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
- Product inventory management
- Search history
- Personalized recommendations

---

# ⚠️ Development Note

This project uses **JSON Server** and browser/local-storage functionality for learning and demonstration purposes.

For a production e-commerce application, authentication, passwords, user information, orders, payment information, authorization, and sensitive data should be handled securely through a production backend server and database.

---

# 👨‍💻 Developer

**Nareshkumar S.**

Project:

**ShopSmart – AI Shopping Assistant**

Built with **React + Vite + JSON Server**.

Frontend deployed with **GitHub Pages**.

REST API deployed with **Render**.

© 2026 ShopSmart Mini Project