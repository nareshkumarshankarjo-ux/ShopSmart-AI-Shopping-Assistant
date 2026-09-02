import React from "react";

function Cart({
  cart,
  updateCartQuantity,
  removeFromCart,
}) {
  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        item.quantity,
    0
  );

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
            {cart.map((item) => (
              <div
                className="cart-item"
                key={item.id}
              >
                <img
                  src={
                    item.image?.startsWith("/")
                      ? `${import.meta.env.BASE_URL}${item.image.slice(1)}`
                      : item.image
                  }
                  alt={item.name}
                />

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

                <div className="quantity">
                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <button
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

          <aside className="cart-summary">
            <h2>
              Order Summary
            </h2>

            <div>
              <span>
                Products
              </span>

              <span>
                {cart.length}
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

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;