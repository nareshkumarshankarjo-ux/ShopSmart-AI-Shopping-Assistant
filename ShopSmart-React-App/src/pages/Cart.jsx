import React from "react";

import {
  useNavigate,
} from "react-router-dom";

function Cart({
  cart,
  updateCartQuantity,
  removeFromCart,
}) {
  const navigate =
    useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  const cartCount =
    cart.reduce(
      (totalItems, item) =>
        totalItems +
        Number(item.quantity),
      0
    );

  if (cart.length === 0) {
    return (
      <section className="page-container">
        <div className="container">
          <div className="empty-state">
            <h1>
              🛒
            </h1>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add products from the
              Products page.
            </p>

            <button
              className="checkout-btn"
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

  return (
    <section className="page-container">
      <div className="container">

        <div className="page-heading">
          <h1>
            Shopping Cart
          </h1>

          <p>
            Review your selected
            products.
          </p>
        </div>

        <div className="cart-layout">

          {/* CART PRODUCTS */}
          <div className="cart-items">

            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >

                {/* PRODUCT IMAGE */}
                <img
                  src={
                    item.image?.startsWith(
                      "/"
                    )
                      ? `${
                          import.meta.env
                            .BASE_URL
                        }${item.image.slice(
                          1
                        )}`
                      : item.image
                  }
                  alt={item.name}
                />

                {/* PRODUCT DETAILS */}
                <div className="cart-info">
                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    ₹
                    {Number(
                      item.price
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                {/* QUANTITY CONTROLS */}
                <div className="quantity">

                  <button
                    type="button"
                    onClick={() =>
                      updateCartQuantity(
                        item,
                        Number(
                          item.quantity
                        ) - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateCartQuantity(
                        item,
                        Number(
                          item.quantity
                        ) + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                {/* ITEM TOTAL */}
                <strong>
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
                </strong>

                {/* REMOVE BUTTON */}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    removeFromCart(
                      item.id
                    )
                  }
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          {/* ORDER SUMMARY */}
          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div>
              <span>
                Products
              </span>

              <span>
                {cartCount}
              </span>
            </div>

            <div>
              <span>
                Delivery
              </span>

              <span>
                FREE
              </span>
            </div>

            <hr />

            <div className="cart-total">
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

            <button
              type="button"
              className="checkout-btn"
              onClick={() =>
                navigate(
                  "/checkout"
                )
              }
            >
              Proceed to Checkout
            </button>

          </aside>

        </div>
      </div>
    </section>
  );
}

export default Cart;