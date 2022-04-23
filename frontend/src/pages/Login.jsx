import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

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
    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
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
        Login
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
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
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="password"
          value={password}
          onChange={onChange}
        />

        <FormHelperText error={true}>{helperText}</FormHelperText>

        <LoadingButton
          sx={{ width: "100%", marginTop: "16px" }}
          onClick={handleSubmit}
          loading={isLoading}
          size="large"
          variant="contained"
          fullWidth={true}
          color="primary"
        >
          Login
        </LoadingButton>

        <Button
          sx={{ width: "100%", marginTop: "16px" }}
          size="large"
          variant="outlined"
          fullWidth={true}
          color="primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
