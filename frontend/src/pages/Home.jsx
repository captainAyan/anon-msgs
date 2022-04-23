import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, reset } from "../features/message/messageSlice";

import Message from "../components/Message";
import NoMessage from "../components/NoMessage";

import { Box, Pagination, CircularProgress } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading, isError, message, total, limit } = useSelector(
    (state) => state.message
  );

  const [page, setPage] = useState(1);
  const handlePagination = (_, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getMessages(page - 1));
  }, [dispatch, page]);

  const boxStyle = {
    marginTop: 2,
    marginBottom: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  return (
    <>
      <Box>
        {messages.length === 0 && !isLoading ? (
          <NoMessage />
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        <Box sx={boxStyle}>
          {isLoading ? <CircularProgress disableShrink /> : ""}
        </Box>
      </Box>

      <Box sx={boxStyle}>
        <Pagination
          count={Math.floor(total / limit) + 1 || 0}
          page={page}
          onChange={handlePagination}
          color="primary"
        />
      </Box>
    </>
  );
}
