import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function Checkout({
  cart = [],
  clearCart,
}) {
  const navigate =
    useNavigate();

  let savedUser = {};

  try {
    savedUser =
      JSON.parse(
        localStorage.getItem(
          "shopsmartUser"
        ) || "{}"
      );
  } catch {
    savedUser = {};
  }

  const [
    formData,
    setFormData,
  ] = useState({
    fullName:
      savedUser.name ||
      savedUser.fullName ||
      "",

    email:
      savedUser.email ||
      "",

    mobile: "",

    address: "",

    city: "",

    pincode: "",

    paymentMethod:
      "Cash on Delivery",
  });

  const [
    orderPlaced,
    setOrderPlaced,
  ] = useState(false);

  const [
    finalOrderTotal,
    setFinalOrderTotal,
  ] = useState(0);

  const totalProducts =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.quantity || 1
        ),
      0
    );

  const totalAmount =
    cart.reduce(
      (
        total,
        item
      ) =>
        total +
        Number(
          item.price || 0
        ) *
          Number(
            item.quantity || 1
          ),
      0
    );

  const getImageUrl = (
    image
  ) => {
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
    }${String(
      image
    ).replace(/^\/+/, "")}`;
  };

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,

        [name]:
          value,
      })
    );
  };

  /* =====================================
     PLACE ORDER
  ===================================== */

  const handleSubmit =
    async (
      event
    ) => {
      event.preventDefault();

      if (
        cart.length ===
        0
      ) {
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
        Save the amount
        BEFORE clearing cart.
      */

      setFinalOrderTotal(
        totalAmount
      );

      setOrderPlaced(
        true
      );

      if (
        typeof clearCart ===
        "function"
      ) {
        await clearCart();
      }
    };

  /* =====================================
     SUCCESS PAGE
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
              Order Placed
              Successfully!
            </h1>

            <p>
              Thank you,{" "}
              {
                formData.fullName
              }
              . Your ShopSmart
              order has been
              placed successfully.
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
              before proceeding
              to checkout.
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
            Complete your
            delivery and payment
            details to place your
            order.
          </p>
        </div>

        <div className="checkout-layout">
          {/* FORM */}

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
                  where you would
                  like your order
                  delivered.
                </p>
              </div>

              <div className="checkout-form-group">
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={
                    formData.fullName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label>
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={
                    formData.mobile
                  }
                  onChange={
                    handleChange
                  }
                  maxLength="10"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>

              <div className="checkout-form-group">
                <label>
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                  placeholder="Enter complete delivery address"
                  required
                />
              </div>

              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      formData.city
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="City"
                    required
                  />
                </div>

                <div className="checkout-form-group">
                  <label>
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={
                      formData.pincode
                    }
                    onChange={
                      handleChange
                    }
                    maxLength="6"
                    placeholder="Pincode"
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
                </div>

                <div className="checkout-payment-options">
                  {[
                    {
                      value:
                        "Cash on Delivery",

                      icon:
                        "💵",
                    },

                    {
                      value:
                        "UPI",

                      icon:
                        "📱",
                    },

                    {
                      value:
                        "Credit / Debit Card",

                      icon:
                        "💳",
                    },
                  ].map(
                    (
                      option
                    ) => (
                      <label
                        key={
                          option.value
                        }
                        className={`checkout-payment-option ${
                          formData.paymentMethod ===
                          option.value
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={
                            option.value
                          }
                          checked={
                            formData.paymentMethod ===
                            option.value
                          }
                          onChange={
                            handleChange
                          }
                        />

                        <span className="payment-icon">
                          {
                            option.icon
                          }
                        </span>

                        <span>
                          <strong>
                            {
                              option.value
                            }
                          </strong>
                        </span>
                      </label>
                    )
                  )}
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

          {/* SUMMARY */}

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
                          {
                            quantity
                          }
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
                  {
                    totalProducts
                  }
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