import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { Link, useNavigate } from "react-router";
import AuthCardLayout from "../../components/layout/AuthCardLayout";
import api from "../../config/axios";
import { showToast } from "../../app/features/toast/toastSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const validateInputs = () => {
    const { name, password, email } = form;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateInputs();
    if (!isFormValid) {
      return;
    }

    try {
      const response = await api.post("auth/register", form);

      if (response.data.success) {
        dispatch(
          showToast({
            message: "Registration successful!",
            severity: "success",
          })
        );

        navigate("/login");
      }
    } catch (error) {
      dispatch(showToast({ message, severity: "error" }));
    }
  };

  return (
    <AuthCardLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="name">Full name</FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            required
            fullWidth
            id="name"
            placeholder="Jon Snow"
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? "error" : "primary"}
            value={form.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            error={emailError}
            helperText={emailErrorMessage}
            color={passwordError ? "error" : "primary"}
            value={form.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            color={passwordError ? "error" : "primary"}
            value={form.password}
            onChange={handleChange}
          />
        </FormControl>

        <Button type="submit" fullWidth variant="contained">
          Sign up
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            variant="body2"
            color="textPrimary"
            sx={{ alignSelf: "center" }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </AuthCardLayout>
  );
};

export default Register;
