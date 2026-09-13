import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

function Login({
  login,
  onLogin,
}) {
  const navigate =
    useNavigate();

  /* =====================================================
     LOGIN MODE
  ===================================================== */

  const [
    loginMode,
    setLoginMode,
  ] = useState("email");

  /* =====================================================
     EMAIL LOGIN
  ===================================================== */

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  /* =====================================================
     MOBILE OTP LOGIN
  ===================================================== */

  const [
    mobile,
    setMobile,
  ] = useState("");

  const [
    otp,
    setOtp,
  ] = useState("");

  const [
    otpSent,
    setOtpSent,
  ] = useState(false);

  const [
    otpMessage,
    setOtpMessage,
  ] = useState("");

  const [
    otpUser,
    setOtpUser,
  ] = useState(null);

  /* =====================================================
     COMPLETE LOGIN
     IMPORTANT:
     This calls App.jsx login()
  ===================================================== */

  const completeLogin = (
    user
  ) => {
    if (!user) {
      return;
    }

    if (
      typeof login ===
      "function"
    ) {
      login(user);
    } else if (
      typeof onLogin ===
      "function"
    ) {
      onLogin(user);
    } else {
      /*
        Backup only.
        Normally App.jsx supplies
        login={login}.
      */

      localStorage.setItem(
        "shopsmartUser",
        JSON.stringify(user)
      );
    }
  };

  /* =====================================================
     READ REGISTERED USERS
  ===================================================== */

  const getRegisteredUsers =
    () => {
      try {
        const users =
          JSON.parse(
            localStorage.getItem(
              "shopsmartUsers"
            ) || "[]"
          );

        return Array.isArray(
          users
        )
          ? users
          : [];
      } catch {
        return [];
      }
    };

  /* =====================================================
     EMAIL / PASSWORD LOGIN
  ===================================================== */

  const handleEmailLogin = (
    event
  ) => {
    event.preventDefault();

    setMessage("");

    const enteredEmail =
      email
        .trim()
        .toLowerCase();

    const enteredPassword =
      password;

    /* =========================
       ADMIN LOGIN
    ========================= */

    if (
      enteredEmail ===
        "admin@shopsmart.com" &&
      enteredPassword ===
        "admin123"
    ) {
      const adminUser = {
        id: "admin",

        name: "Admin",

        email:
          "admin@shopsmart.com",

        role: "admin",

        loginMethod:
          "email",
      };

      completeLogin(
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
       NORMAL REGISTERED USER
    ========================= */

    const registeredUsers =
      getRegisteredUsers();

    const matchedUser =
      registeredUsers.find(
        (user) =>
          String(
            user.email || ""
          )
            .trim()
            .toLowerCase() ===
            enteredEmail &&
          String(
            user.password || ""
          ) ===
            enteredPassword
      );

    if (!matchedUser) {
      setMessage(
        "Invalid email or password."
      );

      return;
    }

    const loggedInUser = {
      id:
        matchedUser.id,

      name:
        matchedUser.name ||
        matchedUser.fullName ||
        "User",

      email:
        matchedUser.email,

      mobile:
        matchedUser.mobile ||
        "",

      role: "user",

      loginMethod:
        "email",
    };

    completeLogin(
      loggedInUser
    );

    navigate(
      "/",
      {
        replace: true,
      }
    );
  };

  /* =====================================================
     SEND DEMO OTP
     ONLY REGISTERED MOBILE NUMBERS
  ===================================================== */

  const handleSendOtp = (
    event
  ) => {
    event.preventDefault();

    setOtpMessage("");

    const cleanMobile =
      mobile.replace(
        /\D/g,
        ""
      );

    if (
      cleanMobile.length !==
      10
    ) {
      setOtpMessage(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }

    const registeredUsers =
      getRegisteredUsers();

    const matchedUser =
      registeredUsers.find(
        (user) =>
          String(
            user.mobile || ""
          ).replace(
            /\D/g,
            ""
          ) ===
          cleanMobile
      );

    if (!matchedUser) {
      setOtpUser(null);

      setOtpSent(false);

      setOtpMessage(
        "This mobile number is not registered. Please register first."
      );

      return;
    }

    setOtpUser(
      matchedUser
    );

    setOtpSent(
      true
    );

    setOtp("");

    setOtpMessage(
      "Demo OTP sent successfully. Use OTP: 123456"
    );
  };

  /* =====================================================
     VERIFY OTP
  ===================================================== */

  const handleVerifyOtp = (
    event
  ) => {
    event.preventDefault();

    setOtpMessage("");

    if (!otpUser) {
      setOtpMessage(
        "User not found. Please resend OTP."
      );

      return;
    }

    if (
      otp.trim() !==
      "123456"
    ) {
      setOtpMessage(
        "Invalid OTP. Please enter 123456."
      );

      return;
    }

    /*
      IMPORTANT:
      Use the real registered user's
      name/email/mobile here.
    */

    const loggedInUser = {
      id:
        otpUser.id,

      name:
        otpUser.name ||
        otpUser.fullName ||
        "User",

      email:
        otpUser.email ||
        "",

      mobile:
        otpUser.mobile ||
        mobile,

      role: "user",

      loginMethod:
        "mobile-otp",
    };

    /*
      This updates currentUser
      inside App.jsx.
    */

    completeLogin(
      loggedInUser
    );

    /*
      App.jsx now has:
      currentUser = loggedInUser

      Therefore:
      isLoggedIn = true
    */

    navigate(
      "/",
      {
        replace: true,
      }
    );
  };

  /* =====================================================
     CHANGE MOBILE NUMBER
  ===================================================== */

  const handleChangeNumber =
    () => {
      setOtp("");

      setOtpSent(
        false
      );

      setOtpUser(
        null
      );

      setOtpMessage(
        ""
      );
    };

  /* =====================================================
     SWITCH LOGIN MODE
  ===================================================== */

  const switchToEmail =
    () => {
      setLoginMode(
        "email"
      );

      setMessage("");

      setOtpMessage("");
    };

  const switchToMobile =
    () => {
      setLoginMode(
        "mobile"
      );

      setMessage("");

      setOtpMessage("");

      setOtpSent(
        false
      );

      setOtpUser(
        null
      );

      setOtp("");
    };

  return (
    <section className="auth-page">
      <div className="auth-card login-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="auth-header">

          <div className="login-icon">
            🛍️
          </div>

          <h1>
            Welcome Back
          </h1>

          <p className="auth-subtitle">
            Login to your
            ShopSmart account
          </p>

        </div>

        {/* =================================================
            LOGIN TABS
        ================================================= */}

        <div className="login-tabs">

          <button
            type="button"
            className={
              loginMode ===
              "email"
                ? "login-tab active"
                : "login-tab"
            }
            onClick={
              switchToEmail
            }
          >
            ✉ Email Login
          </button>

          <button
            type="button"
            className={
              loginMode ===
              "mobile"
                ? "login-tab active"
                : "login-tab"
            }
            onClick={
              switchToMobile
            }
          >
            📱 Mobile OTP
          </button>

        </div>

        {/* =================================================
            EMAIL LOGIN
        ================================================= */}

        {loginMode ===
          "email" && (
          <>

            {message && (
              <div className="auth-message error">
                {message}
              </div>
            )}

            <form
              className="auth-form"
              onSubmit={
                handleEmailLogin
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
                  autoComplete="email"
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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

              </div>

              <div className="forgot-password-row">

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                className="primary-btn full-width login-main-btn"
              >
                Login
              </button>

            </form>

          </>
        )}

        {/* =================================================
            MOBILE OTP LOGIN
        ================================================= */}

        {loginMode ===
          "mobile" && (
          <div className="mobile-login-box">

            {otpMessage && (
              <div
                className={
                  otpMessage.includes(
                    "successfully"
                  )
                    ? "auth-message success"
                    : "auth-message error"
                }
              >
                {otpMessage}
              </div>
            )}

            {/* ===============================
                ENTER MOBILE
            =============================== */}

            {!otpSent ? (
              <form
                className="auth-form"
                onSubmit={
                  handleSendOtp
                }
              >

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
                      inputMode="numeric"
                      value={
                        mobile
                      }
                      onChange={(
                        event
                      ) =>
                        setMobile(
                          event
                            .target
                            .value
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
                      placeholder="Enter registered mobile number"
                      maxLength="10"
                      autoComplete="tel"
                      required
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="primary-btn full-width login-main-btn"
                >
                  📲 Send OTP
                </button>

                <p className="otp-demo-note">
                  Enter the mobile
                  number used during
                  registration.
                </p>

              </form>
            ) : (

              /* ===============================
                  VERIFY OTP
              =============================== */

              <form
                className="auth-form"
                onSubmit={
                  handleVerifyOtp
                }
              >

                <div className="otp-sent-number">

                  OTP sent to{" "}

                  <strong>
                    +91 {mobile}
                  </strong>

                </div>

                {otpUser && (
                  <div className="otp-user-preview">

                    Welcome,{" "}

                    <strong>
                      {otpUser.name ||
                        otpUser.fullName ||
                        "User"}
                    </strong>

                  </div>
                )}

                <div className="form-group">

                  <label
                    htmlFor="otp"
                  >
                    Enter OTP
                  </label>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    className="otp-input"
                    value={
                      otp
                    }
                    onChange={(
                      event
                    ) =>
                      setOtp(
                        event
                          .target
                          .value
                          .replace(
                            /\D/g,
                            ""
                          )
                          .slice(
                            0,
                            6
                          )
                      )
                    }
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="primary-btn full-width login-main-btn"
                >
                  ✓ Verify OTP
                </button>

                <div className="otp-options">

                  <button
                    type="button"
                    className="text-button"
                    onClick={
                      handleSendOtp
                    }
                  >
                    Resend OTP
                  </button>

                  <button
                    type="button"
                    className="text-button"
                    onClick={
                      handleChangeNumber
                    }
                  >
                    Change Number
                  </button>

                </div>

                <div className="demo-otp-box">

                  Demo OTP:{" "}

                  <strong>
                    123456
                  </strong>

                </div>

              </form>
            )}

          </div>
        )}

        {/* =================================================
            REGISTER
        ================================================= */}

        <p className="auth-switch">

          Don't have an
          account?{" "}

          <Link to="/register">
            Register
          </Link>

        </p>

        {/* =================================================
            ADMIN
        ================================================= */}

        <div className="demo-box">

          <div className="demo-title">
            🔐 Admin Demo
          </div>

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