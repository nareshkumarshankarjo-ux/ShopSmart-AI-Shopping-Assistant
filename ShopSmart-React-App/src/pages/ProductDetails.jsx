import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function ProductDetails({
  products = [],
  addToCart,
  isLoggedIn,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [adding, setAdding] = useState(false);

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <section className="page-container">
        <div className="container">
          <div className="empty-state">
            <h2>Product unavailable</h2>
            <p>
              The product is loading or could not be found.
            </p>

            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const imageSource = product.image?.startsWith("http")
    ? product.image
    : `${import.meta.env.BASE_URL}${String(
        product.image || ""
      ).replace(/^\/+/, "")}`;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setAdding(true);
    setMessage("");

    try {
      const success = await addToCart(product);

      setMessage(
        success
          ? "Product added to cart successfully!"
          : "Unable to add product. Please try again."
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <section className="page-container">
      <div className="container">
        <Link to="/products" className="btn btn-outline">
          ← Back to Products
        </Link>

        <div className="product-details-layout">
          <div className="product-details-image">
            <img src={imageSource} alt={product.name} />
          </div>

          <div className="product-details-content">
            <span className="product-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <p>Brand: {product.brand}</p>

            <div className="product-rating-row">
              <span className="rating">
                ⭐ {product.rating} / 5
              </span>

              {product.bestSeller && (
                <span className="best-seller-badge">
                  Best Seller
                </span>
              )}
            </div>

            <div className="product-meta">
              <span className="price">
                ₹{formatPrice(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <span className="original-price">
                  ₹{formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.originalPrice > product.price && (
              <p style={{ color: "#15803d" }}>
                You save ₹
                {formatPrice(
                  product.originalPrice - product.price
                )}
              </p>
            )}

            {product.batteryScore && (
              <p>
                🔋 Battery Score: {product.batteryScore}/10
              </p>
            )}

            <h2>Product Description</h2>

            <p>{product.description}</p>

            <button
              type="button"
              className="product-cart-btn"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : "🛒 Add to Cart"}
            </button>

            {message && (
              <p role="status" style={{ marginTop: "15px" }}>
                {message}
              </p>
            )}

            {isLoggedIn && (
              <Link
                to="/cart"
                className="btn btn-outline"
                style={{ marginTop: "15px" }}
              >
                View Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;