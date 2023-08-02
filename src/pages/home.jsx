import React from "react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import MainLayout from "../layouts/MainLayout";
import AtmTable from "../components/AtmTable";
import AtmMap from "../components/AtmMap";
import { Padding } from "@mui/icons-material";

const Home = () => {
  const [atmData, setAtmData] = useState([]);
  const [hoveredAtmId, setHoveredAtmId] = useState(null);

  const fetchAtmData = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/Atm");
      const activeAtms = response.data.filter((atm) => atm.isActive);
      setAtmData(activeAtms);
    } catch (atmGETerror) {
      console.error(atmGETerror);
    }
  };
  useEffect(() => {
    fetchAtmData();
  }, []);

  return (
    <MainLayout>
      <div style={{ padding: "10px" }}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <AtmTable
              fetchAtmData={fetchAtmData}
              atmData={atmData}
              hoveredAtmId={hoveredAtmId}
              setHoveredAtmId={setHoveredAtmId}
            />
          </Grid>
          <Grid id="map-grid" item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <AtmMap atmData={atmData} hoveredAtmId={hoveredAtmId} />
          </Grid>
        </Grid>
      </div>
    </MainLayout>
  );
};

export default Home;
