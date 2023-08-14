import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Menu from "./Menu";

const GreenAppBar = styled(AppBar)({
  backgroundColor: "#006400",
  boxShadow: "0px 3px 10px 0px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
});

const WhiteTypography = styled(Typography)({
  color: "#FFFFFF",
  fontWeight: "bold",
});

const Header = () => {
  return (
    <>
      <GreenAppBar position="static">
        <Toolbar>
          <WhiteTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATM Management System
          </WhiteTypography>
          <WhiteTypography>
            <Menu />
          </WhiteTypography>
        </Toolbar>
      </GreenAppBar>
    </>
  );
};

export default Header;
