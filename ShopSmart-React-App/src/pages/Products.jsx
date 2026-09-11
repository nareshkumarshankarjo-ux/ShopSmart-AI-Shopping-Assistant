import React, {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Products({
  products = [],
  addToCart,
  isLoggedIn,
  compareItems = [],
  toggleCompare,
}) {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    recommendedProduct,
    setRecommendedProduct,
  ] = useState(null);

  const [voiceStatus, setVoiceStatus] =
    useState("");

  const categories = [
    "All",
    "Laptop",
    "Mobile",
    "Headphone",
    "Watch",
    "Tablet",
    "Camera",
  ];

  const normalizeText = (value) =>
    String(value || "")
      .toLowerCase()
      .trim();

  const extractBudget = (query) => {
    const normalized =
      normalizeText(query).replace(
        /,/g,
        ""
      );

    const budgetMatch =
      normalized.match(
        /(?:under|below|less than|within|max|budget)\s*₹?\s*(\d{3,7})/
      );

    if (budgetMatch) {
      return Number(
        budgetMatch[1]
      );
    }

    return null;
  };

  const detectCategory = (query) => {
    const text =
      normalizeText(query);

    const categoryKeywords = {
      Laptop: [
        "laptop",
        "notebook",
        "computer",
      ],
      Mobile: [
        "mobile",
        "phone",
        "smartphone",
        "5g",
      ],
      Headphone: [
        "headphone",
        "headphones",
        "earphone",
        "audio",
      ],
      Watch: [
        "watch",
        "smartwatch",
        "fitness watch",
      ],
      Tablet: [
        "tablet",
        "tab",
      ],
      Camera: [
        "camera",
        "photography",
      ],
    };

    for (const [
      category,
      keywords,
    ] of Object.entries(
      categoryKeywords
    )) {
      if (
        keywords.some((keyword) =>
          text.includes(keyword)
        )
      ) {
        return category;
      }
    }

    return null;
  };

  const getFilteredProducts = (
    query,
    category
  ) => {
    const text =
      normalizeText(query);

    const detectedCategory =
      detectCategory(text);

    const budget =
      extractBudget(text);

    const filterCategory =
      category !== "All"
        ? category
        : detectedCategory;

    return products.filter(
      (product) => {
        const productText = [
          product.name,
          product.brand,
          product.category,
          product.description,
        ]
          .map(normalizeText)
          .join(" ");

        const categoryMatches =
          !filterCategory ||
          normalizeText(
            product.category
          ) ===
            normalizeText(
              filterCategory
            );

        const budgetMatches =
          !budget ||
          Number(
            product.price || 0
          ) <= budget;

        const hasStructuredSearch =
          Boolean(
            detectedCategory ||
              budget
          );

        const textMatches =
          !text ||
          hasStructuredSearch ||
          productText.includes(text);

        return (
          categoryMatches &&
          budgetMatches &&
          textMatches
        );
      }
    );
  };

  const filteredProducts =
    useMemo(
      () =>
        getFilteredProducts(
          searchTerm,
          selectedCategory
        ),
      [
        products,
        searchTerm,
        selectedCategory,
      ]
    );

  const chooseRecommendation = (
    matchingProducts,
    query
  ) => {
    if (
      matchingProducts.length === 0
    ) {
      return null;
    }

    const text =
      normalizeText(query);

    const wantsBattery =
      text.includes("battery");

    const wantsBest =
      text.includes("best") ||
      text.includes("better");

    const wantsBudget =
      Boolean(
        extractBudget(text)
      ) ||
      text.includes("budget") ||
      text.includes("cheap") ||
      text.includes("affordable");

    const sorted = [
      ...matchingProducts,
    ].sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (wantsBattery) {
        scoreA +=
          Number(
            a.batteryScore || 0
          ) * 10;

        scoreB +=
          Number(
            b.batteryScore || 0
          ) * 10;
      }

      if (wantsBest) {
        scoreA +=
          Number(
            a.rating || 0
          ) * 5;

        scoreB +=
          Number(
            b.rating || 0
          ) * 5;
      }

      if (a.bestSeller) {
        scoreA += 4;
      }

      if (b.bestSeller) {
        scoreB += 4;
      }

      if (wantsBudget) {
        scoreA +=
          100000 /
          Math.max(
            Number(a.price || 1),
            1
          );

        scoreB +=
          100000 /
          Math.max(
            Number(b.price || 1),
            1
          );
      }

      if (
        !wantsBattery &&
        !wantsBest &&
        !wantsBudget
      ) {
        scoreA +=
          Number(
            a.rating || 0
          ) * 10 +
          Number(
            a.batteryScore || 0
          );

        scoreB +=
          Number(
            b.rating || 0
          ) * 10 +
          Number(
            b.batteryScore || 0
          );
      }

      return scoreB - scoreA;
    });

    return sorted[0];
  };

  const buildRecommendationText = (
    product,
    query
  ) => {
    if (!product) {
      return "";
    }

    const text =
      normalizeText(query);

    const reasons = [];

    const detectedCategory =
      detectCategory(text);

    const budget =
      extractBudget(text);

    if (detectedCategory) {
      reasons.push(
        `it matches the ${product.category} category`
      );
    }

    if (
      budget &&
      Number(product.price) <=
        budget
    ) {
      reasons.push(
        `it is within your ₹${budget.toLocaleString(
          "en-IN"
        )} budget`
      );
    }

    if (
      text.includes("battery") &&
      product.batteryScore
    ) {
      reasons.push(
        `it has a strong battery score of ${product.batteryScore}/10`
      );
    }

    if (
      text.includes("best") &&
      product.rating
    ) {
      reasons.push(
        `it has a rating of ${product.rating}`
      );
    }

    if (
      reasons.length === 0
    ) {
      reasons.push(
        "it is one of the strongest matches for your search"
      );
    }

    return `${
      product.name
    } is recommended because ${reasons.join(
      " and "
    )}.`;
  };

  const updateRecommendation = (
    query,
    category = selectedCategory
  ) => {
    const matches =
      getFilteredProducts(
        query,
        category
      );

    if (
      !query.trim() &&
      category === "All"
    ) {
      setRecommendedProduct(
        null
      );

      return;
    }

    setRecommendedProduct(
      chooseRecommendation(
        matches,
        query
      )
    );
  };

  const handleSearchChange = (
    event
  ) => {
    const value =
      event.target.value;

    setSearchTerm(value);

    updateRecommendation(
      value
    );
  };

  const handleCategoryChange = (
    category
  ) => {
    setSelectedCategory(
      category
    );

    updateRecommendation(
      searchTerm,
      category
    );
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice Search is not supported in this browser. Please use Google Chrome or type your search."
      );

      return;
    }

    window.speechSynthesis?.cancel();

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";

    recognition.interimResults =
      false;

    recognition.maxAlternatives =
      1;

    setVoiceStatus(
      "Listening..."
    );

    recognition.start();

    recognition.onresult = (
      event
    ) => {
      const transcript =
        event.results[0][0]
          .transcript;

      setSearchTerm(
        transcript
      );

      setSelectedCategory(
        "All"
      );

      updateRecommendation(
        transcript,
        "All"
      );

      setVoiceStatus(
        `You said: "${transcript}"`
      );
    };

    recognition.onerror = () => {
      setVoiceStatus("");

      alert(
        "Voice Search could not understand the request. Please try again."
      );
    };

    recognition.onend = () => {
      setTimeout(() => {
        setVoiceStatus("");
      }, 2500);
    };
  };

  const handleVoiceResults = () => {
    if (
      !recommendedProduct
    ) {
      alert(
        "Search for a product first. Then click Voice Results."
      );

      return;
    }

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

    const recommendationText =
      buildRecommendationText(
        recommendedProduct,
        searchTerm
      );

    const message =
      new SpeechSynthesisUtterance(
        recommendationText
      );

    message.lang = "en-IN";
    message.rate = 0.95;

    window.speechSynthesis.speak(
      message
    );
  };

  const handleClearSearch = () => {
    window.speechSynthesis?.cancel();

    setSearchTerm("");

    setSelectedCategory(
      "All"
    );

    setRecommendedProduct(
      null
    );

    setVoiceStatus("");
  };

  const handleCompareNow = () => {
    if (
      compareItems.length !== 2
    ) {
      alert(
        "Please select exactly 2 products to compare."
      );

      return;
    }

    navigate("/compare");
  };

  const clearCompareSelection =
    () => {
      [...compareItems].forEach(
        (item) =>
          toggleCompare(item)
      );
    };

  const canClear =
    Boolean(
      searchTerm.trim()
    ) ||
    selectedCategory !== "All" ||
    Boolean(
      recommendedProduct
    );

  return (
    <section className="page-container products-page">
      <div className="container">
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

        <div className="search-panel">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={
              handleSearchChange
            }
            placeholder='Try: "budget laptop under 40000 with best battery"'
          />

          <button
            type="button"
            className="voice-btn"
            onClick={
              handleVoiceSearch
            }
          >
            🎤 Voice Search
          </button>

          <button
            type="button"
            className="voice-results-btn"
            onClick={
              handleVoiceResults
            }
          >
            🔊 Voice Results
          </button>

          <button
            type="button"
            className="clear-search-btn"
            onClick={
              handleClearSearch
            }
            disabled={!canClear}
          >
            ✕ Clear
          </button>
        </div>

        {voiceStatus && (
          <p className="voice-status">
            {voiceStatus}
          </p>
        )}

        <div className="filter-bar">
          {categories.map(
            (category) => (
              <button
                type="button"
                key={category}
                className={`filter-btn ${
                  selectedCategory ===
                  category
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleCategoryChange(
                    category
                  )
                }
              >
                {category}
              </button>
            )
          )}
        </div>

        {recommendedProduct && (
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
                {buildRecommendationText(
                  recommendedProduct,
                  searchTerm
                )}
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

                {recommendedProduct.batteryScore && (
                  <span>
                    🔋{" "}
                    {
                      recommendedProduct.batteryScore
                    }
                    /10
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {compareItems.length > 0 && (
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
                (item) => (
                  <span
                    className="compare-selected-name"
                    key={item.id}
                  >
                    {item.name}
                  </span>
                )
              )}
            </div>

            <div className="compare-toolbar-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={
                  handleCompareNow
                }
                disabled={
                  compareItems.length !==
                  2
                }
              >
                Compare Now
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={
                  clearCompareSelection
                }
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <p className="product-result-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length ===
          1
            ? "product"
            : "products"}{" "}
          found
        </p>

        {filteredProducts.length >
        0 ? (
          <div className="products-grid">
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
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
        ) : (
          <div className="empty-state">
            <h1>🔍</h1>

            <h2>
              No products found
            </h2>

            <p>
              Try another search or
              click Clear to see all
              products.
            </p>

            <button
              type="button"
              className="checkout-btn"
              onClick={
                handleClearSearch
              }
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
