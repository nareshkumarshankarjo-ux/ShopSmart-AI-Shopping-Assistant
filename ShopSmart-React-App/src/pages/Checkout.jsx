import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({
  cart = [],
  clearCart,
}) {
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("shopsmartUser") ||
      "{}"
  );

  const [formData, setFormData] =
    useState({
      fullName:
        savedUser.name ||
        savedUser.fullName ||
        "",

      email:
        savedUser.email || "",

      mobile: "",
      address: "",
      city: "",
      pincode: "",

      paymentMethod:
        "Cash on Delivery",
    });

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [
    finalOrderTotal,
    setFinalOrderTotal,
  ] = useState(0);

  const totalProducts =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 1),
      0
    );

  const totalAmount =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(
            item.quantity || 1
          ),
      0
    );

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      )
    ) {
      return image;
    }

    return `${
      import.meta.env.BASE_URL
    }${String(image).replace(
      /^\/+/,
      ""
    )}`;
  };

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );
  };

  /* =====================================
     PLACE ORDER
  ===================================== */

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert(
        "Your cart is empty."
      );

      navigate(
        "/products"
      );

      return;
    }

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert(
        "Please fill in all delivery details."
      );

      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        formData.mobile
      )
    ) {
      alert(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }

    if (
      !/^[0-9]{6}$/.test(
        formData.pincode
      )
    ) {
      alert(
        "Please enter a valid 6-digit pincode."
      );

      return;
    }

    /*
      IMPORTANT:
      Save total before clearing cart.
    */
    setFinalOrderTotal(
      totalAmount
    );

    setOrderPlaced(true);

    if (
      typeof clearCart ===
      "function"
    ) {
      clearCart();
    }
  };

  /* =====================================
     ORDER SUCCESS
  ===================================== */

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="container">
          <div className="order-success-card">
            <div className="order-success-icon">
              ✓
            </div>

            <h1>
              Order Placed Successfully!
            </h1>

            <p>
              Thank you,{" "}
              {formData.fullName}.
              Your ShopSmart order
              has been placed
              successfully.
            </p>

            <p className="order-success-total">
              Order Total: ₹
              {finalOrderTotal.toLocaleString(
                "en-IN"
              )}
            </p>

            <button
              type="button"
              className="checkout-primary-btn"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =====================================
     EMPTY CART
  ===================================== */

  if (
    cart.length === 0
  ) {
    return (
      <section className="checkout-page">
        <div className="container">
          <div className="checkout-empty-card">
            <div className="checkout-empty-icon">
              🛒
            </div>

            <h1>
              Your cart is empty
            </h1>

            <p>
              Add some products
              before proceeding to
              checkout.
            </p>

            <button
              type="button"
              className="checkout-primary-btn"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Go to Products
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="container">
        <div className="checkout-page-heading">
          <h1>
            Checkout
          </h1>

          <p>
            Complete your delivery
            and payment details to
            place your order.
          </p>
        </div>

        <div className="checkout-layout">
          {/* LEFT SIDE */}

          <div className="checkout-form-card">
            <form
              onSubmit={
                handleSubmit
              }
            >
              <div className="checkout-section-heading">
                <h2>
                  Delivery Details
                </h2>

                <p>
                  Enter the address
                  where you would like
                  your order delivered.
                </p>
              </div>

              <div className="checkout-form-group">
                <label
                  htmlFor="fullName"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label
                  htmlFor="email"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label
                  htmlFor="mobile"
                >
                  Mobile Number
                </label>

                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={
                    formData.mobile
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label
                  htmlFor="address"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter complete delivery address"
                  rows="4"
                  required
                />
              </div>

              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label
                    htmlFor="city"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label
                    htmlFor="pincode"
                  >
                    Pincode
                  </label>

                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    value={
                      formData.pincode
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter pincode"
                    maxLength="6"
                    required
                  />
                </div>
              </div>

              {/* PAYMENT */}

              <div className="checkout-payment-section">
                <div className="checkout-section-heading">
                  <h2>
                    Payment Method
                  </h2>

                  <p>
                    Select your
                    preferred payment
                    option.
                  </p>
                </div>

                <div className="checkout-payment-options">
                  <label
                    className={`checkout-payment-option ${
                      formData.paymentMethod ===
                      "Cash on Delivery"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={
                        formData.paymentMethod ===
                        "Cash on Delivery"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span className="payment-icon">
                      💵
                    </span>

                    <span>
                      <strong>
                        Cash on Delivery
                      </strong>

                      <small>
                        Pay when your
                        order arrives
                      </small>
                    </span>
                  </label>

                  <label
                    className={`checkout-payment-option ${
                      formData.paymentMethod ===
                      "UPI"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={
                        formData.paymentMethod ===
                        "UPI"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span className="payment-icon">
                      📱
                    </span>

                    <span>
                      <strong>
                        UPI
                      </strong>

                      <small>
                        Pay using your
                        UPI app
                      </small>
                    </span>
                  </label>

                  <label
                    className={`checkout-payment-option ${
                      formData.paymentMethod ===
                      "Credit / Debit Card"
                        ? "active"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit / Debit Card"
                      checked={
                        formData.paymentMethod ===
                        "Credit / Debit Card"
                      }
                      onChange={
                        handleChange
                      }
                    />

                    <span className="payment-icon">
                      💳
                    </span>

                    <span>
                      <strong>
                        Credit / Debit Card
                      </strong>

                      <small>
                        Pay securely
                        using your card
                      </small>
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="place-order-btn"
              >
                🛍️ Place Order
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}

          <aside className="checkout-summary-card">
            <h2>
              Order Summary
            </h2>

            <div className="checkout-summary-items">
              {cart.map(
                (item) => {
                  const quantity =
                    Number(
                      item.quantity ||
                        1
                    );

                  return (
                    <div
                      className="checkout-summary-item"
                      key={
                        item.id
                      }
                    >
                      <img
                        src={getImageUrl(
                          item.image
                        )}
                        alt={
                          item.name
                        }
                        className="checkout-summary-image"
                      />

                      <div className="checkout-summary-info">
                        <h3>
                          {
                            item.name
                          }
                        </h3>

                        <p>
                          Quantity:{" "}
                          {quantity}
                        </p>

                        <strong>
                          ₹
                          {(
                            Number(
                              item.price
                            ) *
                            quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="checkout-summary-calculation">
              <div>
                <span>
                  Products
                </span>

                <strong>
                  {totalProducts}
                </strong>
              </div>

              <div>
                <span>
                  Delivery
                </span>

                <strong className="checkout-free">
                  FREE
                </strong>
              </div>

              <div className="checkout-total-row">
                <span>
                  Total
                </span>

                <strong>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>

            <div className="checkout-security">
              🔒 Secure Checkout
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;