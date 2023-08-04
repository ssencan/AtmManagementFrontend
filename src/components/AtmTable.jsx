import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AtmDialog from "../components/AtmDialog";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#007A3D",
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
  padding: "5px 6px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F3F3F3",
  },
  "&:hover": {
    backgroundColor: "#B5FF7D",
  },
}));

const AddButton = styled(Button)({
  backgroundColor: "#007A3D",
  "&:hover": {
    backgroundColor: "#7DB900",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const DeleteButton = styled(Button)({
  backgroundColor: "#ff0000",
  "&:hover": {
    backgroundColor: "#6f0000",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const UpdateButton = styled(Button)({
  backgroundColor: "primary",
  "&:hover": {
    backgroundColor: "	#010048",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const AtmTable = ({ atmData, hoveredAtmId, setHoveredAtmId, fetchAtmData }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [atmToUpdate, setAtmToUpdate] = useState({});
  const [initialValues, setInitialValues] = useState({
    id: "",
    atmName: "",
    latitude: "",
    longitude: "",
    cityID: "",
    districtID: "",
    isActive: true,
  });

  /*   useEffect(() => {
    fetchCities();
  }, []); */

  /*   useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID]); */

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

  /* const addAtm = async () => {
    try {
      await axios.post("https://localhost:44334/api/Atm/CreateAtm", {
        atmName: formik.values.atmName,
        latitude: parseFloat(formik.values.latitude),
        longitude: parseFloat(formik.values.longitude),
        cityID: parseInt(formik.values.cityID),
        districtID: parseInt(formik.values.districtID),
        isActive: formik.values.isActive,
      });
      toast.success("ATM added successfully.");
      fetchAtmData();
      handleCloseAdd();
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
      toast.error("Failed to add ATM.");
    }
  }; */

  const deleteAtm = async (id) => {
    try {
      const userConfirmation = window.confirm(
        "Are you sure to delete selected ATM?"
      );
      if (userConfirmation) {
        await axios.delete(`https://localhost:44334/api/Atm/${id}`);
        toast.success("ATM deleted successfully.");
        fetchAtmData();
      }
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
      toast.error("Failed to delete ATM.");
    }
  };
  /*  const updateAtm = async () => {
    try {
      const response = await axios.put(
        "https://localhost:44334/api/Atm/UpdateAtm",
        {
          id: formik.values.id,
          atmName: formik.values.atmName,
          latitude: parseFloat(formik.values.latitude),
          longitude: parseFloat(formik.values.longitude),
          cityID: parseInt(formik.values.cityID),
          districtID: parseInt(formik.values.districtID),
          isActive: formik.values.isActive,
        }
      );
      console.log("Update response: ", response);
      await fetchAtmData();
      toast.success("ATM updated successfully.");
      handleCloseUpdate();
    } catch (atmPuterror) {
      console.error(atmPuterror);
      toast.error("Failed to update ATM.");
    }
  }; */

  /*  const handleClose = () => {
    setOpen(false);
    resetForm();
  }; */

  /*   const handleCloseUpdate = () => {
    setOpenUpdate(false);
    resetForm();
  }; */

  const handleOpenDialog = async (mode, atmToUpdate = null) => {
    setMode(mode);
    if (mode === "update") {
      setAtmToUpdate(atmToUpdate);
      await fetchCities();
      await fetchDistricts(atmToUpdate.cityID);
      setInitialValues({
        id: atmToUpdate.id,
        atmName: atmToUpdate.atmName,
        latitude: atmToUpdate.latitude,
        longitude: atmToUpdate.longitude,
        cityID: atmToUpdate.cityID,
        districtID: atmToUpdate.districtID,
        isActive: atmToUpdate.isActive,
      });
    } else {
      setAtmToUpdate(null);
      setInitialValues({
        id: "",
        atmName: "",
        latitude: "",
        longitude: "",
        cityID: "",
        districtID: "",
        isActive: true,
      }); // Reset initialValues for add mode
    }
    setOpen(true);
  };

  /*   const handleOpenUpdate = async (atmToUpdate) => {
    //await fetchCities();
    //await fetchDistricts(atmToUpdate.cityID);
    //formik.setValues(atmToUpdate);
    setAtmToUpdate(atmToUpdate);
    setOpenUpdate(true);
  }; */

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ATM Name</StyledTableCell>
              <StyledTableCell>Latitude</StyledTableCell>
              <StyledTableCell>Longitude</StyledTableCell>
              <StyledTableCell>City Name</StyledTableCell>
              <StyledTableCell>District Name</StyledTableCell>
              <StyledTableCell colSpan={6}>
                <AddButton
                  variant="contained"
                  onClick={() => handleOpenDialog("add")}
                >
                  Add ATM
                </AddButton>
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {atmData.map((item, index) => (
              <StyledTableRow
                key={index}
                onMouseEnter={() => setHoveredAtmId(item.id)}
                onMouseLeave={() => setHoveredAtmId(null)}
              >
                <StyledTableCell>{item.atmName}</StyledTableCell>
                <StyledTableCell>{item.latitude}</StyledTableCell>
                <StyledTableCell>{item.longitude}</StyledTableCell>
                <StyledTableCell>{item.cityName}</StyledTableCell>
                <StyledTableCell>{item.districtName}</StyledTableCell>
                <StyledTableCell>
                  <DeleteButton
                    variant="contained"
                    onClick={() => deleteAtm(item.id)}
                  >
                    Delete
                  </DeleteButton>
                </StyledTableCell>
                <StyledTableCell>
                  <UpdateButton
                    variant="contained"
                    onClick={() => handleOpenDialog("update", item)}
                  >
                    Update
                  </UpdateButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AtmDialog
        open={open}
        setOpen={setOpen}
        mode={mode}
        initialValues={initialValues}
        fetchCities={fetchCities}
        fetchDistricts={fetchDistricts}
        cities={cities}
        setCities={setCities}
        setDistricts={setDistricts}
        districts={districts}
        fetchAtmData={fetchAtmData}
        setAtmToUpdate={setAtmToUpdate}
      />
    </div>
  );
};
export default AtmTable;
