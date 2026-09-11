import React from "react";

import {
  Link,
} from "react-router-dom";

function Compare({
  compareItems = [],
}) {
  /* =========================================
     NEED EXACTLY 2 PRODUCTS
  ========================================= */

  if (
    !compareItems ||
    compareItems.length < 2
  ) {
    return (
      <section className="page-section">

        <div className="container">

          <div className="empty-state">

            <h2>
              Select 2 products to compare
            </h2>

            <p>
              Go to the Products page
              and choose exactly two products.
            </p>

            <Link
              to="/products"
              className="btn btn-primary"
            >
              Go to Products
            </Link>

          </div>

        </div>

      </section>
    );
  }

  /* =========================================
     TWO SELECTED PRODUCTS
  ========================================= */

  const [
    first,
    second,
  ] = compareItems;

  /* =========================================
     VALUES
  ========================================= */

  const firstPrice =
    Number(
      first.price ||
        0
    );

  const secondPrice =
    Number(
      second.price ||
        0
    );

  const firstRating =
    Number(
      first.rating ||
        0
    );

  const secondRating =
    Number(
      second.rating ||
        0
    );

  const firstBattery =
    Number(
      first.batteryScore ||
        0
    );

  const secondBattery =
    Number(
      second.batteryScore ||
        0
    );

  /* =========================================
     PRICE COMPARISON
  ========================================= */

  const cheaperProduct =
    firstPrice <
    secondPrice
      ? first
      : secondPrice <
          firstPrice
      ? second
      : null;

  const priceDifference =
    Math.abs(
      firstPrice -
        secondPrice
    );

  /* =========================================
     RATING COMPARISON
  ========================================= */

  const betterRatingProduct =
    firstRating >
    secondRating
      ? first
      : secondRating >
          firstRating
      ? second
      : null;

  /* =========================================
     BATTERY COMPARISON
  ========================================= */

  const betterBatteryProduct =
    firstBattery >
    secondBattery
      ? first
      : secondBattery >
          firstBattery
      ? second
      : null;

  /* =========================================
     OVERALL SCORE
  ========================================= */

  let firstScore = 0;
  let secondScore = 0;

  /*
    Price:
    cheaper product gets 1 point
  */

  if (
    firstPrice <
    secondPrice
  ) {
    firstScore += 1;
  } else if (
    secondPrice <
    firstPrice
  ) {
    secondScore += 1;
  }

  /*
    Rating:
    higher rating gets 1 point
  */

  if (
    firstRating >
    secondRating
  ) {
    firstScore += 1;
  } else if (
    secondRating >
    firstRating
  ) {
    secondScore += 1;
  }

  /*
    Battery:
    higher battery score gets 1 point
  */

  if (
    firstBattery >
    secondBattery
  ) {
    firstScore += 1;
  } else if (
    secondBattery >
    firstBattery
  ) {
    secondScore += 1;
  }

  const overallWinner =
    firstScore >
    secondScore
      ? first
      : secondScore >
          firstScore
      ? second
      : null;

  /* =========================================
     IMAGE PATH
  ========================================= */

  const getImageUrl =
    (image) => {
      if (!image) {
        return "";
      }

      if (
        image.startsWith(
          "http://"
        ) ||
        image.startsWith(
          "https://"
        )
      ) {
        return image;
      }

      return `${
        import.meta.env.BASE_URL
      }${String(
        image
      ).replace(
        /^\/+/,
        ""
      )}`;
    };

  /* =========================================
     AI RECOMMENDATION
  ========================================= */

  const getRecommendation =
    () => {
      /*
        Build AI-style explanation.
      */

      const firstWins = [];
      const secondWins = [];

      if (
        firstPrice <
        secondPrice
      ) {
        firstWins.push(
          "lower price"
        );
      } else if (
        secondPrice <
        firstPrice
      ) {
        secondWins.push(
          "lower price"
        );
      }

      if (
        firstRating >
        secondRating
      ) {
        firstWins.push(
          "higher rating"
        );
      } else if (
        secondRating >
        firstRating
      ) {
        secondWins.push(
          "higher rating"
        );
      }

      if (
        firstBattery >
        secondBattery
      ) {
        firstWins.push(
          "better battery score"
        );
      } else if (
        secondBattery >
        firstBattery
      ) {
        secondWins.push(
          "better battery score"
        );
      }

      /* =========================
         OVERALL WINNER
      ========================= */

      if (
        overallWinner
      ) {
        const winnerIsFirst =
          overallWinner.id ===
          first.id;

        const winnerWins =
          winnerIsFirst
            ? firstWins
            : secondWins;

        const otherProduct =
          winnerIsFirst
            ? second
            : first;

        const otherWins =
          winnerIsFirst
            ? secondWins
            : firstWins;

        return (
          <>
            <p>
              <strong>
                {
                  overallWinner.name
                }
              </strong>{" "}
              is the better overall
              choice because it performs
              better in{" "}
              <strong>
                {winnerWins.join(
                  " and "
                )}
              </strong>
              .
            </p>

            {cheaperProduct &&
              cheaperProduct.id !==
                overallWinner.id && (
                <p>
                  <strong>
                    {
                      cheaperProduct.name
                    }
                  </strong>{" "}
                  is the better budget
                  choice because it is{" "}
                  <strong>
                    ₹
                    {priceDifference.toLocaleString(
                      "en-IN"
                    )}{" "}
                    cheaper
                  </strong>
                  .
                </p>
              )}

            {otherWins.length >
              0 && (
              <p>
                <strong>
                  {
                    otherProduct.name
                  }
                </strong>{" "}
                still has an advantage
                in{" "}
                <strong>
                  {otherWins.join(
                    " and "
                  )}
                </strong>
                .
              </p>
            )}

            <div className="ai-final-recommendation">

              <strong>
                Recommendation:
              </strong>

              <p>
                Choose{" "}
                <strong>
                  {
                    overallWinner.name
                  }
                </strong>{" "}
                if you want the better
                overall balance of price,
                rating and battery.
              </p>

              {cheaperProduct &&
                cheaperProduct.id !==
                  overallWinner.id && (
                  <p>
                    Choose{" "}
                    <strong>
                      {
                        cheaperProduct.name
                      }
                    </strong>{" "}
                    if saving money is
                    your main priority.
                  </p>
                )}

            </div>
          </>
        );
      }

      /* =========================
         COMPLETE TIE
      ========================= */

      if (
        !overallWinner &&
        cheaperProduct
      ) {
        return (
          <>
            <p>
              Both products are closely
              matched overall.
            </p>

            <p>
              <strong>
                {
                  cheaperProduct.name
                }
              </strong>{" "}
              is the better budget
              option because it is ₹
              {priceDifference.toLocaleString(
                "en-IN"
              )}{" "}
              cheaper.
            </p>

            <p>
              Choose based on your
              preferred design, brand
              or other personal needs.
            </p>
          </>
        );
      }

      return (
        <>
          <p>
            Both products are very
            similar in price, rating
            and battery score.
          </p>

          <p>
            Either product can be a
            good choice depending on
            your personal preference.
          </p>
        </>
      );
    };

  /* =========================================
     PRODUCT CARD COMPONENT
  ========================================= */

  const ComparisonCard =
    ({
      product,
    }) => {
      return (
        <div className="compare-card">

          {/* IMAGE */}

          <img
            src={getImageUrl(
              product.image
            )}
            alt={
              product.name
            }
          />

          {/* NAME */}

          <h2>
            {
              product.name
            }
          </h2>

          {/* CATEGORY */}

          <p className="compare-category">
            {
              product.category
            }
          </p>

          {/* PRICE */}

          <div className="compare-price">
            ₹
            {Number(
              product.price
            ).toLocaleString(
              "en-IN"
            )}
          </div>

          {/* ORIGINAL PRICE */}

          {product.originalPrice &&
            Number(
              product.originalPrice
            ) >
              Number(
                product.price
              ) && (
              <p className="compare-original-price">
                Original Price:{" "}
                <span>
                  ₹
                  {Number(
                    product.originalPrice
                  ).toLocaleString(
                    "en-IN"
                  )}
                </span>
              </p>
            )}

          {/* RATING */}

          <div className="compare-row">

            <span>
              Rating
            </span>

            <strong>
              ⭐{" "}
              {
                product.rating ||
                "N/A"
              }
            </strong>

          </div>

          {/* BATTERY */}

          <div className="compare-row">

            <span>
              Battery Score
            </span>

            <strong>
              {product.batteryScore
                ? `${product.batteryScore}/10`
                : "N/A"}
            </strong>

          </div>

          {/* BRAND */}

          <div className="compare-row">

            <span>
              Brand
            </span>

            <strong>
              {
                product.brand ||
                "N/A"
              }
            </strong>

          </div>

          {/* BEST SELLER */}

          <div className="compare-row">

            <span>
              Best Seller
            </span>

            <strong>
              {product.bestSeller
                ? "Yes"
                : "No"}
            </strong>

          </div>

        </div>
      );
    };

  /* =========================================
     UI
  ========================================= */

  return (
    <section className="page-section">

      <div className="container">

        {/* PAGE HEADING */}

        <div className="page-heading">

          <h1>
            Compare Products
          </h1>

          <p>
            Compare price, rating,
            battery score and other
            features before you buy.
          </p>

        </div>

        {/* =========================
            PRODUCTS
        ========================== */}

        <div className="compare-grid">

          <ComparisonCard
            product={
              first
            }
          />

          <div className="compare-vs">
            VS
          </div>

          <ComparisonCard
            product={
              second
            }
          />

        </div>

        {/* =========================
            COMPARISON RESULT
        ========================== */}

        <div className="compare-summary">

          <h2>
            Comparison Result
          </h2>

          {/* PRICE */}

          <div className="comparison-result-row">

            <strong>
              💰 Best Price:
            </strong>

            <span>
              {cheaperProduct
                ? `${cheaperProduct.name} is cheaper by ₹${priceDifference.toLocaleString(
                    "en-IN"
                  )}.`
                : "Both products have the same price."}
            </span>

          </div>

          {/* RATING */}

          <div className="comparison-result-row">

            <strong>
              ⭐ Best Rating:
            </strong>

            <span>
              {betterRatingProduct
                ? `${betterRatingProduct.name} has the higher rating (${betterRatingProduct.rating}).`
                : "Both products have the same rating."}
            </span>

          </div>

          {/* BATTERY */}

          <div className="comparison-result-row">

            <strong>
              🔋 Best Battery:
            </strong>

            <span>
              {betterBatteryProduct
                ? `${betterBatteryProduct.name} has the better battery score (${betterBatteryProduct.batteryScore}/10).`
                : "Both products have the same battery score."}
            </span>

          </div>

          {/* OVERALL WINNER */}

          <div className="comparison-result-row overall-result">

            <strong>
              🏆 Overall:
            </strong>

            <span>
              {overallWinner
                ? `${overallWinner.name} wins ${Math.max(
                    firstScore,
                    secondScore
                  )} out of 3 comparison factors.`
                : "Both products are equally matched overall."}
            </span>

          </div>

        </div>

        {/* =========================
            AI SUGGESTION
        ========================== */}

        <div className="ai-recommendation">

          <h2>
            🤖 ShopSmart AI Suggestion
          </h2>

          <div className="ai-suggestion-text">
            {
              getRecommendation()
            }
          </div>

        </div>

        {/* =========================
            ACTIONS
        ========================== */}

        <div className="compare-actions">

          <Link
            to="/products"
            className="btn btn-outline"
          >
            ← Compare Other Products
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Compare;