import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function Checkout({
  cart,
  currentUser,
  clearCart,
}) {
  const navigate =
    useNavigate();

  const [fullName, setFullName] =
    useState(
      currentUser?.name || ""
    );

  const [email, setEmail] =
    useState(
      currentUser?.email || ""
    );

  const [mobile, setMobile] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState(
    "Cash on Delivery"
  );

  const [
    orderPlaced,
    setOrderPlaced,
  ] = useState(false);

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(
          item.price
        ) *
          Number(
            item.quantity
          ),
      0
    );

  const handleOrder = async (
    event
  ) => {
    event.preventDefault();

    if (
      cart.length === 0
    ) {
      alert(
        "Your cart is empty."
      );

      return;
    }

    setOrderPlaced(true);

    await clearCart();
  };

  if (orderPlaced) {
    return (
      <section className="success-page">
        <div className="success-card">
          <div className="success-icon">
            ✓
          </div>

          <h1>
            Order Placed
            Successfully!
          </h1>

          <p>
            Thank you for
            shopping with
            ShopSmart.
          </p>

          <p>
            Your order has been
            confirmed.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <h1>
          Checkout
        </h1>

        <p>
          Complete your order
          details
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={
            handleOrder
          }
        >
          <h2>
            Delivery Details
          </h2>

          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              value={
                fullName
              }
              onChange={(
                event
              ) =>
                setFullName(
                  event
                    .target
                    .value
                )
              }
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email Address
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
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Mobile Number
            </label>

            <input
              type="tel"
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
                )
              }
              placeholder="Enter mobile number"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Delivery Address
            </label>

            <textarea
              value={
                address
              }
              onChange={(
                event
              ) =>
                setAddress(
                  event
                    .target
                    .value
                )
              }
              placeholder="Enter complete address"
              required
            />
          </div>

          <div className="checkout-row">
            <div className="form-group">
              <label>
                City
              </label>

              <input
                type="text"
                value={
                  city
                }
                onChange={(
                  event
                ) =>
                  setCity(
                    event
                      .target
                      .value
                  )
                }
                placeholder="City"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Pincode
              </label>

              <input
                type="text"
                value={
                  pincode
                }
                onChange={(
                  event
                ) =>
                  setPincode(
                    event
                      .target
                      .value
                  )
                }
                placeholder="Pincode"
                required
              />
            </div>
          </div>

          <h2 className="payment-title">
            Payment Method
          </h2>

          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(
                  event
                ) =>
                  setPaymentMethod(
                    event
                      .target
                      .value
                  )
                }
              />

              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  paymentMethod ===
                  "UPI"
                }
                onChange={(
                  event
                ) =>
                  setPaymentMethod(
                    event
                      .target
                      .value
                  )
                }
              />

              UPI
            </label>

            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                checked={
                  paymentMethod ===
                  "Card"
                }
                onChange={(
                  event
                ) =>
                  setPaymentMethod(
                    event
                      .target
                      .value
                  )
                }
              />

              Credit / Debit
              Card
            </label>
          </div>

          <button
            type="submit"
            className="place-order-btn"
          >
            Place Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p>
              Your cart is
              empty.
            </p>
          ) : (
            cart.map(
              (item) => (
                <div
                  key={
                    item.id
                  }
                  className="checkout-item"
                >
                  <div>
                    <strong>
                      {
                        item.name
                      }
                    </strong>

                    <p>
                      Qty:{" "}
                      {
                        item.quantity
                      }
                    </p>
                  </div>

                  <span>
                    ₹
                    {(
                      Number(
                        item.price
                      ) *
                      Number(
                        item.quantity
                      )
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )
            )
          )}

          <div className="summary-line">
            <span>
              Products
            </span>

            <span>
              {
                cart.length
              }
            </span>
          </div>

          <div className="summary-line">
            <span>
              Delivery
            </span>

            <span>
              FREE
            </span>
          </div>

          <hr />

          <div className="summary-total">
            <span>
              Total
            </span>

            <span>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;