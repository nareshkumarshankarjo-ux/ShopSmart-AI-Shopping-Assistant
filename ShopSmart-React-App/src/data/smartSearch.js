export function smartSearch(products, query) {
  const searchText = query
    .trim()
    .toLowerCase();

  if (!searchText) {
    return {
      results: products,
      recommendedProduct: null,
      reason: "",
    };
  }

  let results = [...products];

  /* =========================
     CATEGORY DETECTION
  ========================= */

  const categoryMap = {
    laptop: "Laptop",
    laptops: "Laptop",

    mobile: "Mobile",
    mobiles: "Mobile",
    phone: "Mobile",
    phones: "Mobile",
    smartphone: "Mobile",
    smartphones: "Mobile",

    headphone: "Headphone",
    headphones: "Headphone",

    watch: "Watch",
    watches: "Watch",

    tablet: "Tablet",
    tablets: "Tablet",

    camera: "Camera",
    cameras: "Camera",
  };

  let detectedCategory = null;

  Object.entries(
    categoryMap
  ).forEach(
    ([keyword, category]) => {
      if (
        searchText.includes(
          keyword
        )
      ) {
        detectedCategory =
          category;
      }
    }
  );

  if (detectedCategory) {
    results =
      results.filter(
        (product) =>
          product.category
            ?.toLowerCase() ===
          detectedCategory.toLowerCase()
      );
  }

  /* =========================
     PRICE - UNDER
  ========================= */

  const underMatch =
    searchText.match(
      /(?:under|below|less than|within)\s*₹?\s*([\d,]+)/
    );

  let maximumPrice = null;

  if (underMatch) {
    maximumPrice =
      Number(
        underMatch[1].replace(
          /,/g,
          ""
        )
      );

    results =
      results.filter(
        (product) =>
          Number(
            product.price
          ) <= maximumPrice
      );
  }

  /* =========================
     PRICE - ABOVE
  ========================= */

  const aboveMatch =
    searchText.match(
      /(?:above|over|more than)\s*₹?\s*([\d,]+)/
    );

  let minimumPrice = null;

  if (aboveMatch) {
    minimumPrice =
      Number(
        aboveMatch[1].replace(
          /,/g,
          ""
        )
      );

    results =
      results.filter(
        (product) =>
          Number(
            product.price
          ) >= minimumPrice
      );
  }

  /* =========================
     PRICE - BETWEEN
  ========================= */

  const betweenMatch =
    searchText.match(
      /between\s*₹?\s*([\d,]+)\s*(?:and|to|-)\s*₹?\s*([\d,]+)/
    );

  if (betweenMatch) {
    const priceOne =
      Number(
        betweenMatch[1].replace(
          /,/g,
          ""
        )
      );

    const priceTwo =
      Number(
        betweenMatch[2].replace(
          /,/g,
          ""
        )
      );

    const min =
      Math.min(
        priceOne,
        priceTwo
      );

    const max =
      Math.max(
        priceOne,
        priceTwo
      );

    results =
      results.filter(
        (product) => {
          const price =
            Number(
              product.price
            );

          return (
            price >= min &&
            price <= max
          );
        }
      );
  }

  /* =========================
     TEXT SEARCH
  ========================= */

  const hasStructuredSearch =
    detectedCategory ||
    underMatch ||
    aboveMatch ||
    betweenMatch;

  if (!hasStructuredSearch) {
    const textMatches =
      products.filter(
        (product) => {
          const combined =
            [
              product.name,
              product.brand,
              product.category,
              product.description,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return combined.includes(
            searchText
          );
        }
      );

    if (
      textMatches.length >
      0
    ) {
      results =
        textMatches;
    }
  }

  /* =========================
     SCORE PRODUCTS
  ========================= */

  const wantsBudget =
    searchText.includes(
      "budget"
    ) ||
    searchText.includes(
      "cheap"
    ) ||
    searchText.includes(
      "cheapest"
    ) ||
    searchText.includes(
      "low price"
    );

  const wantsBattery =
    searchText.includes(
      "battery"
    ) ||
    searchText.includes(
      "best battery"
    );

  const wantsRating =
    searchText.includes(
      "rating"
    ) ||
    searchText.includes(
      "top rated"
    ) ||
    searchText.includes(
      "best rated"
    );

  const wantsBestSeller =
    searchText.includes(
      "best seller"
    ) ||
    searchText.includes(
      "bestseller"
    );

  const scored =
    results.map(
      (product) => {
        let score = 0;

        /* CATEGORY */

        if (
          detectedCategory &&
          product.category ===
            detectedCategory
        ) {
          score += 20;
        }

        /* BUDGET */

        if (wantsBudget) {
          score +=
            Math.max(
              0,
              20 -
                Number(
                  product.price
                ) /
                  5000
            );
        }

        /* BATTERY */

        if (wantsBattery) {
          score +=
            Number(
              product.batteryScore ||
                0
            ) * 4;
        }

        /* RATING */

        if (wantsRating) {
          score +=
            Number(
              product.rating ||
                0
            ) * 6;
        }

        /* BEST SELLER */

        if (
          wantsBestSeller &&
          product.bestSeller
        ) {
          score += 20;
        }

        /* GENERAL QUALITY */

        score +=
          Number(
            product.rating ||
              0
          ) * 2;

        score +=
          Number(
            product.batteryScore ||
              0
          );

        return {
          ...product,
          aiScore: score,
        };
      }
    );

  /* =========================
     SORTING
  ========================= */

  scored.sort(
    (a, b) =>
      b.aiScore -
      a.aiScore
  );

  /* =========================
     RECOMMENDATION
  ========================= */

  const recommendedProduct =
    scored.length > 0
      ? scored[0]
      : null;

  let reason = "";

  if (recommendedProduct) {
    const reasons = [];

    if (detectedCategory) {
      reasons.push(
        `matches the ${detectedCategory} category`
      );
    }

    if (
      maximumPrice !== null
    ) {
      reasons.push(
        `is within your ₹${maximumPrice.toLocaleString(
          "en-IN"
        )} budget`
      );
    }

    if (
      minimumPrice !== null
    ) {
      reasons.push(
        `matches your minimum budget requirement`
      );
    }

    if (wantsBattery) {
      reasons.push(
        `has a strong battery score of ${
          recommendedProduct.batteryScore ||
          "N/A"
        }`
      );
    }

    if (wantsRating) {
      reasons.push(
        `has a rating of ${
          recommendedProduct.rating ||
          "N/A"
        }`
      );
    }

    if (wantsBudget) {
      reasons.push(
        `offers good value for money`
      );
    }

    if (
      wantsBestSeller &&
      recommendedProduct.bestSeller
    ) {
      reasons.push(
        `is marked as a best seller`
      );
    }

    if (
      reasons.length === 0
    ) {
      reasons.push(
        `is the strongest match for your search`
      );
    }

    reason =
      `${recommendedProduct.name} is recommended because it ` +
      reasons.join(", ") +
      ".";
  }

  return {
    results: scored,
    recommendedProduct,
    reason,
  };
}