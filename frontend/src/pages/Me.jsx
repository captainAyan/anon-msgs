import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { edit, deleteAccount, reset } from "../features/auth/authSlice";

import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  Button,
  Modal,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Me() {
  const [helperText, setHelperText] = useState("");
  const [errorHelperText, setErrorHelperText] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      setErrorHelperText(true);
      setHelperText(message);
    }

    if (isSuccess) {
      setErrorHelperText(false);
      setHelperText("Saved");
    }

    if (!user) {
      navigate("/login");
    }

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    username: user ? user.username : "",
  });
  const { name, username } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userData = {
      name,
      username,
    };

    dispatch(edit(userData));
  };

  const handleDelete = async () => {
    dispatch(deleteAccount());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 4,
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Edit Profile
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            label="Name"
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
            name="username"
            label="Username"
            autoComplete="username"
            value={username}
            onChange={onChange}
          />

          <FormHelperText error={errorHelperText}>{helperText}</FormHelperText>

          <LoadingButton
            sx={{ width: "100%", marginTop: "16px" }}
            onClick={handleSubmit}
            loading={isLoading}
            size="large"
            variant="contained"
            fullWidth
            color="primary"
          >
            Save
          </LoadingButton>

          <Button
            sx={{ width: "100%", marginTop: "16px" }}
            onClick={() => setOpen(true)}
            size="large"
            variant="outlined"
            fullWidth
            color="error"
          >
            Delete Account
          </Button>
        </Box>
      </Box>
      <>
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Card sx={style}>
            <CardContent>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Account
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Deleting the account will delete all the messages which cannot
                be restored again, and you account information (i.e. Name,
                Username, and Password)
              </Typography>
            </CardContent>
            <CardActions>
              <LoadingButton
                onClick={handleDelete}
                loading={isLoading}
                size="large"
                variant="text"
                color="error"
              >
                Delete
              </LoadingButton>

              <Button
                onClick={() => setOpen(false)}
                size="large"
                variant="text"
              >
                No
              </Button>
            </CardActions>
          </Card>
        </Modal>
      </>
    </>
  );
}
