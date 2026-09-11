import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  isLoggedIn,
  compareItems = [],
  toggleCompare,
  isRecommended = false,
}) {
  const navigate = useNavigate();

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

  const isSelected = compareItems.some(
    (item) => item.id === product.id
  );

  const handleAddCart = async () => {
    if (!isLoggedIn) {
      alert(
        "Please login before adding products to cart."
      );

      navigate("/login");

      return;
    }

    const success = await addToCart(product);

    if (success) {
      alert(
        `${product.name} added to cart.`
      );
    }
  };

  return (
    <article
      className={`product-card ${
        isRecommended
          ? "recommended-product-card"
          : ""
      }`}
    >
      {isRecommended && (
        <div className="ai-recommended-badge">
          🤖 AI Recommended
        </div>
      )}

      <div className="product-image-wrap">
        <img
          className="product-image"
          src={getImageUrl(product.image)}
          alt={product.name}
        />
      </div>

      <div className="product-body">
        <span className="product-category">
          {product.category}
        </span>

        <h3 className="product-title">
          {product.name}
        </h3>

        {product.description && (
          <p className="product-description">
            {product.description}
          </p>
        )}

        <div className="product-rating-row">
          <span className="rating">
            ⭐ {product.rating || "N/A"}
          </span>

          {product.bestSeller && (
            <span className="best-seller-badge">
              Best Seller
            </span>
          )}
        </div>

        {product.batteryScore && (
          <div className="product-battery">
            🔋 Battery Score:{" "}
            <strong>
              {product.batteryScore}/10
            </strong>
          </div>
        )}

        <div className="product-meta">
          <span className="price">
            ₹
            {Number(
              product.price
            ).toLocaleString("en-IN")}
          </span>

          {product.originalPrice &&
            Number(product.originalPrice) >
              Number(product.price) && (
              <span className="original-price">
                ₹
                {Number(
                  product.originalPrice
                ).toLocaleString("en-IN")}
              </span>
            )}
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="product-cart-btn"
            onClick={handleAddCart}
          >
            🛒 Add to Cart
          </button>

          <button
            type="button"
            className={`compare-btn ${
              isSelected ? "selected" : ""
            }`}
            onClick={() =>
              toggleCompare(product)
            }
          >
            {isSelected
              ? "✓ Selected for Compare"
              : "⚖ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;