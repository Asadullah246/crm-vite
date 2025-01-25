import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Button, Stack, Grid } from "@mui/material";
import { Input, FormControl, FormLabel, RadioGroup, Radio } from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { createData } from "../others/common";

export default function AuthForm() {
  const [tabIndex, setTabIndex] = useState(0); // Login/Sign Up Tabs
  const [signupStep, setSignupStep] = useState(1); // Two-step Signup Control
  const [role, setRole] = useState("");

  // Handle checkbox selection
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole); // Only one role can be selected
  };

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Handle form submission

  const onSubmit = async (data) => {
    try {
      const result = await createData(data, "customer"); // Wait for the promise to resolve
      console.log("Customer created successfully", result);
      if (result.status == "success") {
        setTabIndex(0); // Switch to login tab after successful signup
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };
  const handleLogin = async (data) => {
    console.log("logging", data);
    try {
      const result = await createData(data, "auth/signIn"); // Wait for the promise to resolve
      console.log("Customer created successfully", result);
      if (result.status == "success") {
        setTabIndex(0); // Switch to login tab after successful signup
      }
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "30%" },
        margin: "auto",
        mt: 8,
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 4,
        boxShadow: 3,
        height: "fit-content",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Welcome Back
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => {
          setTabIndex(newValue);
          setSignupStep(1); // Reset to step 1 on tab switch
          reset(); // Clear form data
        }}
        centered
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {/* Login Form */}
      {tabIndex === 0 && (
        <Box
          component="form"
          style={{ width: "100%", height: "fit-content" }}
          onSubmit={handleSubmit(handleLogin)}
          mt={2}
          mb={2}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => <Input {...field} type="email" />}
              />
              {errors.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field }) => <Input {...field} type="password" />}
              />
              {errors.password && (
                <Typography color="error">{errors.password.message}</Typography>
              )}
            </FormControl>




            <FormControl error={!!errors.role}>
        <FormLabel>Your role?</FormLabel>
        <Controller
          name="role"
          control={control}
          rules={{ required: "Please select your role" }}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Radio value="customer" label="Customer" />
              <Radio value="admin" label="Admin" />
            </RadioGroup>
          )}
        />
        {errors.role && (
          <Typography color="danger" fontSize="sm" sx={{color:"#EA3120"}} >
            {errors.role.message}
          </Typography>
        )}
      </FormControl> 


            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "40px" }}
            >
              Login
            </Button>
          </Stack>
        </Box>
      )}

      {/* Signup Form */}
      {tabIndex === 1 && (
        <Box
          component="form"
          style={{ width: "100%", height: "fit-content" }}
          onSubmit={handleSubmit(onSubmit)}
          mt={2}
          mb={2}
        >
          {signupStep === 1 && (
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => <Input {...field} type="email" />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required" }}
                  render={({ field }) => <Input {...field} type="password" />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }}
                  render={({ field }) => <Input {...field} type="password" />}
                />
              </FormControl>

              <Button variant="contained" onClick={() => setSignupStep(2)}>
                Next
              </Button>
            </Stack>
          )}

          {signupStep === 2 && (
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone is required" }}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Postal Code</FormLabel>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setSignupStep(1)}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
