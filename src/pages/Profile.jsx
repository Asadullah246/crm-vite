import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Stack, Paper } from "@mui/material";
import UpdateProfile from "../component/UpdateProfile";
import Button from '@mui/joy/Button';
export default function Profile() {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [state, setState] = React.useState(false);
  const [refresh, setRefresh]=useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({ ...userData }); // Form state

  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("user")); 
    setUser(getUser);
  }, [refresh]);

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

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(inOpen);
  };


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

  console.log("user in " , user);

  return (
    <div className="pageLayout">

      <div className="heroSectionprofile">

        <div>
          <img src="https://ui-avatars.com/api/?name=asad&background=0D8ABC&color=fff" alt="" />

        </div>

        <div className="infoDivProfile">
          <p> <span className="dataTitle">Name :</span> <span> {user?.name}</span></p>
          <p> <span className="dataTitle">Email :</span> <span> {user?.email}</span></p>
          <p> <span className="dataTitle">Phone :</span> <span> {user?.phone}</span></p>
          <p> <span className="dataTitle">Address :</span> <span> {user?.streetAddress || user?.address}</span></p>
          <p> <span className="dataTitle">Postal Code :</span> <span> {user?.postalCode}</span></p>
          <p> <span className="dataTitle">City :</span> <span> {user?.city}</span></p>
          <Button size="md" variant={"solid"}  color="primary" onClick={toggleDrawer(true)}>
          Update Profile
        </Button>
        </div>
      </div>


      <UpdateProfile state={state} user={user} setState={setState} refresh={refresh} setRefresh={setRefresh} toggleDrawer={toggleDrawer} />

{/* <Paper
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

        <TextField
          label="Name"
          name="name"
          value={isEditing ? formData.name : userData.name}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

        <TextField
          label="Email"
          name="email"
          value={isEditing ? formData.email : userData.email}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={isEditing ? formData.password : userData.password}
          onChange={handleInputChange}
          disabled={!isEditing}
          variant="outlined"
        />

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
    </Paper> */}
    </div>
  );
}
