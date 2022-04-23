import React, { useState } from "react";
import "./App.css";
import { Container, CssBaseline, Switch } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { useSelector, useDispatch, useStore } from "react-redux";
import { toDarkMode } from "./features/theme/themeSlice";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Message from "./pages/Message";
import Me from "./pages/Me";

export default function App() {
  const dispatch = useDispatch();
  const store = useStore();
  const themeMode = useSelector((state) => state.theme.mode);

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: blueGrey[500],
      },
    },
  });

  const [checked, setChecked] = useState(
    store.getState().theme.mode === "dark"
  );

  const handleChange = (event) => {
    dispatch(toDarkMode(event.target.checked));
    setChecked(event.target.checked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <BrowserRouter>
          <Header />

          <center>
            <Switch checked={checked} onChange={handleChange} />
          </center>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="me" element={<Me />} />
            <Route path="m">
              <Route path=":recipient" element={<Message />} />
            </Route>
          </Routes>

          <Outlet />

          <Footer />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}
