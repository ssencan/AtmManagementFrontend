import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ReactComponent as Logo } from "../layouts/sekerbank-logo.svg"; // SVG logo import

const MainLayout = ({ children }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
      <footer>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <a href="https://www.sekerbank.com.tr">
              <Logo alt="Şekerbank Logo" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
