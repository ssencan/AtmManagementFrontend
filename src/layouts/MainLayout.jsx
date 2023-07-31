import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../layouts/sekerbank-logo.svg";
import { Box } from "@mui/system";

const MainLayout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATM Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "10px" }}>{children}</div>
      <footer
        style={{
          backgroundColor: "#f8f9fa",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="https://www.sekerbank.com.tr">
          <Logo
            alt="Şekerbank Logo"
            style={{ height: "60px", width: "auto" }}
          />
        </a>
      </footer>
    </>
  );
};

export default MainLayout;
