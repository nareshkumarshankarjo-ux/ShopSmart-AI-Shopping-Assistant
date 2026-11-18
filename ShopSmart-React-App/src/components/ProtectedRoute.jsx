import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn = false, children }) {
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children ?? <Outlet />;
}

export default ProtectedRoute;