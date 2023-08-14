import React from "react";

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
        <img
          src="/images/sekerbank-logo.svg"
          alt="Şekerbank Logo"
          style={{ height: "60px", width: "auto" }}
        />
      </a>
    </footer>
  );
};
export default Footer;
