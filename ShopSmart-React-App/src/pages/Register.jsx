import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const cleanName = fullName.trim();

    const cleanEmail = email
      .trim()
      .toLowerCase();

    const cleanMobile = mobile.replace(
      /\D/g,
      ""
    );

    if (!cleanName) {
      setMessage(
        "Please enter your full name."
      );
      setMessageType("error");
      return;
    }

    if (!cleanEmail) {
      setMessage(
        "Please enter your email address."
      );
      setMessageType("error");
      return;
    }

    if (cleanMobile.length !== 10) {
      setMessage(
        "Please enter a valid 10-digit mobile number."
      );
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
        "Passwords do not match."
      );
      setMessageType("error");
      return;
    }

    let existingUsers = [];

    try {
      existingUsers = JSON.parse(
        localStorage.getItem(
          "shopsmartUsers"
        ) || "[]"
      );
    } catch {
      existingUsers = [];
    }

    const emailExists =
      existingUsers.some(
        (user) =>
          String(user.email || "")
            .trim()
            .toLowerCase() ===
          cleanEmail
      );

    if (emailExists) {
      setMessage(
        "An account already exists with this email."
      );
      setMessageType("error");
      return;
    }

    const mobileExists =
      existingUsers.some(
        (user) =>
          String(
            user.mobile || ""
          ).replace(/\D/g, "") ===
          cleanMobile
      );

    if (mobileExists) {
      setMessage(
        "An account already exists with this mobile number."
      );
      setMessageType("error");
      return;
    }

    const newUser = {
      id: Date.now(),

      name: cleanName,

      fullName: cleanName,

      email: cleanEmail,

      mobile: cleanMobile,

      password,

      role: "user",
    };

    const updatedUsers = [
      ...existingUsers,
      newUser,
    ];

    localStorage.setItem(
      "shopsmartUsers",
      JSON.stringify(
        updatedUsers
      )
    );

    setMessage(
      "Registration successful. You can now login."
    );

    setMessageType(
      "success"
    );

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <section className="auth-page">
      <div className="auth-card register-card">

        <div className="auth-header">
          <div className="login-icon">
            👤
          </div>

          <h1>
            Create Account
          </h1>

          <p className="auth-subtitle">
            Register with ShopSmart
          </p>
        </div>

        {message && (
          <div
            className={
              messageType ===
              "success"
                ? "auth-message success"
                : "auth-message error"
            }
          >
            {message}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={
            handleRegister
          }
        >

          {/* FULL NAME */}

          <div className="form-group">
            <label
              htmlFor="fullName"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(
                event
              ) =>
                setFullName(
                  event.target
                    .value
                )
              }
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          {/* EMAIL */}

          <div className="form-group">
            <label
              htmlFor="email"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(
                event
              ) =>
                setEmail(
                  event.target
                    .value
                )
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          {/* MOBILE NUMBER */}

          <div className="form-group">
            <label
              htmlFor="mobile"
            >
              Mobile Number
            </label>

            <div className="mobile-input-wrapper">
              <span className="country-code">
                +91
              </span>

              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(
                  event
                ) =>
                  setMobile(
                    event.target.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        10
                      )
                  )
                }
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div className="form-group">
            <label
              htmlFor="password"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(
                event
              ) =>
                setPassword(
                  event.target
                    .value
                )
              }
              placeholder="Create password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}

          <div className="form-group">
            <label
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={
                confirmPassword
              }
              onChange={(
                event
              ) =>
                setConfirmPassword(
                  event.target
                    .value
                )
              }
              placeholder="Confirm password"
              autoComplete="new-password"
              required
            />
          </div>

          {/* REGISTER BUTTON */}

          <button
            type="submit"
            className="auth-submit-btn"
          >
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an
          account?{" "}

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Register;