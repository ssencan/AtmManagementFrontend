import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const MainLayout = ({ children, HeaderLink }) => {
  return (
    <>
      <Header HeaderLink={HeaderLink} />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
