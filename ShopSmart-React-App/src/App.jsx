import React, {
  useEffect,
  useState,
} from "react";

import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

const API_URL =
  "https://shopsmart-ai-shopping-assistant.onrender.com";

function App() {
  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentUser, setCurrentUser] =
    useState(() => {
      const storedUser =
        localStorage.getItem(
          "shopsmartUser"
        );

      return storedUser
        ? JSON.parse(storedUser)
        : null;
    });

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem(
        "shopsmartUser"
      ) !== null
    );

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/products`
      );

      const data =
        await response.json();

      setProducts(data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${API_URL}/cart`
      );

      const data =
        await response.json();

      setCart(data);
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error
      );
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const addToCart = async (
    product
  ) => {
    const existingItem =
      cart.find(
        (item) =>
          String(item.productId) ===
          String(product.id)
      );

    try {
      if (existingItem) {
        const response = await fetch(
          `${API_URL}/cart/${existingItem.id}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              quantity:
                existingItem.quantity +
                1,
            }),
          }
        );

        const updatedItem =
          await response.json();

        setCart((currentCart) =>
          currentCart.map((item) =>
            item.id ===
            updatedItem.id
              ? updatedItem
              : item
          )
        );
      } else {
        const newCartItem = {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        };

        const response = await fetch(
          `${API_URL}/cart`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              newCartItem
            ),
          }
        );

        const savedItem =
          await response.json();

        setCart((currentCart) => [
          ...currentCart,
          savedItem,
        ]);
      }
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error
      );
    }
  };

  const updateCartQuantity =
    async (
      item,
      newQuantity
    ) => {
      if (newQuantity <= 0) {
        await removeFromCart(
          item.id
        );
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/cart/${item.id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                quantity:
                  newQuantity,
              }),
            }
          );

        const updatedItem =
          await response.json();

        setCart((currentCart) =>
          currentCart.map(
            (cartItem) =>
              cartItem.id ===
              updatedItem.id
                ? updatedItem
                : cartItem
          )
        );
      } catch (error) {
        console.error(
          "Error updating cart:",
          error
        );
      }
    };

  const removeFromCart =
    async (id) => {
      try {
        await fetch(
          `${API_URL}/cart/${id}`,
          {
            method: "DELETE",
          }
        );

        setCart((currentCart) =>
          currentCart.filter(
            (item) =>
              item.id !== id
          )
        );
      } catch (error) {
        console.error(
          "Error removing product:",
          error
        );
      }
    };

  const addProduct = async (
    newProduct
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/products`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            newProduct
          ),
        }
      );

      const savedProduct =
        await response.json();

      setProducts(
        (currentProducts) => [
          ...currentProducts,
          savedProduct,
        ]
      );

      return true;
    } catch (error) {
      console.error(
        "Error adding product:",
        error
      );

      return false;
    }
  };

  const deleteProduct =
    async (id) => {
      try {
        await fetch(
          `${API_URL}/products/${id}`,
          {
            method: "DELETE",
          }
        );

        setProducts(
          (currentProducts) =>
            currentProducts.filter(
              (product) =>
                product.id !== id
            )
        );
      } catch (error) {
        console.error(
          "Error deleting product:",
          error
        );
      }
    };

  const logout = () => {
    localStorage.removeItem(
      "shopsmartUser"
    );

    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const cartCount = cart.reduce(
    (total, item) =>
      total +
      Number(item.quantity),
    0
  );

  return (
    <HashRouter>
      <div className="app">
        <Navbar
          cartCount={cartCount}
          isLoggedIn={
            isLoggedIn
          }
          currentUser={
            currentUser
          }
          logout={logout}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={
                    products
                  }
                  addToCart={
                    addToCart
                  }
                />
              }
            />

            <Route
              path="/products"
              element={
                <Products
                  products={
                    products
                  }
                  loading={
                    loading
                  }
                  addToCart={
                    addToCart
                  }
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  updateCartQuantity={
                    updateCartQuantity
                  }
                  removeFromCart={
                    removeFromCart
                  }
                />
              }
            />

            <Route
              path="/admin"
              element={
                <Admin
                  products={
                    products
                  }
                  addProduct={
                    addProduct
                  }
                  deleteProduct={
                    deleteProduct
                  }
                />
              }
            />

            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedIn={
                    setIsLoggedIn
                  }
                  setCurrentUser={
                    setCurrentUser
                  }
                />
              }
            />

            <Route
              path="/register"
              element={
                <Register />
              }
            />

            <Route
              path="*"
              element={
                <NotFound />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;