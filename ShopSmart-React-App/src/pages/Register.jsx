import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    setError("");

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    const storedUsers =
      JSON.parse(
        localStorage.getItem(
          "shopsmartUsers"
        ) || "[]"
      );

    const cleanEmail =
      email
        .trim()
        .toLowerCase();

    const alreadyExists =
      storedUsers.some(
        (user) =>
          user.email
            ?.toLowerCase() ===
          cleanEmail
      );

    if (alreadyExists) {
      setError(
        "This email is already registered."
      );

      return;
    }

    const newUser = {
      id:
        Date.now(),

      name:
        name.trim(),

      email:
        cleanEmail,

      password,

      role:
        "user",
    };

    const updatedUsers = [
      ...storedUsers,
      newUser,
    ];

    localStorage.setItem(
      "shopsmartUsers",
      JSON.stringify(
        updatedUsers
      )
    );

    alert(
      "Registration successful. Please login."
    );

    navigate(
      "/login"
    );
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>
          Create Account
        </h1>

        <p>
          Register with
          ShopSmart
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
        >
          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              value={
                name
              }
              onChange={(
                event
              ) =>
                setName(
                  event
                    .target
                    .value
                )
              }
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              value={
                email
              }
              onChange={(
                event
              ) =>
                setEmail(
                  event
                    .target
                    .value
                )
              }
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Password
            </label>

            <input
              type="password"
              value={
                password
              }
              onChange={(
                event
              ) =>
                setPassword(
                  event
                    .target
                    .value
                )
              }
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(
                event
              ) =>
                setConfirmPassword(
                  event
                    .target
                    .value
                )
              }
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Register
          </button>
        </form>

        <p className="auth-bottom-text">
          Already have an
          account?{" "}

          <Link
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;