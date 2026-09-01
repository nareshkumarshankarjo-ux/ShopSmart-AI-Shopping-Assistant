import React from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Home({
  products,
  addToCart,
}) {
  const featuredProducts =
    products
      .filter(
        (product) =>
          product.bestSeller
      )
      .slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div>
            <span className="hero-label">
              AI Powered Shopping
            </span>

            <h1>
              Shop Smarter.
              <br />
              Choose Better.
            </h1>

            <p>
              Discover products,
              compare prices and get
              intelligent product
              recommendations with
              ShopSmart.
            </p>

            <Link
              to="/products"
              className="hero-button"
            >
              Start Shopping
            </Link>
          </div>

          <div className="hero-card">
            <div className="ai-icon">
              🤖
            </div>

            <h2>
              ShopSmart Assistant
            </h2>

            <p>
              Try asking:
            </p>

            <div className="sample-query">
              “Budget laptop under
              ₹40,000 with best
              battery”
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Why ShopSmart?
          </h2>

          <div className="feature-grid">
            <div className="feature-card">
              <span>🔍</span>

              <h3>
                Smart Search
              </h3>

              <p>
                Search products using
                natural sentences.
              </p>
            </div>

            <div className="feature-card">
              <span>💰</span>

              <h3>
                Compare Prices
              </h3>

              <p>
                Easily identify better
                value products.
              </p>
            </div>

            <div className="feature-card">
              <span>🤖</span>

              <h3>
                AI Suggestions
              </h3>

              <p>
                Get smarter product
                recommendations.
              </p>
            </div>

            <div className="feature-card">
              <span>🛒</span>

              <h3>
                Easy Cart
              </h3>

              <p>
                Add and manage products
                in your shopping cart.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-section">
        <div className="container">
          <div className="section-heading-row">
            <h2>
              Best Selling Products
            </h2>

            <Link to="/products">
              View All →
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={
                    addToCart
                  }
                />
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;