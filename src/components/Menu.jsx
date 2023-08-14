import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

const StyledLink = styled(Link)({
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
  },
});

const StyledList = styled(Link)({
  color: "inherit",
  display: "flex",
  whiteSpace: "nowrap",
  textDecoration: "none",
});

const Menu = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/atmList", text: "Atm List" },
    { path: "/about", text: "About" },
    { path: "/contact", text: "Contact" },
  ];

  return (
    <StyledList component="nav">
      {menuItems.map(
        (item) =>
          location.pathname !== item.path && (
            <ListItem
              ListItemButton
              key={item.path}
              component={StyledLink}
              to={item.path}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          )
      )}
    </StyledList>
  );
};

export default Menu;
