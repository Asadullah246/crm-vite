import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("jwtToken");  // Check if user is logged in
  const role = localStorage.getItem("userRole");  // Get user role

  return token && role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
