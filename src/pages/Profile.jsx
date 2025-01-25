import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Stack, Paper } from "@mui/material";

export default function Profile() { 
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({ ...userData }); // Form state

  // Mock fetch user data (Simulating an API call)
  useEffect(() => {
    // Replace with real API fetch
    const mockUserData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "********",
    };
    setUserData(mockUserData);
    setFormData(mockUserData);
  }, []);

  // Handle input changes in form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save updated user data
  const handleSave = () => {
    // Replace with API call to update user data
    console.log("Updated User Data:", formData);
    setUserData(formData); // Update state with new data
    setIsEditing(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: { xs: "90%", md: "60%" },
        margin: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        User Profile
      </Typography>

      <Stack spacing={2} mt={2}>
        {/* Name */}
        <TextField
          label="Name"
          name="name"
          value={isEditing ? formData.name : userData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

        {/* Email */}
        <TextField
          label="Email"
          name="email"
          value={isEditing ? formData.email : userData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={isEditing ? formData.password : userData.password}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

        {/* Buttons */}
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFormData(userData);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
