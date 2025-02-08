import React from "react";
import { Navigate, Outlet,  } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("jwtToken"); // Get the stored JWT token

  return token ? <Outlet /> : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;
