import React from "react";
import MainLayout from "../layouts/MainLayout";

const Home = ({ children }) => {
  return (
    <MainLayout>
      <div style={{ padding: "10px" }}>{children}</div>
    </MainLayout>
  );
};

export default Home;
