import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { wishlist, addToCart, removeFromWishlist, storageError } = useCart();
  const [message, setMessage] = useState("");

  const handleAdd = (product) => {
    if (addToCart(product)) {
      setMessage(`${product.name} added to your cart.`);
    } else {
      setMessage("Unable to add this item. Please log in and try again.");
    }
  };

  const imageUrl = (image) => /^https?:\/\//i.test(image || "")
    ? image
    : `${import.meta.env.BASE_URL}${String(image || "").replace(/^\/+/, "")}`;

  return (
    <section className="page-container products-page">
      <div className="container">
        <div className="page-heading">
          <h1>My Wishlist</h1>
          <p>Save your favourite products and shop whenever you are ready.</p>
        </div>
        {storageError && <p role="alert">{storageError}</p>}
        {message && <p role="status" style={{ marginBottom: 16 }}>{message}</p>}
        <p className="product-result-count">{wishlist.length} {wishlist.length === 1 ? "product" : "products"} saved</p>
        {wishlist.length === 0 ? (
          <div className="empty-state">
            <h1 aria-hidden="true">♡</h1>
            <h2>Your wishlist is empty</h2>
            <p>Save products you like from the Products page.</p>
            <Link to="/products" className="btn btn-primary">Browse Products</Link>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {wishlist.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img className="product-image" src={imageUrl(product.image)} alt={product.name} loading="lazy" />
                  </div>
                  <div className="product-body">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating-row"><span className="rating">⭐ {product.rating}</span></div>
                    <div className="product-meta">
                      <span className="price">₹{Number(product.price || 0).toLocaleString("en-IN")}</span>
                      {Number(product.originalPrice) > Number(product.price) && (
                        <span className="original-price">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
                      )}
                    </div>
                    <div className="product-actions">
                      <Link className="compare-btn" to={`/products/${product.id}`} style={{ textAlign: "center" }}>View Details</Link>
                      <button type="button" className="product-cart-btn" onClick={() => handleAdd(product)}>🛒 Add to Cart</button>
                      <button type="button" className="compare-btn" onClick={() => { removeFromWishlist(product.id); setMessage(`${product.name} removed from your wishlist.`); }}>♡ Remove from Wishlist</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <Link to="/products" className="btn btn-outline">Continue Shopping</Link>
              <Link to="/cart" className="btn btn-primary">View Cart</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Wishlist;