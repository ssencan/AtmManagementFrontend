import React from "react";
import MainLayout from "../layouts/MainLayout";
import AtmTable from "../components/Table";

const Home = ({
  handleOpenAdd,
  atmData,
  deleteAtm,
  handleOpenUpdate,
  hoveredAtmId,
  setHoveredAtmId,
}) => {
  return (
    <MainLayout>
      <div style={{ padding: "10px" }}>
        <AtmTable
          handleOpenAdd={handleOpenAdd}
          atmData={atmData}
          deleteAtm={deleteAtm}
          handleOpenUpdate={handleOpenUpdate}
          hoveredAtmId={hoveredAtmId}
          setHoveredAtmId={setHoveredAtmId}
        />
      </div>
    </MainLayout>
  );
};

export default Home;
