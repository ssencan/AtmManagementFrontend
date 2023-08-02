import React from "react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import AtmTable from "../components/AtmTable";

const Home = ({ deleteAtm, hoveredAtmId, setHoveredAtmId }) => {
  const [atmData, setAtmData] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchAtmData();
    fetchCities();
  }, []);

  const fetchAtmData = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/Atm");
      const activeAtms = response.data.filter((atm) => atm.isActive);
      setAtmData(activeAtms);
    } catch (atmGETerror) {
      console.error(atmGETerror);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/City");
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDistricts = async (cityId) => {
    try {
      const response = await axios.get("https://localhost:44334/api/District");
      const cityDistricts = response.data.filter(
        (district) => district.cityId === cityId
      );
      setDistricts(cityDistricts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: "10px" }}>
        <AtmTable
          atmData={atmData}
          deleteAtm={deleteAtm}
          //handleopen update ve add silindi
          hoveredAtmId={hoveredAtmId}
          setHoveredAtmId={setHoveredAtmId}
          fetchCities={fetchCities}
          fetchDistricts={fetchDistricts}
        />
      </div>
    </MainLayout>
  );
};

export default Home;
