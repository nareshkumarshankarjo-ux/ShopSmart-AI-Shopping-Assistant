import React from "react";
import { useState } from "react";

const initialForm = {
  name: "",
  brand: "",
  category: "Laptop",
  price: "",
  originalPrice: "",
  rating: "4.0",
  description: "",
  image:
    "https://placehold.co/500x350?text=ShopSmart+Product",
  batteryScore: 5,
  bestSeller: false,
};

function Admin({
  products,
  addProduct,
  deleteProduct,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  const [message, setMessage] =
    useState("");

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData({
      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.price
    ) {
      setMessage(
        "Product name and price are required."
      );

      return;
    }

    const product = {
      ...formData,

      price: Number(
        formData.price
      ),

      originalPrice: Number(
        formData.originalPrice ||
          formData.price
      ),

      rating: Number(
        formData.rating
      ),

      batteryScore: Number(
        formData.batteryScore
      ),
    };

    const success =
      await addProduct(product);

    if (success) {
      setMessage(
        "Product added successfully."
      );

      setFormData(initialForm);
    }
  };

  return (
    <section className="page-container">
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

        <div className="admin-layout">
          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >
            <h2>
              Add Product
            </h2>

            {message && (
              <p className="form-message">
                {message}
              </p>
            )}

            <label>
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: SmartBook Pro"
            />

            <label>Brand</label>

            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
            />

            <label>Category</label>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={handleChange}
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

            <label>
              Selling Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <label>
              Original Price
            </label>

            <input
              type="number"
              name="originalPrice"
              value={
                formData.originalPrice
              }
              onChange={handleChange}
            />

            <label>Rating</label>

            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              value={
                formData.rating
              }
              onChange={handleChange}
            />

            <label>
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              rows="4"
            />

            <label>
              Image URL
            </label>

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
            />

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
              onChange={handleChange}
            />

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="bestSeller"
                checked={
                  formData.bestSeller
                }
                onChange={handleChange}
              />

              Best Seller
            </label>

            <button
              className="primary-btn full-width"
              type="submit"
            >
              Add Product
            </button>
          </form>

          <div className="admin-products">
            <h2>
              Existing Products
            </h2>

            {products.map(
              (product) => (
                <div
                  className="admin-product"
                  key={product.id}
                >
                  <div>
                    <strong>
                      {product.name}
                    </strong>

                    <p>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProduct(
                        product.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;