import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    password2: "",
  });
  const { name, username, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (isError) {
      setHelperText(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (password !== password2) {
      setHelperText("Passwords do not match");
    } else {
      const userData = {
        name,
        username,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Register
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={onChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Confirm Password"
          type="password"
          id="password2"
          autoComplete="current-password"
          value={password2}
          onChange={onChange}
        />

        <FormHelperText error={true}>{helperText}</FormHelperText>

        <LoadingButton
          sx={{ marginTop: "16px" }}
          onClick={handleSubmit}
          loading={isLoading}
          size="large"
          variant="contained"
          fullWidth={true}
          color="primary"
        >
          Register
        </LoadingButton>
        <Button
          sx={{ marginTop: "16px" }}
          size="large"
          variant="outlined"
          fullWidth={true}
          color="primary"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
