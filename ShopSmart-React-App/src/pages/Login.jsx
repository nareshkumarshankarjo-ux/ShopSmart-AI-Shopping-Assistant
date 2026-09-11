import React, { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login({ loginUser }) {
  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const email =
      form.email
        .trim()
        .toLowerCase();

    const password =
      form.password.trim();

    /* =========================
       ADMIN LOGIN
    ========================= */

    if (
      email ===
        "admin@shopsmart.com" &&
      password ===
        "admin123"
    ) {
      const adminUser = {
        name: "Admin",
        email:
          "admin@shopsmart.com",
        role: "admin",
      };

      loginUser(
        adminUser
      );

      navigate(
        "/admin",
        {
          replace: true,
        }
      );

      return;
    }

    /* =========================
       NORMAL USER LOGIN
    ========================= */

    let registeredUsers =
      [];

    try {
      registeredUsers =
        JSON.parse(
          localStorage.getItem(
            "shopsmartUsers"
          )
        ) || [];
    } catch {
      registeredUsers =
        [];
    }

    const matchedUser =
      registeredUsers.find(
        (user) =>
          user.email
            ?.trim()
            .toLowerCase() ===
            email &&
          user.password ===
            password
      );

    if (!matchedUser) {
      alert(
        "Invalid email or password. Please register first."
      );

      return;
    }

    const normalUser = {
      name:
        matchedUser.name,
      email:
        matchedUser.email,
      role: "user",
    };

    loginUser(
      normalUser
    );

    navigate(
      "/",
      {
        replace: true,
      }
    );
  };

  return (
    <section className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <h1>
            Login
          </h1>

          <p>
            Login to your
            ShopSmart account
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={
            handleSubmit
          }
        >

          <div className="form-group">
            <label
              htmlFor="email"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="password"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={
                form.password
              }
              onChange={
                handleChange
              }
              required
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an
          account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>

        <div className="admin-demo">
          <h3>
            Admin Demo
          </h3>

          <p>
            <strong>
              Email:
            </strong>{" "}
            admin@shopsmart.com
          </p>

          <p>
            <strong>
              Password:
            </strong>{" "}
            admin123
          </p>
        </div>

      </div>
    </section>
  );
}

export default Login;