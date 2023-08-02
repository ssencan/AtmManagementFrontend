import React from "react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";
import AtmTable from "../components/AtmTable";
import AtmDialog from "../components/AtmDialog";

const Home = ({ deleteAtm, hoveredAtmId, setHoveredAtmId }) => {
  const [atmData, setAtmData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false); //modalda da var home taşınacak
  const [openUpdate, setOpenUpdate] = useState(false); //modalda da var home taşınacak
  const [atmToUpdate, setAtmToUpdate] = useState(null);

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
  useEffect(() => {
    fetchAtmData();
    fetchCities();
  }, []);
  useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID]);

  /* const formik = useFormik({
    //bunu galiba home içine taşıycaz. Çünkü hem table da handleopenupdate ile hem de modal componentinde kullanılacak
    initialValues: {
      id: "",
      atmName: "",
      latitude: "",
      longitude: "",
      cityID: "",
      districtID: "",
      isActive: true,
    },
    validationSchema: atmValidationSchema,
    onSubmit: (values) => {
      if (openAdd) {
        addAtm(values); //burda formikle add çağrılıyor. addmetodunu modal componentinde mi açmam lazım?
        //bunu ayrı fonksiyon oluşturup prop geçmem lazım.
      } else if (openUpdate) {
        updateAtm(values);
      }
    },
  }); */

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
          formik={formik}
          openAdd={openAdd}
          openUpdate={openUpdate}
          setOpenAdd={setOpenAdd}
          setOpenUpdate={setOpenUpdate}
        />
        <AtmDialog>
          atmToUpdate={atmToUpdate}
          setAtmToUpdate={setAtmToUpdate}
        </AtmDialog>
      </div>
    </MainLayout>
  );
};

export default Home;
