import React from "react";

import {
  useNavigate,
} from "react-router-dom";

function Cart({
  cart = [],
  updateCartQuantity,
  removeFromCart,
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const cartCount = cart.reduce(
    (totalItems, item) =>
      totalItems +
      Number(item.quantity || 1),
    0
  );

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${import.meta.env.BASE_URL}${String(
      image
    ).replace(/^\/+/, "")}`;
  };

  const handleDecrease = (item) => {
    const nextQuantity =
      Number(item.quantity || 1) - 1;

    if (nextQuantity <= 0) {
      removeFromCart(item.id);
      return;
    }

    updateCartQuantity(
      item,
      nextQuantity
    );
  };

  const handleIncrease = (item) => {
    updateCartQuantity(
      item,
      Number(item.quantity || 1) + 1
    );
  };

  if (cart.length === 0) {
    return (
      <section className="page-container">
        <div className="container">
          <div className="empty-state">
            <h1>🛒</h1>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add products from the
              Products page.
            </p>

            <button
              type="button"
              className="checkout-btn"
              onClick={() =>
                navigate("/products")
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
          <div className="cart-items">
            {cart.map((item) => {
              const quantity =
                Number(
                  item.quantity || 1
                );

              const itemTotal =
                Number(
                  item.price || 0
                ) * quantity;

              return (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <img
                    src={getImageUrl(
                      item.image
                    )}
                    alt={item.name}
                  />

                  <div className="cart-info">
                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="quantity">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        handleDecrease(
                          item
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        handleIncrease(
                          item
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    ₹
                    {itemTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

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
              );
            })}
          </div>

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
