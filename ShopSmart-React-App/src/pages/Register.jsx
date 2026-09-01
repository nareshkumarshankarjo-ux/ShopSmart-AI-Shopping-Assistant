import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must contain at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        "Password and Confirm Password do not match."
      );
      setMessageType("error");
      return;
    }

    const existingUsers =
      JSON.parse(
        localStorage.getItem("shopsmartUsers")
      ) || [];

    const userAlreadyExists =
      existingUsers.find(
        (user) =>
          user.email.toLowerCase() ===
          email.trim().toLowerCase()
      );

    if (userAlreadyExists) {
      setMessage(
        "This email is already registered. Please login."
      );
      setMessageType("error");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem(
      "shopsmartUsers",
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    );

    setMessage(
      "Registration successful. Redirecting to login..."
    );
    setMessageType("success");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <div className="login-logo">
          Shop<span>Smart</span>
        </div>

        <h1>Create Account</h1>

        <p className="login-subtitle">
          Register as a new ShopSmart user.
        </p>

        {message && (
          <div
            className={
              messageType === "success"
                ? "auth-message success"
                : "auth-message error"
            }
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="login-field">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Create password"
              required
            />
          </div>

          <div className="login-field">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Register
          </button>
        </form>

        <div className="auth-bottom-text">
          Already registered?
          <Link to="/login">
            Login here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;