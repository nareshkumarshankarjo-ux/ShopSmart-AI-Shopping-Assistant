import React from "react";
function ProductCard({
  product,
  addToCart,
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />

        {product.bestSeller && (
          <span className="badge">
            Best Seller
          </span>
        )}
      </div>

      <div className="product-content">
        <span className="category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="description">
          {product.description}
        </p>

        <p className="rating">
          ⭐ {product.rating}
        </p>

        <div className="price-row">
          <div>
            <span className="price">
              ₹
              {Number(
                product.price
              ).toLocaleString("en-IN")}
            </span>

            {product.originalPrice && (
              <span className="old-price">
                ₹
                {Number(
                  product.originalPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
          </div>

          <button
            className="primary-btn"
            onClick={() =>
              addToCart(product)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;