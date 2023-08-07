import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import Home from "./pages/home";
import About from "./pages/about";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainLayout from "./layouts/MainLayout";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout HeaderLink={true}>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/about"
              element={
                <MainLayout HeaderLink={false}>
                  <About />
                </MainLayout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
