
# 🛒 ShopSmart – AI Shopping Assistant

## 📌 Project Overview

ShopSmart is an AI-enhanced e-commerce web application developed using React.js, Vite, JavaScript, and JSON Server.

The application helps customers discover suitable products based on their budget, preferences, ratings, and battery performance through intelligent rule-based recommendations, natural language search, and voice interaction.

This project was developed as part of the Entri Elevate AI-Enhanced Full Stack Development (MERN) program, Batch FN31.

## 🌐 Project Links

- **Vercel Live Application:** https://shop-smart-ai-shopping-assistant.vercel.app/
- **GitHub Pages Live Application:** https://nareshkumarshankarjo-ux.github.io/ShopSmart-AI-Shopping-Assistant/
- **GitHub Repository:** https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant
- **Render Backend:** https://shopsmart-ai-shopping-assistant.onrender.com
- **Products API:** https://shopsmart-ai-shopping-assistant.onrender.com/products
- **Cart API:** https://shopsmart-ai-shopping-assistant.onrender.com/cart

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

- Product listing with 10 demonstration products
- Product details page
- Category-based filtering
- Minimum and maximum price filtering
- Product sorting
- Product ratings
- Battery performance scores
- Best-selling products
- Product comparison
- Optimized product images

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

### Responsive User Interface

- Desktop and mobile layouts
- Responsive product cards
- Mobile-friendly navigation
- Responsive AI chat interface
- Mobile shopping cart and wishlist
- Custom ShopSmart shopping cart favicon

## 💻 Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development and production build |
| JavaScript ES6+ | Application logic |
| HTML5 | Web structure |
| CSS3 | Styling and responsive design |
| React Router DOM | Navigation and protected routes |
| React Context API | Shopping state management |
| JSON Server | Mock REST API |
| Fetch API | Backend communication |
| Local Storage | Browser-based data persistence |
| Web Speech API | Voice recognition and speech synthesis |
| Git | Version control |
| GitHub | Source code management |
| GitHub Pages | Frontend deployment |
| Vercel | Production frontend hosting |
| Render | Backend API hosting |

## 🏗️ Application Architecture

    Customer Browser
           |
           v
    React + Vite Frontend
    (Vercel / GitHub Pages)
           |
           v
        Fetch API
           |
           v
    JSON Server on Render
           |
           v
         db.json

React Context API and Local Storage manage customer-specific shopping state.

The application uses HashRouter for navigation compatibility across GitHub Pages and Vercel.

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
    ├── package-lock.json
    ├── public/
    ├── .gitignore
    ├── Project-Links.txt
    ├── README.md
    └── ShopSmart-React-App/
        ├── public/
        │   ├── products/
        │   └── favicon.svg
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   │   ├── Footer.jsx
        │   │   ├── Navbar.jsx
        │   │   ├── ProductCard.jsx
        │   │   ├── ProtectedRoute.jsx
        │   │   └── SearchBar.jsx
        │   ├── context/
        │   │   └── CartContext.jsx
        │   ├── data/
        │   │   └── smartSearch.js
        │   ├── pages/
        │   │   ├── Admin.jsx
        │   │   ├── AIAssistant.jsx
        │   │   ├── Cart.jsx
        │   │   ├── Checkout.jsx
        │   │   ├── Compare.jsx
        │   │   ├── ForgotPassword.jsx
        │   │   ├── Home.jsx
        │   │   ├── Login.jsx
        │   │   ├── NotFound.jsx
        │   │   ├── ProductDetails.jsx
        │   │   ├── Products.jsx
        │   │   ├── Register.jsx
        │   │   └── Wishlist.jsx
        │   ├── App.jsx
        │   ├── App.css
        │   ├── index.css
        │   └── main.jsx
        ├── index.html
        ├── vite.config.js
        ├── package.json
        ├── package-lock.json
        └── README.md

## ⚙️ Installation and Setup

### 1. Clone the repository

    git clone https://github.com/nareshkumarshankarjo-ux/ShopSmart-AI-Shopping-Assistant.git

### 2. Navigate to the project folder

    cd ShopSmart-AI-Shopping-Assistant
    npm install

### 3. Start JSON Server from the project root

    npx json-server db.json --host 0.0.0.0 --port 3001

Local backend:

    http://localhost:3001

### 4. Open another terminal

Navigate to the React application:

    cd ShopSmart-React-App
    npm install
    npm run dev

### 5. Open the local application

    http://localhost:5173/ShopSmart-AI-Shopping-Assistant/

## 🔗 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /products | Retrieve products |
| GET | /products/:id | Retrieve individual product |
| POST | /products | Add a product |
| DELETE | /products/:id | Delete a product |
| GET | /cart | Retrieve mock cart resource |

The backend uses JSON Server for educational REST API demonstration.

## 🔐 Environment Variables

The frontend supports local and hosted API environments.

Environment variable:

    VITE_API_URL=https://shopsmart-ai-shopping-assistant.onrender.com

### API Configuration

- Local development: http://localhost:3001
- Production environment: Render JSON Server API
- Vercel: Configured through VITE_API_URL
- GitHub Pages: Hosted API fallback

The API URL is public configuration and does not contain secret credentials.

## 📦 Production Build

Run the following command inside ShopSmart-React-App:

    npm run build

The production output is generated in the dist directory.

## 🚀 Deployment

### Vercel – Primary Production Deployment

- Status: Successfully deployed
- Production branch: main
- Framework preset: Vite
- Root directory: ShopSmart-React-App
- Build command: npm run build
- Output directory: dist
- Install command: Automatic
- Automatic deployment through GitHub integration

Live URL:

https://shop-smart-ai-shopping-assistant.vercel.app/

### GitHub Pages – Additional Frontend Deployment

The project also supports GitHub Pages deployment.

Deployment command from the React application folder:

    npm run deploy

Live URL:

https://nareshkumarshankarjo-ux.github.io/ShopSmart-AI-Shopping-Assistant/

### Render – Backend Deployment

JSON Server is hosted on Render and provides the REST API used by the deployed frontend.

Backend URL:

https://shopsmart-ai-shopping-assistant.onrender.com

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

### Vercel Production Verification

| Test | Result |
|---|---|
| Production deployment | Passed |
| Home page | Passed |
| Products page | Passed |
| Render product integration | Passed |
| All 10 product images | Passed |
| Customer registration | Passed |
| Customer login | Passed |
| AI shopping assistant | Passed |
| Budget-based recommendations | Passed |
| Add to cart from AI assistant | Passed |
| Add to wishlist from AI assistant | Passed |
| Shopping cart page | Passed |
| Wishlist page | Passed |
| Custom favicon | Passed |
| SoundMax Wireless image correction | Passed |
| Automatic Vercel redeployment | Passed |

### Mobile Responsiveness Testing

Mobile layouts were verified using Chrome DevTools responsive mode at approximately 400 × 875 pixels.

| Mobile Page | Result |
|---|---|
| Home page | Passed |
| Products page | Passed |
| AI Assistant | Passed |
| AI product recommendations | Passed |
| Shopping Cart | Passed |
| Order Summary | Passed |
| Wishlist | Passed |

The previously observed favicon 404 error was addressed by adding a custom SVG favicon.

## ⚠️ Demo Application Limitations

- The shopping assistant uses rule-based recommendation logic rather than an external large language model.
- Product information, prices, ratings and specifications are demonstration data.
- Payment options are for demonstration purposes only.
- No real financial transactions are processed.
- JSON Server provides a mock backend.
- Hosted backend startup delays may temporarily affect product loading.
- Authentication and frontend route protection are intended for educational demonstration and are not production-grade security.
- Browser Local Storage is not suitable for securely storing real credentials.
- The mock API does not provide secure server-side authorization.
- Voice functionality depends on browser support and microphone permissions.

## 🔮 Future Enhancements

- MERN backend integration
- MongoDB database integration
- JWT-based authentication
- Secure password hashing
- Secure server-side authorization
- OpenAI or other LLM API integration
- Real payment gateway integration
- Customer order history
- Advanced admin dashboard
- Product inventory management
- Multilingual voice assistance
- Machine learning-based recommendations
- Improved backend error handling and retry functionality

## 🎓 Academic Details

- Institution: Entri Elevate
- Course: AI-Enhanced Full Stack Development (MERN)
- Batch: FN31
- Module: Module 3
- Project: ShopSmart – AI Shopping Assistant
- Project Type: Mini Project
- Year: 2026
- Vercel Deployment Date: 19 November 2026

## 👨‍💻 Developer

**Nareshkumar S**

AI Full Stack Developer (MERN)

GitHub: https://github.com/nareshkumarshankarjo-ux

## 🙏 Acknowledgements

I sincerely thank Entri Elevate and all my mentors for their valuable guidance, technical support, and encouragement throughout the development of this project.

---

© 2026 ShopSmart – AI Shopping Assistant.

Developed for educational and portfolio demonstration purposes.