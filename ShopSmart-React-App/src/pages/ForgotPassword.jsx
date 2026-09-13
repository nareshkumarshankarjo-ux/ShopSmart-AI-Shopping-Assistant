import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function ForgotPassword() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [message, setMessage] =
    useState("");

  const [
    messageType,
    setMessageType,
  ] = useState("");

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const enteredEmail =
      email
        .trim()
        .toLowerCase();

    if (!enteredEmail) {
      setMessage(
        "Please enter your registered email."
      );

      setMessageType(
        "error"
      );

      return;
    }

    if (
      newPassword.length < 6
    ) {
      setMessage(
        "Password must contain at least 6 characters."
      );

      setMessageType(
        "error"
      );

      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setMessage(
        "New password and confirm password do not match."
      );

      setMessageType(
        "error"
      );

      return;
    }

    let registeredUser =
      null;

    try {
      registeredUser =
        JSON.parse(
          localStorage.getItem(
            "shopsmartRegisteredUser"
          ) || "null"
        );
    } catch {
      registeredUser =
        null;
    }

    if (!registeredUser) {
      setMessage(
        "No registered user found. Please create an account first."
      );

      setMessageType(
        "error"
      );

      return;
    }

    const registeredEmail =
      String(
        registeredUser.email ||
          ""
      )
        .trim()
        .toLowerCase();

    if (
      enteredEmail !==
      registeredEmail
    ) {
      setMessage(
        "This email is not registered."
      );

      setMessageType(
        "error"
      );

      return;
    }

    const updatedUser = {
      ...registeredUser,
      password:
        newPassword,
    };

    localStorage.setItem(
      "shopsmartRegisteredUser",
      JSON.stringify(
        updatedUser
      )
    );

    setMessage(
      "Password changed successfully."
    );

    setMessageType(
      "success"
    );

    setTimeout(() => {
      navigate(
        "/login",
        {
          replace: true,
        }
      );
    }, 1200);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>
            Forgot Password
          </h1>

          <p className="auth-subtitle">
            Enter your registered
            email and create a new
            password.
          </p>
        </div>

        {message && (
          <div
            className={`auth-message ${messageType}`}
          >
            {message}
          </div>
        )}

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
              Registered Email
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
              placeholder="Enter your registered email"
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="newPassword"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              value={
                newPassword
              }
              onChange={(
                event
              ) =>
                setNewPassword(
                  event.target
                    .value
                )
              }
              placeholder="Enter new password"
              minLength="6"
              required
            />
          </div>

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
              placeholder="Confirm new password"
              minLength="6"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn full-width"
          >
            Reset Password
          </button>
        </form>

        <p className="auth-switch">
          Remembered your
          password?{" "}

          <Link to="/login">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ForgotPassword;