import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
