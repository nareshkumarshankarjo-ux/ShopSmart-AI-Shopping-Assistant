import React, {
  useState,
} from "react";

const initialForm = {
  name: "",
  brand: "",
  category: "Laptop",
  price: "",
  originalPrice: "",
  rating: "4.0",
  description: "",
  image:
    "products/smartbook-air-14.jpg",
  batteryScore: "5",
  bestSeller: false,
};

function Admin({
  products = [],
  addProduct,
  deleteProduct,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [message, setMessage] =
    useState("");

  const [
    messageType,
    setMessageType,
  ] = useState("");

  /* =====================================
     HANDLE INPUT
  ===================================== */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );
  };

  /* =====================================
     ADD PRODUCT
  ===================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (
      !formData.name.trim() ||
      !formData.price
    ) {
      setMessage(
        "Product name and selling price are required."
      );

      setMessageType(
        "error"
      );

      return;
    }

    const product = {
      name:
        formData.name.trim(),

      brand:
        formData.brand.trim(),

      category:
        formData.category,

      price:
        Number(
          formData.price
        ),

      originalPrice:
        Number(
          formData.originalPrice ||
            formData.price
        ),

      rating:
        Number(
          formData.rating
        ),

      description:
        formData.description.trim(),

      image:
        formData.image.trim(),

      batteryScore:
        Number(
          formData.batteryScore
        ),

      bestSeller:
        formData.bestSeller,
    };

    try {
      const success =
        await addProduct(
          product
        );

      if (success) {
        setMessage(
          "Product added successfully."
        );

        setMessageType(
          "success"
        );

        setFormData(
          initialForm
        );
      } else {
        setMessage(
          "Unable to add product. Please check JSON Server."
        );

        setMessageType(
          "error"
        );
      }
    } catch (error) {
      console.error(
        error
      );

      setMessage(
        "Unable to add product. Please check JSON Server."
      );

      setMessageType(
        "error"
      );
    }
  };

  /* =====================================
     DELETE PRODUCT
  ===================================== */

  const handleDelete = async (
    product
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${product.name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(
        product.id
      );
    } catch (error) {
      console.error(
        error
      );

      alert(
        "Unable to delete product."
      );
    }
  };

  /* =====================================
     IMAGE URL
  ===================================== */

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
    }${String(image).replace(
      /^\/+/,
      ""
    )}`;
  };

  return (
    <section className="admin-page">
      <div className="container">
        {/* PAGE HEADING */}

        <div className="page-heading">
          <h1>
            Product Management
          </h1>

          <p>
            Add and remove products
            using JSON Server CRUD.
          </p>
        </div>

        {/* ADD PRODUCT */}

        <div className="admin-card">
          <div className="admin-card-heading">
            <h2>
              Add Product
            </h2>

            <p>
              Enter the product
              details below.
            </p>
          </div>

          {message && (
            <div
              className={`form-message ${messageType}`}
            >
              {message}
            </div>
          )}

          <form
            className="admin-form-grid"
            onSubmit={
              handleSubmit
            }
          >
            {/* PRODUCT NAME */}

            <div className="form-group">
              <label
                htmlFor="name"
              >
                Product Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Example: SmartBook Pro"
                required
              />
            </div>

            {/* BRAND */}

            <div className="form-group">
              <label
                htmlFor="brand"
              >
                Brand
              </label>

              <input
                id="brand"
                type="text"
                name="brand"
                value={
                  formData.brand
                }
                onChange={
                  handleChange
                }
                placeholder="Example: ShopSmart"
              />
            </div>

            {/* CATEGORY */}

            <div className="form-group">
              <label
                htmlFor="category"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
              >
                <option value="Laptop">
                  Laptop
                </option>

                <option value="Mobile">
                  Mobile
                </option>

                <option value="Headphone">
                  Headphone
                </option>

                <option value="Watch">
                  Watch
                </option>

                <option value="Tablet">
                  Tablet
                </option>

                <option value="Camera">
                  Camera
                </option>
              </select>
            </div>

            {/* SELLING PRICE */}

            <div className="form-group">
              <label
                htmlFor="price"
              >
                Selling Price
              </label>

              <input
                id="price"
                type="number"
                name="price"
                value={
                  formData.price
                }
                onChange={
                  handleChange
                }
                placeholder="38999"
                min="0"
                required
              />
            </div>

            {/* ORIGINAL PRICE */}

            <div className="form-group">
              <label
                htmlFor="originalPrice"
              >
                Original Price
              </label>

              <input
                id="originalPrice"
                type="number"
                name="originalPrice"
                value={
                  formData.originalPrice
                }
                onChange={
                  handleChange
                }
                placeholder="42999"
                min="0"
              />
            </div>

            {/* RATING */}

            <div className="form-group">
              <label
                htmlFor="rating"
              >
                Rating
              </label>

              <input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={
                  formData.rating
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {/* DESCRIPTION */}

            <div className="form-group admin-description">
              <label
                htmlFor="description"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                rows="5"
                placeholder="Enter product description"
              />
            </div>

            {/* IMAGE */}

            <div className="form-group">
              <label
                htmlFor="image"
              >
                Image URL / Path
              </label>

              <input
                id="image"
                type="text"
                name="image"
                value={
                  formData.image
                }
                onChange={
                  handleChange
                }
                placeholder="products/example.jpg"
              />
            </div>

            {/* BATTERY SCORE */}

            <div className="form-group">
              <label
                htmlFor="batteryScore"
              >
                Battery Score
              </label>

              <input
                id="batteryScore"
                type="number"
                min="1"
                max="10"
                name="batteryScore"
                value={
                  formData.batteryScore
                }
                onChange={
                  handleChange
                }
              />
            </div>

            {/* BEST SELLER */}

            <div className="admin-checkbox-row">
              <label>
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={
                    formData.bestSeller
                  }
                  onChange={
                    handleChange
                  }
                />

                <span>
                  Best Seller
                </span>
              </label>
            </div>

            {/* ADD BUTTON */}

            <div className="admin-submit-row">
              <button
                className="btn btn-primary"
                type="submit"
              >
                + Add Product
              </button>
            </div>
          </form>
        </div>

        {/* EXISTING PRODUCTS */}

        <div className="admin-card admin-products-card">
          <div className="admin-products-header">
            <div>
              <h2>
                Existing Products
              </h2>

              <p>
                Total products:{" "}
                <strong>
                  {products.length}
                </strong>
              </p>
            </div>
          </div>

          {products.length ===
          0 ? (
            <div className="admin-empty">
              <p>
                No products found.
              </p>
            </div>
          ) : (
            <div className="admin-product-grid">
              {products.map(
                (product) => (
                  <article
                    className="admin-product-card"
                    key={
                      product.id
                    }
                  >
                    {/* IMAGE */}

                    <div className="admin-product-image-wrap">
                      <img
                        src={getImageUrl(
                          product.image
                        )}
                        alt={
                          product.name
                        }
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="admin-product-info">
                      <span className="admin-product-category">
                        {
                          product.category
                        }
                      </span>

                      <h3>
                        {
                          product.name
                        }
                      </h3>

                      {product.brand && (
                        <p className="admin-product-brand">
                          Brand:{" "}
                          {
                            product.brand
                          }
                        </p>
                      )}

                      <div className="admin-product-meta">
                        <strong className="admin-product-price">
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <span className="admin-product-rating">
                          ⭐{" "}
                          {
                            product.rating
                          }
                        </span>
                      </div>
                    </div>

                    {/* DELETE */}

                    <button
                      type="button"
                      className="admin-delete-btn"
                      onClick={() =>
                        handleDelete(
                          product
                        )
                      }
                    >
                      Delete
                    </button>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;