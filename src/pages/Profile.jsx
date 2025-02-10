import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Stack, Paper } from "@mui/material";
import UpdateProfile from "../component/UpdateProfile";
import Button from "@mui/joy/Button";
import AdminProfile from "../component/AdminProfile";
import CustomerProfile from "../component/CustomerProfile";
export default function Profile() {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, []);

  return (
    <div className="pageLayout">
      {user?.role == "admin" ? <AdminProfile /> : <CustomerProfile />}
    </div>
  );
}
