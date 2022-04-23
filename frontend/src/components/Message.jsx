import React from "react";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { deleteMessage } from "../features/message/messageSlice";

export default function Message({ message }) {
  const dateObj = new Date(message.created_at);
  const dateString = [
    dateObj.getDate().toString().padStart(2, "0"),
    (dateObj.getMonth() + 1).toString().padStart(2, "0"),
    dateObj.getFullYear(),
  ].join("/");

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 1,
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {dateString}
          </Typography>
          <Typography variant="body1">{message.body}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="error"
            onClick={() => dispatch(deleteMessage(message.id))}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
