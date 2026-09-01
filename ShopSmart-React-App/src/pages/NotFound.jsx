import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page-container">
      <div className="empty-state">
        <h1>404</h1>

        <h2>
          Page Not Found
        </h2>

        <Link
          to="/"
          className="primary-btn"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;