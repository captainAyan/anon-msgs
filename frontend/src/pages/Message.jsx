import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";

import { GET_PROFILE_URL, SEND_MESSAGE_URL } from "../constants/apiUrls";

import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Message() {
  const [message, setMessage] = useState("");
  const [helperText, setHelperText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { recipient } = useParams();
  const [usernameChecked, setUsernameChecked] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    if (message.trim().length <= 1000) {
      setMessage(e.target.value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post(SEND_MESSAGE_URL + recipient, {
        body: message,
      });
      setIsError(false);
      setHelperText("Message Sent");
    } catch (error) {
      setIsError(true);
      setHelperText(error.response.data.error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const validateRecipientUsername = async () => {
      try {
        await axios.get(GET_PROFILE_URL + recipient);
      } catch (error) {
        setIsError(true);
        setHelperText(error.response.data.error.message);
      }

      setUsernameChecked(true);
    };

    validateRecipientUsername();
  }, [recipient]);

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
        Send a message to @{recipient} &nbsp;
        {!usernameChecked ? (
          <CircularProgress size={14} thickness={8} disableShrink />
        ) : (
          ""
        )}
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          autoFocus
          rows={4}
          label="Message"
          name="message"
          type="text"
          id="message"
          value={message}
          onChange={onChange}
        />

        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {message.trim().length}/1000
        </Typography>

        <FormHelperText error={isError}>{helperText}</FormHelperText>

        <LoadingButton
          sx={{ marginTop: "16px" }}
          onClick={handleSubmit}
          loading={isLoading}
          size="large"
          variant="contained"
          fullWidth
          color="primary"
        >
          Send
        </LoadingButton>

        {user ? (
          <></>
        ) : (
          <Button
            sx={{ marginTop: "16px" }}
            onClick={() => {
              navigate("/register");
            }}
            size="large"
            variant="outlined"
            fullWidth
            color="primary"
          >
            Create Your Own
          </Button>
        )}
      </Box>
    </Box>
  );
}
