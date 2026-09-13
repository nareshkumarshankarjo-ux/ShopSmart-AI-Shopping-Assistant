import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Home({
  products = [],
  addToCart,
  isLoggedIn = false,
  currentUser = null,
  compareItems = [],
  toggleCompare,
  clearCompare,
}) {
  const navigate = useNavigate();

  /* =====================================================
     BEST SELLING PRODUCTS
  ===================================================== */

  const bestSellingProducts = products
    .filter(
      (product) =>
        product.bestSeller === true ||
        product.bestSeller === "true"
    )
    .slice(0, 4);

  /*
    If no product has bestSeller,
    show first 4 products.
  */

  const featuredProducts =
    bestSellingProducts.length > 0
      ? bestSellingProducts
      : products.slice(0, 4);

  /* =====================================================
     START SHOPPING
  ===================================================== */

  const handleStartShopping = () => {
    navigate("/products");
  };

  /* =====================================================
     COMPARE NOW
  ===================================================== */

  const handleCompareNow = () => {
    if (!isLoggedIn) {
      alert(
        "Please login to compare products."
      );

      navigate("/login");

      return;
    }

    if (compareItems.length < 2) {
      alert(
        "Please select 2 products to compare."
      );

      return;
    }

    navigate("/compare");
  };

  /* =====================================================
     CLEAR COMPARE
  ===================================================== */

  const handleClearCompare = () => {
    /*
      If App.jsx gives us clearCompare,
      use it.
    */

    if (
      typeof clearCompare ===
      "function"
    ) {
      clearCompare();
      return;
    }

    /*
      Backup:
      Deselect every selected product
      using toggleCompare.
    */

    if (
      typeof toggleCompare ===
      "function"
    ) {
      [...compareItems].forEach(
        (product) => {
          toggleCompare(product);
        }
      );
    }
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="hero">
        <div className="container">
          <div className="hero-content">

            {/* LEFT SIDE */}

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

              <button
                type="button"
                className="hero-button"
                onClick={
                  handleStartShopping
                }
              >
                Start Shopping
              </button>

              {isLoggedIn &&
                currentUser?.name && (
                  <p
                    className="home-welcome-message"
                  >
                    Welcome back,{" "}
                    <strong>
                      {
                        currentUser.name
                      }
                    </strong>
                    !
                  </p>
                )}
            </div>

            {/* RIGHT SIDE */}

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
        </div>
      </section>

      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="features-section">
        <div className="container">

          <h2 className="section-title">
            Why ShopSmart?
          </h2>

          <div className="feature-grid">

            <div className="feature-card">
              <span>
                🔍
              </span>

              <h3>
                Smart Search
              </h3>

              <p>
                Search products using
                natural sentences.
              </p>
            </div>

            <div className="feature-card">
              <span>
                💰
              </span>

              <h3>
                Compare Prices
              </h3>

              <p>
                Easily identify better
                value products.
              </p>
            </div>

            <div className="feature-card">
              <span>
                🤖
              </span>

              <h3>
                AI Suggestions
              </h3>

              <p>
                Get smarter product
                recommendations.
              </p>
            </div>

            <div className="feature-card">
              <span>
                🛒
              </span>

              <h3>
                Easy Cart
              </h3>

              <p>
                Add and manage
                products in your
                shopping cart.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================
          BEST SELLING PRODUCTS
      ================================================= */}

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

          {/* =================================================
              COMPARE TOOLBAR
          ================================================= */}

          {compareItems.length > 0 && (
            <div className="compare-toolbar">

              <div className="compare-toolbar-info">

                <div>
                  <strong>
                    ⚖ Compare Products
                  </strong>

                  <span className="compare-count-text">
                    {" "}
                    {compareItems.length}/2
                    selected
                  </span>
                </div>

                <div className="compare-selected-products">

                  {compareItems.map(
                    (product) => (
                      <span
                        key={
                          product.id
                        }
                        className="compare-selected-name"
                      >
                        {product.name}
                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="compare-toolbar-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    handleCompareNow
                  }
                  disabled={
                    compareItems.length <
                    2
                  }
                >
                  Compare Now
                </button>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={
                    handleClearCompare
                  }
                >
                  Clear
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              PRODUCTS
          ================================================= */}

          {featuredProducts.length ===
          0 ? (
            <div className="empty-state">

              <h2>
                No products available
              </h2>

              <p>
                Please make sure the
                JSON server is running.
              </p>

            </div>
          ) : (
            <div className="product-grid">

              {featuredProducts.map(
                (product) => (
                  <ProductCard
                    key={
                      product.id
                    }

                    product={
                      product
                    }

                    addToCart={
                      addToCart
                    }

                    isLoggedIn={
                      isLoggedIn
                    }

                    compareItems={
                      compareItems
                    }

                    toggleCompare={
                      toggleCompare
                    }

                    isRecommended={
                      false
                    }
                  />
                )
              )}

            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Home;