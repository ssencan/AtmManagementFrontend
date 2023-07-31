import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ flexGrow: 1, overflow: "auto" }}>{children}</div>
        <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Box flexGrow={1}>
                <Typography variant="body1" align="center">
                  Footer content goes here.
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );
};

export default MainLayout;
