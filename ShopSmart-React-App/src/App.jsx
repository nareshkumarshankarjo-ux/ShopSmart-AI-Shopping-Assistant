import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

import Wishlist from "./pages/Wishlist";
import AIAssistant from "./pages/AIAssistant";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider, useCart } from "./context/CartContext";
import "./App.css";

const API_URL = "http://localhost:3001";

function AppContent({ currentUser, login, registerUser, logout }) {
  const { cart, cartCount, wishlistCount, storageError, addToCart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  /* =====================================================
     PRODUCTS
  ===================================================== */

  const [products, setProducts] =
    useState([]);


  /* =====================================================
     COMPARE
  ===================================================== */

  const [
    compareItems,
    setCompareItems,
  ] = useState([]);

  /* =====================================================
     CURRENT USER
  ===================================================== */

  /* =====================================================
     LOGIN STATUS
  ===================================================== */

  const isLoggedIn =
    Boolean(currentUser);

  const isAdmin =
    currentUser?.role ===
    "admin";

  /* =====================================================
     HELPERS
  ===================================================== */

  const sameId = (
    first,
    second
  ) =>
    String(first) ===
    String(second);

  const goToLogin = () => {
    window.location.hash =
      "#/login";
  };

  /* =====================================================
     LOAD PRODUCTS
  ===================================================== */

  const loadProducts =
    useCallback(
      async () => {
        try {
          const response =
            await fetch(
              `${API_URL}/products`
            );

          if (!response.ok) {
            throw new Error(
              "Unable to load products."
            );
          }

          const data =
            await response.json();

          setProducts(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(
            "Products error:",
            error
          );

          setProducts([]);
        }
      },
      []
    );

  useEffect(() => { loadProducts(); }, [loadProducts]);

  /* =====================================================
     COMPARE
  ===================================================== */

  const toggleCompare = (
    product
  ) => {
    if (!isLoggedIn) {
      alert(
        "Please login to compare products."
      );

      goToLogin();

      return;
    }

    if (!product) {
      return;
    }

    const alreadySelected =
      compareItems.some(
        (item) =>
          sameId(
            item.id,
            product.id
          )
      );

    /* =============================================
       REMOVE SELECTED PRODUCT
    ============================================= */

    if (alreadySelected) {
      setCompareItems(
        (current) =>
          current.filter(
            (item) =>
              !sameId(
                item.id,
                product.id
              )
          )
      );

      return;
    }

    /* =============================================
       MAXIMUM 2 PRODUCTS
    ============================================= */

    if (
      compareItems.length >= 2
    ) {
      alert(
        "You can compare only 2 products at a time."
      );

      return;
    }

    /* =============================================
       ADD PRODUCT TO COMPARE
    ============================================= */

    setCompareItems(
      (current) => [
        ...current,
        product,
      ]
    );
  };

  /* =====================================================
     CLEAR COMPARE
  ===================================================== */

  const clearCompare = () => {
    setCompareItems([]);
  };

  /* =====================================================
     ADD PRODUCT - ADMIN
  ===================================================== */

  const addProduct =
    async (product) => {
      if (!isAdmin) {
        alert(
          "Admin access required."
        );

        return false;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/products`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  product
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to add product."
          );
        }

        const savedProduct =
          await response.json();

        setProducts(
          (current) => [
            ...current,
            savedProduct,
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

  /* =====================================================
     DELETE PRODUCT - ADMIN
  ===================================================== */

  const deleteProduct =
    async (id) => {
      if (!isAdmin) {
        alert(
          "Admin access required."
        );

        return false;
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
            "Unable to delete product."
          );
        }

        setProducts(
          (current) =>
            current.filter(
              (product) =>
                !sameId(
                  product.id,
                  id
                )
            )
        );

        setCompareItems(
          (current) =>
            current.filter(
              (product) =>
                !sameId(
                  product.id,
                  id
                )
            )
        );

        return true;
      } catch (error) {
        console.error(
          "Delete product error:",
          error
        );

        return false;
      }
    };

  /* =====================================================
     ROUTES
  ===================================================== */

  return (
    <div className="app-shell">
      <Navbar
        wishlistCount={wishlistCount}
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
        {storageError && <p role="alert" className="container">{storageError}</p>}
        <Routes>

          {/* =================================================
              HOME
          ================================================= */}

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

                currentUser={
                  currentUser
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

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <Route
            path="/products"
            element={
              <Products
                products={
                  products
                }

                addToCart={
                  addToCart
                }

                isLoggedIn={
                  isLoggedIn
                }

                currentUser={
                  currentUser
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

          {/* =================================================
              COMPARE
          ================================================= */}

          <Route
            path="/products/:id"
            element={
              <ProductDetails
                products={products}
                addToCart={addToCart}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/compare"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Compare
                  compareItems={
                    compareItems
                  }

                  addToCart={
                    addToCart
                  }

                  isLoggedIn={
                    isLoggedIn
                  }

                  clearCompare={
                    clearCompare
                  }
                />
              </ProtectedRoute>
            }
          />

          {/* =================================================
              CART
          ================================================= */}

          <Route path="/assistant" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AIAssistant products={products} /></ProtectedRoute>} />
          <Route path="/wishlist" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}><Wishlist /></ProtectedRoute>
          } />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
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
                />
              </ProtectedRoute>
            }
          />

          {/* =================================================
              CHECKOUT
          ================================================= */}

          <Route
            path="/checkout"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Checkout
                  cart={
                    cart
                  }

                  clearCart={
                    clearCart
                  }

                  currentUser={
                    currentUser
                  }
                />
              </ProtectedRoute>
            }
          />

          {/* =================================================
              ADMIN
          ================================================= */}

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
                  to="/"
                  replace
                />
              )
            }
          />

          {/* =================================================
              LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate
                  to={
                    isAdmin
                      ? "/admin"
                      : "/"
                  }
                  replace
                />
              ) : (
                <Login
                  login={
                    login
                  }

                  onLogin={
                    login
                  }
                />
              )
            }
          />

          {/* =================================================
              REGISTER
          ================================================= */}

          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <Register
                  register={
                    registerUser
                  }

                  onRegister={
                    registerUser
                  }
                />
              )
            }
          />

          {/* =================================================
              FORGOT PASSWORD
          ================================================= */}

          <Route
            path="/forgot-password"
            element={
              isLoggedIn ? (
                <Navigate
                  to="/"
                  replace
                />
              ) : (
                <ForgotPassword />
              )
            }
          />

          {/* =================================================
              NOT FOUND
          ================================================= */}

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
  );
}

/* =====================================================
   MAIN APP
===================================================== */

function App() {
  const [
    currentUser,
    setCurrentUser,
  ] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem(
          "shopsmartUser"
        );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const login = (user) => {
    if (!user) {
      return;
    }

    const normalizedUser = {
      ...user,

      name:
        user.name ||
        user.fullName ||
        "User",
    };

    localStorage.setItem(
      "shopsmartUser",
      JSON.stringify(
        normalizedUser
      )
    );

    setCurrentUser(
      normalizedUser
    );


  };

  /* =====================================================
     REGISTER USER
  ===================================================== */

  const registerUser = (
    user
  ) => {
    if (!user) {
      return;
    }

    const normalUser = {
      ...user,

      name:
        user.name ||
        user.fullName ||
        "User",

      role: "user",
    };

    localStorage.setItem(
      "shopsmartUser",
      JSON.stringify(
        normalUser
      )
    );

    setCurrentUser(
      normalUser
    );


  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    localStorage.removeItem(
      "shopsmartUser"
    );

    setCurrentUser(null);





    window.location.hash =
      "#/";
  };

  return (
    <HashRouter>
      <CartProvider currentUser={currentUser}>
        <AppContent currentUser={currentUser} login={login} registerUser={registerUser} logout={logout} />
      </CartProvider>
    </HashRouter>
  );
}

export default App;