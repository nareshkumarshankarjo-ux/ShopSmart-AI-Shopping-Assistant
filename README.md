
# 🛒 ShopSmart – AI Shopping Assistant

## 📌 Project Overview

ShopSmart is an AI-enhanced e-commerce web application developed using React.js, Vite, JavaScript, and JSON Server.

The application helps customers discover suitable products based on their budget, preferences, ratings, and battery performance through intelligent rule-based recommendations, natural language search, and voice interaction.

This project was developed as part of the Entri Elevate AI-Enhanced Full Stack Development (MERN) program, Batch FN31.

## 🌐 Project Links

- Live Application: https://nareshkumarshankarjo-ux.github.io/ShopSmart-AI-Shopping-Assistant/
- GitHub Repository: https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant

## 🚀 Key Features

### Customer Authentication

- Customer registration
- Email and password login
- Demo mobile OTP login
- Forgot password interface
- Customer and admin roles
- Protected routes
- Logout functionality

### Product Management

- Product listing
- Product details page
- Category-based filtering
- Minimum and maximum price filtering
- Product sorting
- Product ratings
- Battery performance scores
- Best-selling products
- Product comparison

### AI Shopping Assistant

- Natural language product queries
- Rule-based intelligent product recommendations
- Budget-based product suggestions
- Personalized shopping recommendations
- Product recommendations based on ratings and battery scores
- Interactive chat interface
- Suggested shopping prompts
- Shopping cart summary
- Add products to cart directly from the assistant
- Add and remove wishlist products
- No-matching-product handling
- Clear chat functionality

### Voice Features

- Voice search
- Speech-to-text recognition
- Text-to-speech responses
- Read aloud assistant recommendations
- Browser microphone integration using Web Speech API

### Shopping Cart

- Add products to cart
- Increase and decrease product quantities
- Remove products
- Automatic price calculation
- Customer-specific cart management
- Empty cart handling

### Wishlist

- Add favourite products
- Remove saved products
- Customer-specific wishlist management
- Dynamic wishlist count
- Add wishlist products to cart

### Checkout

- Customer delivery details
- Mobile number and pincode fields
- Order summary
- Cash on Delivery option
- Demo UPI payment option
- Demo Credit/Debit Card option
- Order confirmation page
- Automatic cart clearance after checkout

### Admin Dashboard

- Admin login
- View existing products
- Add new products
- Delete products
- Product deletion confirmation
- Dynamic product count
- JSON Server integration
- Frontend role-based route protection

## 💻 Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and production build |
| JavaScript ES6+ | Application logic |
| HTML5 | Web structure |
| CSS3 | Styling and responsive design |
| React Router | Navigation and protected routes |
| React Context API | Shopping state management |
| JSON Server | Mock REST API and product management |
| Local Storage | Browser-based data persistence |
| Web Speech API | Voice recognition and speech synthesis |
| Git | Version control |
| GitHub | Source code management |
| GitHub Pages | Frontend deployment |

## 🤖 AI Assistant Sample Queries

- Budget laptop under 40000 with best battery
- Best mobile under 30000
- Headphones under 5000
- Recommend products for me
- What is in my cart?
- Laptop under 1000

## 📂 Project Structure

    ShopSmart-Mini-Project/
    ├── db.json
    ├── package.json
    ├── public/
    ├── ShopSmart-React-App/
    │   ├── public/
    │   ├── src/
    │   │   ├── assets/
    │   │   ├── components/
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── ProductCard.jsx
    │   │   │   ├── ProtectedRoute.jsx
    │   │   │   └── SearchBar.jsx
    │   │   ├── context/
    │   │   │   └── CartContext.jsx
    │   │   ├── data/
    │   │   │   └── smartSearch.js
    │   │   ├── pages/
    │   │   │   ├── Admin.jsx
    │   │   │   ├── AIAssistant.jsx
    │   │   │   ├── Cart.jsx
    │   │   │   ├── Checkout.jsx
    │   │   │   ├── Compare.jsx
    │   │   │   ├── ForgotPassword.jsx
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── NotFound.jsx
    │   │   │   ├── ProductDetails.jsx
    │   │   │   ├── Products.jsx
    │   │   │   ├── Register.jsx
    │   │   │   └── Wishlist.jsx
    │   │   ├── App.jsx
    │   │   ├── App.css
    │   │   ├── index.css
    │   │   └── main.jsx
    │   └── package.json
    └── README.md

## ⚙️ Installation and Setup

### 1. Clone the repository

    git clone https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant.git

### 2. Navigate to the project folder

    cd ShopSmart-AI-Shopping-Assistant
    npm install

### 3. Navigate to the React application

    cd ShopSmart-React-App
    npm install

### 4. Start JSON Server

    npm run server

### 5. Start the frontend in another terminal

    npm run dev

### 6. Open the application

    http://localhost:5173/ShopSmart-AI-Shopping-Assistant/

## 📦 Production Build

    npm run build

## 🚀 Deployment

The frontend application is deployed using GitHub Pages.

    npm run deploy

## ✅ Functional Testing

The following functionalities were successfully tested during development:

- Customer registration and login
- Customer-specific cart and wishlist
- Product details navigation
- AI shopping recommendations
- Budget-based product queries
- Personalized product suggestions
- Voice recognition
- Text-to-speech responses
- AI assistant cart and wishlist integration
- Cart quantity management
- Checkout and order confirmation
- Automatic cart clearance
- Admin product creation and deletion
- Unauthorized admin page redirection
- Production build
- GitHub Pages deployment
- Live customer shopping workflow

## ⚠️ Demo Application Limitations

- The shopping assistant uses rule-based recommendation logic.
- Payment options are for demonstration purposes only.
- No real financial transactions are processed.
- JSON Server provides a mock backend.
- Authentication and frontend route protection are intended for educational demonstration and are not production-grade security.
- Voice functionality depends on browser support and microphone permissions.

## 🔮 Future Enhancements

- MERN backend integration
- MongoDB database integration
- JWT-based authentication
- Secure server-side authorization
- OpenAI or other LLM API integration
- Real payment gateway integration
- Customer order history
- Advanced admin dashboard
- Product inventory management
- Multilingual voice assistance
- Machine learning-based recommendations

## 🎓 Academic Details

- Institution: Entri Elevate
- Course: AI-Enhanced Full Stack Development (MERN)
- Batch: FN31
- Project: ShopSmart – AI Shopping Assistant
- Project Type: Mini Project
- Year: 2026

## 👨‍💻 Developer

**Nareshkumar S**

AI Full Stack Developer (MERN)

GitHub: https://github.com/nareshkumarshankarjo-ux

## 🙏 Acknowledgements

I sincerely thank Entri Elevate and all my mentors for their valuable guidance, technical support, and encouragement throughout the development of this project.

---

© 2026 ShopSmart – AI Shopping Assistant.

Developed for educational and portfolio demonstration purposes.
