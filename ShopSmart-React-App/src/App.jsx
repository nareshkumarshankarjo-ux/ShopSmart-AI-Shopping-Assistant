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
import Compare from "./pages/Compare";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";

import "./App.css";

const API_URL = "http://localhost:3001";

function AppContent() {
  /* =====================================================
     PRODUCTS
  ===================================================== */

  const [products, setProducts] =
    useState([]);

  /* =====================================================
     CART
  ===================================================== */

  const [cart, setCart] =
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

  /* =====================================================
     LOAD CART
  ===================================================== */

  const loadCart =
    useCallback(
      async () => {
        if (!currentUser) {
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
              "Unable to load cart."
            );
          }

          const data =
            await response.json();

          setCart(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(
            "Cart error:",
            error
          );

          setCart([]);
        }
      },
      [currentUser]
    );

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  /* =====================================================
     LOGIN
  ===================================================== */

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

    setCompareItems([]);
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

    setCompareItems([]);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    localStorage.removeItem(
      "shopsmartUser"
    );

    setCurrentUser(null);

    setCart([]);

    setCompareItems([]);

    window.location.hash =
      "#/";
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart =
    async (product) => {
      if (!isLoggedIn) {
        alert(
          "Please login to add products to cart."
        );

        goToLogin();

        return false;
      }

      if (!product) {
        return false;
      }

      const existingItem =
        cart.find(
          (item) =>
            sameId(
              item.productId ??
                item.id,
              product.id
            )
        );

      try {
        /* =============================================
           EXISTING PRODUCT
        ============================================= */

        if (existingItem) {
          const newQuantity =
            Number(
              existingItem.quantity ||
                1
            ) + 1;

          const response =
            await fetch(
              `${API_URL}/cart/${existingItem.id}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    quantity:
                      newQuantity,
                  }),
              }
            );

          if (!response.ok) {
            throw new Error(
              "Unable to update cart."
            );
          }

          const updatedItem =
            await response.json();

          setCart(
            (current) =>
              current.map(
                (item) =>
                  sameId(
                    item.id,
                    existingItem.id
                  )
                    ? updatedItem
                    : item
              )
          );

          return true;
        }

        /* =============================================
           NEW PRODUCT
        ============================================= */

        const cartProduct = {
          productId:
            product.id,

          name:
            product.name,

          brand:
            product.brand,

          category:
            product.category,

          price:
            product.price,

          originalPrice:
            product.originalPrice,

          rating:
            product.rating,

          image:
            product.image,

          description:
            product.description,

          batteryScore:
            product.batteryScore,

          bestSeller:
            product.bestSeller,

          quantity: 1,
        };

        const response =
          await fetch(
            `${API_URL}/cart`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  cartProduct
                ),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to add product."
          );
        }

        const savedItem =
          await response.json();

        setCart(
          (current) => [
            ...current,
            savedItem,
          ]
        );

        return true;
      } catch (error) {
        console.error(
          "Add to cart error:",
          error
        );

        alert(
          "Unable to add product to cart."
        );

        return false;
      }
    };

  /* =====================================================
     UPDATE CART QUANTITY
  ===================================================== */

  const updateCartQuantity =
    async (
      id,
      change
    ) => {
      if (!isLoggedIn) {
        alert(
          "Please login first."
        );

        goToLogin();

        return;
      }

      const item =
        cart.find(
          (cartItem) =>
            sameId(
              cartItem.id,
              id
            )
        );

      if (!item) {
        return;
      }

      const currentQuantity =
        Number(
          item.quantity || 1
        );

      const newQuantity =
        currentQuantity +
        Number(change);

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

              body:
                JSON.stringify({
                  quantity:
                    newQuantity,
                }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to update quantity."
          );
        }

        const updatedItem =
          await response.json();

        setCart(
          (current) =>
            current.map(
              (cartItem) =>
                sameId(
                  cartItem.id,
                  item.id
                )
                  ? updatedItem
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

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  const removeFromCart =
    async (id) => {
      if (!isLoggedIn) {
        alert(
          "Please login first."
        );

        goToLogin();

        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/cart/${id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Unable to remove item."
          );
        }

        setCart(
          (current) =>
            current.filter(
              (item) =>
                !sameId(
                  item.id,
                  id
                )
            )
        );
      } catch (error) {
        console.error(
          "Remove cart error:",
          error
        );
      }
    };

  /* =====================================================
     CLEAR CART
  ===================================================== */

  const clearCart =
    async () => {
      const items = [
        ...cart,
      ];

      try {
        await Promise.all(
          items.map(
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
      } catch (error) {
        console.error(
          "Clear cart error:",
          error
        );
      }

      setCart([]);
    };

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
     CART COUNT
  ===================================================== */

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
                1
            ),
          0
        )
      : 0;

  /* =====================================================
     ROUTES
  ===================================================== */

  return (
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
            path="/compare"
            element={
              isLoggedIn ? (
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
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />

          {/* =================================================
              CART
          ================================================= */}

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
                />
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
            }
          />

          {/* =================================================
              CHECKOUT
          ================================================= */}

          <Route
            path="/checkout"
            element={
              isLoggedIn ? (
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
              ) : (
                <Navigate
                  to="/login"
                  replace
                />
              )
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
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;