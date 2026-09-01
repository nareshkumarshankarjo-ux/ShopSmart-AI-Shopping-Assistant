import React, { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login({
  setIsLoggedIn,
  setCurrentUser,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [message, setMessage] =
    useState("");

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const registeredUsers =
      JSON.parse(
        localStorage.getItem(
          "shopsmartUsers"
        )
      ) || [];

    const matchedUser =
      registeredUsers.find(
        (user) =>
          user.email.toLowerCase() ===
            formData.email
              .trim()
              .toLowerCase() &&
          user.password ===
            formData.password
      );

    if (!matchedUser) {
      setMessage(
        "Invalid email or password. If you are a new user, please register first."
      );
      return;
    }

    const loggedInUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
    };

    localStorage.setItem(
      "shopsmartUser",
      JSON.stringify(loggedInUser)
    );

    setCurrentUser(loggedInUser);
    setIsLoggedIn(true);

    navigate("/");
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-logo">
          Shop<span>Smart</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Login using your registered email and password.
        </p>

        {message && (
          <div className="auth-message error">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter registered email"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>

        <div className="auth-bottom-text">
          New user?
          <Link to="/register">
            Register here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;