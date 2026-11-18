import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  isLoggedIn = false,
  currentUser = null,
  logout,
}) {
  const navigate =
    useNavigate();

  /* =====================================================
     USER DISPLAY NAME
  ===================================================== */

  const displayName =
    currentUser?.name ||
    currentUser?.fullName ||
    "";

  /* =====================================================
     ADMIN CHECK
  ===================================================== */

  const isAdmin =
    currentUser?.role ===
    "admin";

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout =
    () => {
      if (
        typeof logout ===
        "function"
      ) {
        logout();
      } else {
        /*
          Backup logout.
        */

        localStorage.removeItem(
          "shopsmartUser"
        );

        navigate("/");
      }
    };

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* =================================================
            LOGO
        ================================================= */}

        <NavLink
          to="/"
          className="logo"
        >
          <span className="shop">
            Shop
          </span>

          <span className="smart">
            Smart
          </span>
        </NavLink>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="nav-links">

          {/* HOME */}

          <NavLink
            to="/"
            end
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            Home
          </NavLink>

          {/* PRODUCTS */}

          <NavLink
            to="/products"
            className={({
              isActive,
            }) =>
              isActive
                ? "active"
                : ""
            }
          >
            Products
          </NavLink>

          {/* =================================================
              LOGGED-IN USER LINKS
          ================================================= */}

          {isLoggedIn ? (
            <>

              {/* CART */}

              {!isAdmin && (
                <NavLink
                  to="/cart"
                  className={({
                    isActive,
                  }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >
                  🛒 Cart

                  {cartCount >
                    0 && (
                    <span className="cart-count">
                      {
                        cartCount
                      }
                    </span>
                  )}
                </NavLink>
              )}

              {!isAdmin && (
                <NavLink to="/wishlist" className={({ isActive }) => isActive ? "active" : ""}>
                  ♡ Wishlist {wishlistCount > 0 && <span className="cart-count">{wishlistCount}</span>}
                </NavLink>
              )}

              <NavLink to="/assistant" className={({ isActive }) => isActive ? "active" : ""}>🤖 AI Assistant</NavLink>

              {/* ADMIN */}

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({
                    isActive,
                  }) =>
                    isActive
                      ? "active"
                      : ""
                  }
                >
                  Admin
                </NavLink>
              )}

              {/* USERNAME */}

              <span className="welcome-user">
                Hi,{" "}
                {isAdmin
                  ? "Admin"
                  : displayName ||
                    "User"}
              </span>

              {/* LOGOUT */}

              <button
                type="button"
                className="logout-btn"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>

            </>
          ) : (

            /* =================================================
                NOT LOGGED IN
            ================================================= */

            <>

              <NavLink
                to="/login"
                className="login-btn"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="register-btn"
              >
                Register
              </NavLink>

            </>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;