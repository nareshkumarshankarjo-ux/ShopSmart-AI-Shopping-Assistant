import React from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Navbar({
  cartCount,
  isLoggedIn,
  currentUser,
  logout,
}) {
  const navigate =
    useNavigate();

  const isAdmin =
    currentUser?.role ===
    "admin";

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* LOGO */}

        <NavLink
          to="/"
          className="brand"
        >
          Shop
          <span>
            Smart
          </span>
        </NavLink>

        {/* NAVIGATION */}

        <nav className="nav-links">

          <NavLink
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
          >
            Products
          </NavLink>

          {/* ADMIN ONLY */}

          {isLoggedIn &&
            isAdmin && (
              <NavLink
                to="/admin"
              >
                Admin
              </NavLink>
            )}

          {/* CART:
              LOGIN REQUIRED
          */}

          {isLoggedIn && (
            <NavLink
              to="/cart"
              className="cart-pill"
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

          {/* LOGGED OUT */}

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="btn btn-primary"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="btn btn-outline"
              >
                Register
              </NavLink>
            </>
          ) : (
            /* LOGGED IN */

            <>
              <span className="user-name">
                Hi,{" "}
                {currentUser?.name ||
                  (isAdmin
                    ? "Admin"
                    : "User")}
              </span>

              <button
                type="button"
                className="btn btn-primary"
                onClick={
                  handleLogout
                }
              >
                Logout
              </button>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Navbar;