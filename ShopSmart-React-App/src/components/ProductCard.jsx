import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  isLoggedIn,
  compareItems = [],
  toggleCompare,
  isRecommended,
}) {
  const navigate = useNavigate();

  const isSelected = compareItems.some(
    (item) => String(item.id) === String(product.id)
  );

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Please login to add products to cart.");
      navigate("/login");
      return;
    }

    if (typeof addToCart === "function") {
      addToCart(product);
    }
  };

  const handleCompare = () => {
    if (!isLoggedIn) {
      alert("Please login to compare products.");
      navigate("/login");
      return;
    }

    if (typeof toggleCompare === "function") {
      toggleCompare(product);
    }
  };

  const imageSource = product.image?.startsWith("http")
    ? product.image
    : `${import.meta.env.BASE_URL}${String(product.image || "").replace(/^\/+/, "")}`;

  return (
    <article
      className={`product-card ${
        isRecommended ? "recommended-product-card" : ""
      }`}
    >
      {isRecommended && (
        <div className="ai-recommended-badge">🤖 AI Recommended</div>
      )}

      <div className="product-image-wrap">
        <img
          src={imageSource}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>

        <h3 className="product-title">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-rating-row">
          <span className="rating">⭐ {product.rating}</span>

          {product.bestSeller && (
            <span className="best-seller-badge">Best Seller</span>
          )}
        </div>

        {product.batteryScore && (
          <div className="product-battery">
            🔋 Battery Score: {product.batteryScore}/10
          </div>
        )}

        <div className="product-meta">
          <span className="price">
            ₹{Number(product.price || 0).toLocaleString("en-IN")}
          </span>

          {product.originalPrice &&
            Number(product.originalPrice) > Number(product.price) && (
              <span className="original-price">
                ₹{Number(product.originalPrice).toLocaleString("en-IN")}
              </span>
            )}
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="product-cart-btn"
            onClick={handleAddToCart}
          >
            <span aria-hidden="true">🛒</span>
            Add to Cart
          </button>

          <button
            type="button"
            className={isSelected ? "compare-btn selected" : "compare-btn"}
            onClick={handleCompare}
          >
            {isSelected ? "✓ Selected" : "⚖ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
