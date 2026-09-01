import React from "react";

import {
  Link,
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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <Link
          to="/"
          className="logo"
        >
          Shop<span>Smart</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/admin">
            Admin
          </NavLink>

          <NavLink
            to="/cart"
            className="cart-link"
          >
            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="login-nav"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="register-nav"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {currentUser && (
                <span className="user-name">
                  👤 {currentUser.name}
                </span>
              )}

              <button
                className="logout-button"
                onClick={handleLogout}
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