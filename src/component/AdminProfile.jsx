import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Stack, Paper } from "@mui/material";
import Button from "@mui/joy/Button";

import { useNavigate } from "react-router-dom";
import { updateData } from "../others/common";
import { toastError } from "./Alert";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(true); // Toggle edit mode
  const navigate=useNavigate();

  const [refresh, setRefresh] = useState(false);
  const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user"));
    setUser(getUser);
  }, [refresh]);

  React.useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
    });
  }, [refresh, user]);

  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



    const handleAlert = () => {
      alert("Successfully profile updated. Please log in again."); // Shows an alert with an "OK" button
      navigate("/signup"); // Redirects to login page after clicking "OK"
    };


    const handleSave = async(e) => {
      e?.prevent?.default();
     setLoading(true)


        try {
            const result = await updateData(formData, `admin/${user?._id}`); // Wait for the promise to resolve
            if (result.status == "success") {
                setLoading(false)
              localStorage.removeItem("user");
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("userRole");
              localStorage.removeItem("role");
              handleAlert();

            }
          } catch (error) {
            setLoading(false)
            console.error("Error creating data:", error);
            toastError("something went wrong");
          }

    };




  return (
    <div className="pageLayout">
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", md: "60%" },
          marginRight: "auto",
          mt: 6,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Update Profile
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Name"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            variant="outlined"
          />

          <Box display="flex" justifyContent="center" gap={2} mt={2}>
            <Button  loading={loading}
                  type="submit" style={{ marginTop: "20px" }}
                   onClick={handleSave}>
              Submit
            </Button>


          </Box>
        </Stack>
      </Paper>
    </div>
  );
}
