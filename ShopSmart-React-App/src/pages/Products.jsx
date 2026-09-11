import React, {
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import ProductCard from "../components/ProductCard.jsx";

import {
  smartSearch,
} from "../data/smartSearch.js";

const categories = [
  "All",
  "Laptop",
  "Mobile",
  "Headphone",
  "Watch",
  "Tablet",
  "Camera",
];

function Products({
  products = [],
  loading = false,
  addToCart,
  isLoggedIn,
  compareItems = [],
  toggleCompare,
  clearCompare,
}) {
  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState("All");

  /* =========================
     SMART SEARCH RESULT
  ========================= */

  const searchData =
    useMemo(() => {
      if (
        !query.trim()
      ) {
        let normalProducts =
          [...products];

        if (
          category !==
          "All"
        ) {
          normalProducts =
            normalProducts.filter(
              (product) =>
                product.category ===
                category
            );
        }

        return {
          results:
            normalProducts,

          recommendedProduct:
            null,

          reason: "",
        };
      }

      const smartResult =
        smartSearch(
          products,
          query
        );

      let filtered =
        smartResult.results;

      if (
        category !==
        "All"
      ) {
        filtered =
          filtered.filter(
            (product) =>
              product.category ===
              category
          );
      }

      const recommended =
        filtered.length > 0
          ? filtered[0]
          : null;

      return {
        results:
          filtered,

        recommendedProduct:
          recommended,

        reason:
          recommended
            ? smartResult.reason
            : "",
      };
    }, [
      products,
      query,
      category,
    ]);

  const filteredProducts =
    searchData.results;

  const recommendedProduct =
    searchData.recommendedProduct;

  const recommendationReason =
    searchData.reason;

  /* =========================
     VOICE SEARCH
  ========================= */

  const handleVoiceSearch =
    () => {
      const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!Recognition) {
        alert(
          "Voice Search is not supported in this browser. Please use Chrome or Edge."
        );

        return;
      }

      const recognition =
        new Recognition();

      recognition.lang =
        "en-IN";

      recognition.interimResults =
        false;

      recognition.continuous =
        false;

      recognition.onresult =
        (event) => {
          const speech =
            event.results[0][0]
              .transcript;

          setQuery(
            speech
          );
        };

      recognition.onerror =
        () => {
          alert(
            "Unable to capture voice. Please try again."
          );
        };

      recognition.start();
    };

  /* =========================
     VOICE RESULTS
  ========================= */

  const handleVoiceResults =
    () => {
      if (
        !(
          "speechSynthesis" in
          window
        )
      ) {
        alert(
          "Voice Results are not supported in this browser."
        );

        return;
      }

      window.speechSynthesis.cancel();

      if (
        !recommendedProduct
      ) {
        const speech =
          new SpeechSynthesisUtterance(
            "No matching products found."
          );

        window.speechSynthesis.speak(
          speech
        );

        return;
      }

      const message =
        recommendationReason ||
        `${recommendedProduct.name} is the recommended product.`;

      const speech =
        new SpeechSynthesisUtterance(
          message
        );

      speech.lang =
        "en-IN";

      window.speechSynthesis.speak(
        speech
      );
    };

  return (
    <section className="page-section products-page">

      <div className="container">

        {/* HEADING */}

        <div className="page-heading">

          <h1>
            ShopSmart Products
          </h1>

          <p>
            Find the best products
            based on your needs,
            budget and preferences.
          </p>

        </div>

        {/* SEARCH */}

        <div className="search-panel">

          <input
            type="text"
            className="search-input"
            value={
              query
            }
            onChange={(
              event
            ) =>
              setQuery(
                event.target.value
              )
            }
            placeholder='Try: "budget laptop under 40000 with best battery"'
          />

          <button
            type="button"
            className="btn btn-outline"
            onClick={
              handleVoiceSearch
            }
          >
            🎤 Voice Search
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={
              handleVoiceResults
            }
          >
            🔊 Voice Results
          </button>

        </div>

        {/* FILTER */}

        <div className="filter-bar">

          {categories.map(
            (item) => (
              <button
                type="button"
                key={
                  item
                }
                className={`filter-btn ${
                  category ===
                  item
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCategory(
                    item
                  )
                }
              >
                {
                  item
                }
              </button>
            )
          )}

        </div>

        {/* AI RECOMMENDATION */}

        {query.trim() &&
          recommendedProduct && (
          <div className="ai-search-recommendation">

            <div className="ai-recommendation-icon">
              🤖
            </div>

            <div className="ai-recommendation-content">

              <span className="ai-label">
                ShopSmart AI Recommended
              </span>

              <h2>
                {
                  recommendedProduct.name
                }
              </h2>

              <p>
                {
                  recommendationReason
                }
              </p>

              <div className="ai-recommendation-stats">

                <span>
                  💰 ₹
                  {Number(
                    recommendedProduct.price
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span>
                  ⭐{" "}
                  {
                    recommendedProduct.rating
                  }
                </span>

                <span>
                  🔋{" "}
                  {
                    recommendedProduct.batteryScore ||
                    "N/A"
                  }
                  /10
                </span>

              </div>

            </div>

          </div>
        )}

        {/* COMPARE TOOLBAR */}

        {compareItems.length >
          0 && (
          <div className="compare-toolbar">

            <div className="compare-toolbar-info">

              <strong>
                ⚖ Compare Products
              </strong>

              <span className="compare-count-text">
                {
                  compareItems.length
                }
                /2 selected
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
                    {
                      product.name
                    }
                  </span>
                )
              )}

            </div>

            <div className="compare-toolbar-actions">

              {compareItems.length ===
                2 && (
                <Link
                  to="/compare"
                  className="btn btn-primary"
                >
                  Compare Now
                </Link>
              )}

              <button
                type="button"
                className="btn btn-outline"
                onClick={
                  clearCompare
                }
              >
                Clear
              </button>

            </div>

          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div className="loading">

            Loading products...

          </div>
        ) : filteredProducts.length ===
          0 ? (
          <div className="empty-state">

            <h2>
              No Products Found
            </h2>

            <p>
              Try another search
              phrase or category.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setQuery("");
                setCategory(
                  "All"
                );
              }}
            >
              Show All Products
            </button>

          </div>
        ) : (
          <>

            <div className="product-result-count">

              {
                filteredProducts.length
              }{" "}
              product
              {filteredProducts.length !==
              1
                ? "s"
                : ""}{" "}
              found

            </div>

            <div className="products-grid">

              {filteredProducts.map(
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
                      recommendedProduct?.id ===
                      product.id
                    }
                  />
                )
              )}

            </div>

          </>
        )}

      </div>

    </section>
  );
}

export default Products;