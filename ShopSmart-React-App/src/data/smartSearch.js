export function smartProductSearch(
  products,
  query
) {
  if (!query.trim()) {
    return products;
  }

  const text = query.toLowerCase();

  let results = [...products];

  const categories = [
    "laptop",
    "mobile",
    "headphone",
    "watch",
    "camera",
    "tablet",
  ];

  const matchedCategory =
    categories.find((category) =>
      text.includes(category)
    );

  if (matchedCategory) {
    results = results.filter((product) =>
      product.category
        .toLowerCase()
        .includes(matchedCategory)
    );
  }

  const priceMatch = text.match(
    /under\s*₹?\s*([\d,]+)/
  );

  if (priceMatch) {
    const maxPrice = Number(
      priceMatch[1].replace(/,/g, "")
    );

    results = results.filter(
      (product) =>
        Number(product.price) <=
        maxPrice
    );
  }

  if (
    text.includes("best") ||
    text.includes("top")
  ) {
    results.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (text.includes("budget")) {
    results.sort(
      (a, b) => a.price - b.price
    );
  }

  if (text.includes("battery")) {
    results.sort(
      (a, b) =>
        (b.batteryScore || 0) -
        (a.batteryScore || 0)
    );
  }

  const normalSearch =
    products.filter((product) => {
      const searchData = `
        ${product.name}
        ${product.category}
        ${product.description}
        ${product.brand}
      `.toLowerCase();

      return searchData.includes(text);
    });

  if (
    !matchedCategory &&
    !priceMatch &&
    !text.includes("best") &&
    !text.includes("budget") &&
    !text.includes("battery")
  ) {
    return normalSearch;
  }

  return results;
}