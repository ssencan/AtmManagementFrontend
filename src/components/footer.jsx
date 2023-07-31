import React from "react";
import { ReactComponent as Logo } from "../layouts/sekerbank-logo.svg";

const Footer = () => {
  return (
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
        <Logo alt="Şekerbank Logo" style={{ height: "60px", width: "auto" }} />
      </a>
    </footer>
  );
};
export default Footer;
