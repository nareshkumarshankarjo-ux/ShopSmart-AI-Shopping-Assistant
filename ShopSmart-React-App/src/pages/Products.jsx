import React, { useState } from "react";

import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

import {
  smartProductSearch,
} from "../data/smartSearch.js";

function Products({
  products,
  loading,
  addToCart,
}) {
  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState(null);

  const [category, setCategory] =
    useState("All");

  const [message, setMessage] =
    useState("");

  const [lastSearch, setLastSearch] =
    useState("");

  const categories = [
    "All",
    ...new Set(
      products.map(
        (product) =>
          product.category
      )
    ),
  ];

  // =========================
  // SMART SEARCH
  // =========================

  const handleSmartSearch = (
    searchQuery
  ) => {
    const query =
      searchQuery.trim();

    // Search box empty
    // Show all products again
    if (!query) {
      setFilteredProducts(null);
      setCategory("All");
      setMessage("");
      setLastSearch("");
      return;
    }

    const result =
      smartProductSearch(
        products,
        query
      );

    setFilteredProducts(result);

    // Keep All selected while
    // displaying smart search results
    setCategory("All");

    setLastSearch(query);

    if (result.length > 0) {
      setMessage(
        `Smart Search found ${result.length} suitable product(s).`
      );
    } else {
      setMessage(
        "No suitable products found."
      );
    }
  };

  // =========================
  // CATEGORY FILTER
  // =========================

  const handleCategoryClick = (
    selectedCategory
  ) => {
    setCategory(
      selectedCategory
    );

    // IMPORTANT:
    // Clicking All resets search
    if (
      selectedCategory === "All"
    ) {
      setFilteredProducts(null);
      setMessage("");
      setLastSearch("");
      return;
    }

    // Category selection should
    // search from ALL products
    const categoryProducts =
      products.filter(
        (product) =>
          product.category ===
          selectedCategory
      );

    setFilteredProducts(
      categoryProducts
    );

    setMessage("");
    setLastSearch("");
  };

  // =========================
  // DISPLAY PRODUCTS
  // =========================

  const displayedProducts =
    filteredProducts !== null
      ? filteredProducts
      : products;

  // =========================
  // SPEAK RESULTS
  // =========================

  const speakResults = () => {
    if (
      !(
        "speechSynthesis" in
        window
      )
    ) {
      alert(
        "Voice output is not supported in this browser."
      );
      return;
    }

    window.speechSynthesis.cancel();

    if (
      displayedProducts.length ===
      0
    ) {
      const speech =
        new SpeechSynthesisUtterance(
          "Sorry. I could not find any suitable products."
        );

      speech.lang = "en-IN";

      window.speechSynthesis.speak(
        speech
      );

      return;
    }

    const topProducts =
      displayedProducts.slice(
        0,
        3
      );

    let speechText = "";

    if (lastSearch) {
      speechText +=
        `For your search ${lastSearch}, `;
    }

    speechText +=
      `I found ${displayedProducts.length} suitable products. `;

    topProducts.forEach(
      (product, index) => {
        speechText +=
          `${index + 1}. ${product.name}, priced at rupees ${Number(
            product.price
          ).toLocaleString(
            "en-IN"
          )}, with a rating of ${product.rating}. `;
      }
    );

    if (
      displayedProducts.length >
      3
    ) {
      speechText +=
        "You can view the remaining products on the screen.";
    }

    const speech =
      new SpeechSynthesisUtterance(
        speechText
      );

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(
      speech
    );
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="page-container">
        <div className="container">
          <h2>
            Loading products...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page-container">
      <div className="container">

        <div className="page-heading">
          <h1>
            ShopSmart Products
          </h1>

          <p>
            Find the best products
            based on your needs and
            budget.
          </p>
        </div>

        <SearchBar
          onSearch={
            handleSmartSearch
          }
        />

        {message && (
          <div className="ai-result-row">

            <div className="ai-message">
              🤖 {message}
            </div>

            <div className="voice-result-buttons">

              <button
                className="speak-button"
                onClick={
                  speakResults
                }
              >
                🔊 Speak Results
              </button>

              <button
                className="stop-voice-button"
                onClick={
                  stopSpeaking
                }
              >
                ⏹ Stop Voice
              </button>

            </div>
          </div>
        )}

        <div className="category-buttons">

          {categories.map(
            (item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  handleCategoryClick(
                    item
                  )
                }
              >
                {item}
              </button>
            )
          )}

        </div>

        <div className="product-grid">

          {displayedProducts.length >
          0 ? (

            displayedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={
                    addToCart
                  }
                />
              )
            )

          ) : (

            <div className="empty-state">
              <h2>
                No products found
              </h2>

              <p>
                Try another smart
                search.
              </p>
            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default Products;