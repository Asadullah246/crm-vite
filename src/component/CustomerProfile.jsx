import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Stack, Paper } from "@mui/material";

import Button from '@mui/joy/Button';
import UpdateProfile from "./UpdateProfile";

export default function CustomerProfile() {
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

    </div>
  );
}
