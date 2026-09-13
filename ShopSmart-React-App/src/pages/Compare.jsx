import React from "react";

import {
  useNavigate,
} from "react-router-dom";

function Compare({
  compareItems = [],
}) {
  const navigate =
    useNavigate();

  const getImageUrl = (
    image
  ) => {
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
    ).replace(/^\/+/, "")}`;
  };

  /* =====================================
     REQUIRE EXACTLY TWO PRODUCTS
  ===================================== */

  if (
    compareItems.length !==
    2
  ) {
    return (
      <section className="page-container">
        <div className="container">
          <div className="empty-state">
            <h1>
              ⚖️
            </h1>

            <h2>
              Select 2 products
              to compare
            </h2>

            <p>
              Go to the Products
              page and choose exactly
              two products.
            </p>

            <button
              type="button"
              className="checkout-btn"
              onClick={() =>
                navigate(
                  "/products"
                )
              }
            >
              Go to Products
            </button>
          </div>
        </div>
      </section>
    );
  }

  const [
    firstProduct,
    secondProduct,
  ] = compareItems;

  const firstPrice =
    Number(
      firstProduct.price ||
        0
    );

  const secondPrice =
    Number(
      secondProduct.price ||
        0
    );

  const firstRating =
    Number(
      firstProduct.rating ||
        0
    );

  const secondRating =
    Number(
      secondProduct.rating ||
        0
    );

  const firstBattery =
    Number(
      firstProduct.batteryScore ||
        0
    );

  const secondBattery =
    Number(
      secondProduct.batteryScore ||
        0
    );

  /* =====================================
     BEST PRICE
  ===================================== */

  let priceResult = "";

  if (
    firstPrice <
    secondPrice
  ) {
    priceResult = `${
      firstProduct.name
    } is cheaper by ₹${(
      secondPrice -
      firstPrice
    ).toLocaleString(
      "en-IN"
    )}.`;
  } else if (
    secondPrice <
    firstPrice
  ) {
    priceResult = `${
      secondProduct.name
    } is cheaper by ₹${(
      firstPrice -
      secondPrice
    ).toLocaleString(
      "en-IN"
    )}.`;
  } else {
    priceResult =
      "Both products have the same price.";
  }

  /* =====================================
     BEST RATING
  ===================================== */

  let ratingResult = "";

  if (
    firstRating >
    secondRating
  ) {
    ratingResult = `${firstProduct.name} has the higher rating.`;
  } else if (
    secondRating >
    firstRating
  ) {
    ratingResult = `${secondProduct.name} has the higher rating.`;
  } else {
    ratingResult =
      "Both products have the same rating.";
  }

  /* =====================================
     BEST BATTERY
  ===================================== */

  let batteryResult = "";

  if (
    firstBattery >
    secondBattery
  ) {
    batteryResult = `${firstProduct.name} has the better battery score.`;
  } else if (
    secondBattery >
    firstBattery
  ) {
    batteryResult = `${secondProduct.name} has the better battery score.`;
  } else {
    batteryResult =
      "Both products have the same battery score.";
  }

  /* =====================================
     AI SCORE
  ===================================== */

  const getScore = (
    product
  ) => {
    let score = 0;

    score +=
      Number(
        product.rating ||
          0
      ) * 10;

    score +=
      Number(
        product.batteryScore ||
          0
      ) * 4;

    if (
      product.bestSeller
    ) {
      score += 5;
    }

    /*
      Small bonus for
      lower price.
    */

    score +=
      100000 /
      Math.max(
        Number(
          product.price ||
            1
        ),
        1
      );

    return score;
  };

  const firstScore =
    getScore(
      firstProduct
    );

  const secondScore =
    getScore(
      secondProduct
    );

  const recommended =
    firstScore >=
    secondScore
      ? firstProduct
      : secondProduct;

  const otherProduct =
    recommended ===
    firstProduct
      ? secondProduct
      : firstProduct;

  const savings =
    Math.abs(
      Number(
        firstProduct.price
      ) -
        Number(
          secondProduct.price
        )
    );

  return (
    <section className="page-container compare-page">
      <div className="container">
        <div className="page-heading">
          <h1>
            Compare Products
          </h1>

          <p>
            Compare price,
            rating, battery score
            and other features
            before you buy.
          </p>
        </div>

        <div className="compare-grid">
          {/* PRODUCT 1 */}

          <article className="compare-card">
            <img
              src={getImageUrl(
                firstProduct.image
              )}
              alt={
                firstProduct.name
              }
            />

            <h2>
              {
                firstProduct.name
              }
            </h2>

            <span className="compare-category">
              {
                firstProduct.category
              }
            </span>

            <h3 className="compare-price">
              ₹
              {firstPrice.toLocaleString(
                "en-IN"
              )}
            </h3>

            {firstProduct.originalPrice && (
              <p className="compare-original-price">
                Original Price: ₹
                {Number(
                  firstProduct.originalPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}

            <div className="compare-detail-row">
              <span>
                Rating
              </span>

              <strong>
                ⭐{" "}
                {
                  firstProduct.rating
                }
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Battery Score
              </span>

              <strong>
                {
                  firstProduct.batteryScore ||
                  "N/A"
                }
                {firstProduct.batteryScore
                  ? "/10"
                  : ""}
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Brand
              </span>

              <strong>
                {
                  firstProduct.brand ||
                  "N/A"
                }
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Best Seller
              </span>

              <strong>
                {firstProduct.bestSeller
                  ? "Yes"
                  : "No"}
              </strong>
            </div>
          </article>

          {/* VS */}

          <div className="compare-vs">
            VS
          </div>

          {/* PRODUCT 2 */}

          <article className="compare-card">
            <img
              src={getImageUrl(
                secondProduct.image
              )}
              alt={
                secondProduct.name
              }
            />

            <h2>
              {
                secondProduct.name
              }
            </h2>

            <span className="compare-category">
              {
                secondProduct.category
              }
            </span>

            <h3 className="compare-price">
              ₹
              {secondPrice.toLocaleString(
                "en-IN"
              )}
            </h3>

            {secondProduct.originalPrice && (
              <p className="compare-original-price">
                Original Price: ₹
                {Number(
                  secondProduct.originalPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}

            <div className="compare-detail-row">
              <span>
                Rating
              </span>

              <strong>
                ⭐{" "}
                {
                  secondProduct.rating
                }
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Battery Score
              </span>

              <strong>
                {
                  secondProduct.batteryScore ||
                  "N/A"
                }
                {secondProduct.batteryScore
                  ? "/10"
                  : ""}
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Brand
              </span>

              <strong>
                {
                  secondProduct.brand ||
                  "N/A"
                }
              </strong>
            </div>

            <div className="compare-detail-row">
              <span>
                Best Seller
              </span>

              <strong>
                {secondProduct.bestSeller
                  ? "Yes"
                  : "No"}
              </strong>
            </div>
          </article>
        </div>

        {/* COMPARISON RESULT */}

        <div className="comparison-result">
          <h2>
            Comparison Result
          </h2>

          <p>
            💰{" "}
            <strong>
              Best Price:
            </strong>{" "}
            {priceResult}
          </p>

          <p>
            ⭐{" "}
            <strong>
              Best Rating:
            </strong>{" "}
            {ratingResult}
          </p>

          <p>
            🔋{" "}
            <strong>
              Best Battery:
            </strong>{" "}
            {batteryResult}
          </p>

          <p>
            🏆{" "}
            <strong>
              Overall:
            </strong>{" "}
            {
              recommended.name
            }{" "}
            is the stronger
            overall choice.
          </p>
        </div>

        {/* AI SUGGESTION */}

        <div className="ai-suggestion-box">
          <h2>
            🤖 ShopSmart AI
            Suggestion
          </h2>

          <p>
            <strong>
              {
                recommended.name
              }
            </strong>{" "}
            is the better overall
            choice based on its
            combination of price,
            rating and battery
            score.
          </p>

          {recommended.rating >
            otherProduct.rating && (
            <p>
              {
                recommended.name
              }{" "}
              has the stronger
              customer rating.
            </p>
          )}

          {recommended.batteryScore >
            otherProduct.batteryScore && (
            <p>
              {
                recommended.name
              }{" "}
              also has the better
              battery score.
            </p>
          )}

          {Number(
            otherProduct.price
          ) <
            Number(
              recommended.price
            ) && (
            <p>
              However,{" "}
              {
                otherProduct.name
              }{" "}
              is cheaper by ₹
              {savings.toLocaleString(
                "en-IN"
              )}
              .
            </p>
          )}

          <p>
            <strong>
              Recommendation:
            </strong>
          </p>

          <p>
            Choose{" "}
            <strong>
              {
                recommended.name
              }
            </strong>{" "}
            if overall performance
            and value are your
            priority.
          </p>

          {Number(
            otherProduct.price
          ) <
            Number(
              recommended.price
            ) && (
            <p>
              Choose{" "}
              <strong>
                {
                  otherProduct.name
                }
              </strong>{" "}
              if saving money is
              your main priority.
            </p>
          )}
        </div>

        <div className="compare-back-row">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              navigate(
                "/products"
              )
            }
          >
            ← Compare Other
            Products
          </button>
        </div>
      </div>
    </section>
  );
}

export default Compare;