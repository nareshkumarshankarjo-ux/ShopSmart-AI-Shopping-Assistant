import React, {
  useEffect,
  useState,
} from "react";

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Compare from "./pages/Compare.jsx";
import NotFound from "./pages/NotFound.jsx";

import "./App.css";

/* =========================================
   API URL
========================================= */

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3001"
    : "https://shopsmart-ai-shopping-assistant.onrender.com";

/* =========================================
   APP
========================================= */

function App() {
  /* =====================================
     PRODUCTS
  ===================================== */

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =====================================
     CART
  ===================================== */

  const [cart, setCart] =
    useState([]);

  /* =====================================
     COMPARE

     Saved in localStorage so refresh
     does not remove selected products.
  ===================================== */

  const [compareItems, setCompareItems] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "shopsmartCompare"
          );

        return saved
          ? JSON.parse(saved)
          : [];
      } catch {
        return [];
      }
    });

  /* =====================================
     CURRENT USER
  ===================================== */

  const [currentUser, setCurrentUser] =
    useState(() => {
      try {
        const saved =
          localStorage.getItem(
            "shopsmartUser"
          );

        return saved
          ? JSON.parse(saved)
          : null;
      } catch {
        return null;
      }
    });

  const isLoggedIn =
    currentUser !== null;

  const isAdmin =
    currentUser?.role ===
    "admin";

  /* =====================================
     SAVE COMPARE ITEMS
  ===================================== */

  useEffect(() => {
    localStorage.setItem(
      "shopsmartCompare",
      JSON.stringify(
        compareItems
      )
    );
  }, [compareItems]);

  /* =====================================
     FETCH PRODUCTS
  ===================================== */

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            `${API_URL}/products`
          );

        if (!response.ok) {
          throw new Error(
            "Unable to fetch products"
          );
        }

        const data =
          await response.json();

        setProducts(
          data
        );
      } catch (error) {
        console.error(
          "Products error:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

  /* =====================================
     FETCH CART
  ===================================== */

  const fetchCart =
    async (userEmail) => {
      if (!userEmail) {
        setCart([]);
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/cart`
          );

        if (!response.ok) {
          throw new Error(
            "Unable to fetch cart"
          );
        }

        const data =
          await response.json();

        const userCart =
          data.filter(
            (item) =>
              item.userEmail
                ?.toLowerCase() ===
              userEmail.toLowerCase()
          );

        setCart(
          userCart
        );
      } catch (error) {
        console.error(
          "Cart error:",
          error
        );

        setCart([]);
      }
    };

  /* =====================================
     INITIAL LOAD
  ===================================== */

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =====================================
     LOAD CART AFTER LOGIN
  ===================================== */

  useEffect(() => {
    if (
      currentUser?.email
    ) {
      fetchCart(
        currentUser.email
      );
    } else {
      setCart([]);
    }
  }, [currentUser]);

  /* =====================================
     LOGIN
  ===================================== */

  const loginUser =
    (user) => {
      localStorage.setItem(
        "shopsmartUser",
        JSON.stringify(user)
      );

      setCurrentUser(
        user
      );
    };

  /* =====================================
     LOGOUT
  ===================================== */

  const logout = () => {
    localStorage.removeItem(
      "shopsmartUser"
    );

    setCurrentUser(
      null
    );

    setCart([]);

    /*
      Compare items are intentionally
      NOT cleared here.
    */
  };

  /* =====================================
     ADD TO CART
  ===================================== */

  const addToCart =
    async (product) => {
      if (!currentUser) {
        alert(
          "Please login before adding products to your cart."
        );

        return false;
      }

      const existingItem =
        cart.find(
          (item) =>
            String(
              item.productId
            ) ===
              String(
                product.id
              ) &&
            item.userEmail
              ?.toLowerCase() ===
              currentUser.email.toLowerCase()
        );

      try {
        /* =================================
           PRODUCT ALREADY EXISTS
        ================================= */

        if (existingItem) {
          const response =
            await fetch(
              `${API_URL}/cart/${existingItem.id}`,
              {
                method:
                  "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify(
                    {
                      quantity:
                        Number(
                          existingItem.quantity
                        ) + 1,
                    }
                  ),
              }
            );

          if (!response.ok) {
            throw new Error(
              "Unable to update cart"
            );
          }

          const updated =
            await response.json();

          setCart(
            (current) =>
              current.map(
                (item) =>
                  item.id ===
                  updated.id
                    ? updated
                    : item
              )
          );

          return true;
        }

        /* =================================
           NEW CART ITEM
        ================================= */

        const newItem = {
          productId:
            product.id,

          name:
            product.name,

          brand:
            product.brand,

          category:
            product.category,

          price:
            Number(
              product.price
            ),

          originalPrice:
            Number(
              product.originalPrice ||
                product.price
            ),

          rating:
            product.rating,

          batteryScore:
            product.batteryScore,

          image:
            product.image,

          quantity: 1,

          userEmail:
            currentUser.email,
        };

        const response =
          await fetch(
            `${API_URL}/cart`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  newItem
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to add product"
          );
        }

        const saved =
          await response.json();

        setCart(
          (current) => [
            ...current,
            saved,
          ]
        );

        return true;
      } catch (error) {
        console.error(
          "Add cart error:",
          error
        );

        alert(
          "Unable to add product. Please check JSON Server."
        );

        return false;
      }
    };

  /* =====================================
     UPDATE CART QUANTITY
  ===================================== */

  const updateCartQuantity =
    async (
      item,
      newQuantity
    ) => {
      if (!currentUser) {
        return;
      }

      const quantity =
        Number(
          newQuantity
        );

      if (quantity <= 0) {
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
              method:
                "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    quantity,
                  }
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to update quantity"
          );
        }

        const updated =
          await response.json();

        setCart(
          (current) =>
            current.map(
              (cartItem) =>
                cartItem.id ===
                updated.id
                  ? updated
                  : cartItem
            )
        );
      } catch (error) {
        console.error(
          "Quantity error:",
          error
        );
      }
    };

  /* =====================================
     REMOVE CART ITEM
  ===================================== */

  const removeFromCart =
    async (id) => {
      if (!currentUser) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/cart/${id}`,
            {
              method:
                "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to remove product"
          );
        }

        setCart(
          (current) =>
            current.filter(
              (item) =>
                item.id !== id
            )
        );
      } catch (error) {
        console.error(
          "Remove error:",
          error
        );
      }
    };

  /* =====================================
     CLEAR CART
  ===================================== */

  const clearCart =
    async () => {
      if (
        !currentUser ||
        cart.length === 0
      ) {
        setCart([]);
        return;
      }

      try {
        await Promise.all(
          cart.map(
            (item) =>
              fetch(
                `${API_URL}/cart/${item.id}`,
                {
                  method:
                    "DELETE",
                }
              )
          )
        );

        setCart([]);
      } catch (error) {
        console.error(
          "Clear cart error:",
          error
        );
      }
    };

  /* =====================================
     ADMIN ADD PRODUCT
  ===================================== */

  const addProduct =
    async (
      newProduct
    ) => {
      if (!isAdmin) {
        alert(
          "Admin access only."
        );

        return false;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/products`,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  {
                    ...newProduct,

                    price:
                      Number(
                        newProduct.price
                      ),

                    originalPrice:
                      Number(
                        newProduct.originalPrice ||
                          newProduct.price
                      ),

                    rating:
                      Number(
                        newProduct.rating ||
                          0
                      ),

                    batteryScore:
                      Number(
                        newProduct.batteryScore ||
                          0
                      ),
                  }
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to add product"
          );
        }

        const saved =
          await response.json();

        setProducts(
          (current) => [
            ...current,
            saved,
          ]
        );

        return true;
      } catch (error) {
        console.error(
          "Add product error:",
          error
        );

        return false;
      }
    };

  /* =====================================
     ADMIN DELETE PRODUCT
  ===================================== */

  const deleteProduct =
    async (id) => {
      if (!isAdmin) {
        alert(
          "Admin access only."
        );

        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/products/${id}`,
            {
              method:
                "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to delete product"
          );
        }

        setProducts(
          (current) =>
            current.filter(
              (product) =>
                product.id !== id
            )
        );

        setCompareItems(
          (current) =>
            current.filter(
              (product) =>
                product.id !== id
            )
        );
      } catch (error) {
        console.error(
          "Delete product error:",
          error
        );
      }
    };

  /* =====================================
     COMPARE
  ===================================== */

  const toggleCompare =
    (product) => {
      setCompareItems(
        (current) => {
          const selected =
            current.some(
              (item) =>
                item.id ===
                product.id
            );

          /* REMOVE */

          if (selected) {
            return current.filter(
              (item) =>
                item.id !==
                product.id
            );
          }

          /* MAX 2 */

          if (
            current.length >= 2
          ) {
            alert(
              "You can compare only 2 products at a time."
            );

            return current;
          }

          /* ADD */

          return [
            ...current,
            product,
          ];
        }
      );
    };

  const clearCompare =
    () => {
      setCompareItems([]);

      localStorage.removeItem(
        "shopsmartCompare"
      );
    };

  /* =====================================
     CART COUNT
  ===================================== */

  const cartCount =
    isLoggedIn
      ? cart.reduce(
          (
            total,
            item
          ) =>
            total +
            Number(
              item.quantity ||
                0
            ),
          0
        )
      : 0;

  /* =====================================
     APP UI
  ===================================== */

  return (
    <HashRouter>

      <div className="app-shell">

        <Navbar
          cartCount={
            cartCount
          }
          isLoggedIn={
            isLoggedIn
          }
          currentUser={
            currentUser
          }
          logout={
            logout
          }
        />

        <main className="main-content">

          <Routes>

            {/* HOME */}

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
                  isLoggedIn={
                    isLoggedIn
                  }
                />
              }
            />

            {/* PRODUCTS */}

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
                  isLoggedIn={
                    isLoggedIn
                  }
                  compareItems={
                    compareItems
                  }
                  toggleCompare={
                    toggleCompare
                  }
                  clearCompare={
                    clearCompare
                  }
                />
              }
            />

            {/* COMPARE */}

            <Route
              path="/compare"
              element={
                <Compare
                  compareItems={
                    compareItems
                  }
                />
              }
            />

            {/* CART */}

            <Route
              path="/cart"
              element={
                isLoggedIn ? (
                  <Cart
                    cart={
                      cart
                    }
                    updateCartQuantity={
                      updateCartQuantity
                    }
                    removeFromCart={
                      removeFromCart
                    }
                    isLoggedIn={
                      isLoggedIn
                    }
                  />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* CHECKOUT */}

            <Route
              path="/checkout"
              element={
                isLoggedIn ? (
                  <Checkout
                    cart={
                      cart
                    }
                    currentUser={
                      currentUser
                    }
                    clearCart={
                      clearCart
                    }
                  />
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* ADMIN */}

            <Route
              path="/admin"
              element={
                isAdmin ? (
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
                ) : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
              }
            />

            {/* LOGIN */}

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  isAdmin ? (
                    <Navigate
                      to="/admin"
                      replace
                    />
                  ) : (
                    <Navigate
                      to="/"
                      replace
                    />
                  )
                ) : (
                  <Login
                    loginUser={
                      loginUser
                    }
                  />
                )
              }
            />

            {/* REGISTER */}

            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate
                    to="/"
                    replace
                  />
                ) : (
                  <Register />
                )
              }
            />

            {/* 404 */}

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