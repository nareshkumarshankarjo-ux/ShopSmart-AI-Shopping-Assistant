import React, {
  useState,
} from "react";

const initialForm = {
  name: "",
  brand: "",
  category:
    "Laptop",
  price: "",
  originalPrice: "",
  rating: "4.0",

  description:
    "",

  image:
    "products/smartbook-air-14.jpg",

  batteryScore:
    "5",

  bestSeller:
    false,
};

function Admin({
  products = [],
  addProduct,
  deleteProduct,
}) {
  const [
    formData,
    setFormData,
  ] = useState(
    initialForm
  );

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    messageType,
    setMessageType,
  ] = useState("");

  /* =====================================
     CHANGE
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
          type ===
          "checkbox"
            ? checked
            : value,
      })
    );
  };

  /* =====================================
     ADD PRODUCT
  ===================================== */

  const handleSubmit =
    async (
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
    };

  /* =====================================
     DELETE
  ===================================== */

  const handleDelete =
    async (
      product
    ) => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${product.name}"?`
        );

      if (!confirmed) {
        return;
      }

      const success =
        await deleteProduct(
          product.id
        );

      if (!success) {
        alert(
          "Unable to delete product."
        );
      }
    };

  /* =====================================
     IMAGE
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
    }${String(
      image
    ).replace(/^\/+/, "")}`;
  };

  return (
    <section className="admin-page">
      <div className="container">
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
            <div className="form-group">
              <label>
                Product Name
              </label>

              <input
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

            <div className="form-group">
              <label>
                Brand
              </label>

              <input
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

            <div className="form-group">
              <label>
                Category
              </label>

              <select
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
              >
                <option>
                  Laptop
                </option>

                <option>
                  Mobile
                </option>

                <option>
                  Headphone
                </option>

                <option>
                  Watch
                </option>

                <option>
                  Tablet
                </option>

                <option>
                  Camera
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Selling Price
              </label>

              <input
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

            <div className="form-group">
              <label>
                Original Price
              </label>

              <input
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

            <div className="form-group">
              <label>
                Rating
              </label>

              <input
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

            <div className="form-group admin-description">
              <label>
                Description
              </label>

              <textarea
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

            <div className="form-group">
              <label>
                Image URL / Path
              </label>

              <input
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

            <div className="form-group">
              <label>
                Battery Score
              </label>

              <input
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

            <div className="admin-submit-row">
              <button
                type="submit"
                className="btn btn-primary"
              >
                + Add Product
              </button>
            </div>
          </form>
        </div>

        {/* EXISTING */}

        <div className="admin-card admin-products-card">
          <div className="admin-products-header">
            <h2>
              Existing Products
            </h2>

            <p>
              Total products:{" "}
              <strong>
                {
                  products.length
                }
              </strong>
            </p>
          </div>

          <div className="admin-product-grid">
            {products.map(
              (
                product
              ) => (
                <article
                  className="admin-product-card"
                  key={
                    product.id
                  }
                >
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

                    <p className="admin-product-brand">
                      Brand:{" "}
                      {
                        product.brand ||
                        "N/A"
                      }
                    </p>

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
        </div>
      </div>
    </section>
  );
}

export default Admin;