import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import Home from "./pages/home";
import AtmTable from "./components/Table";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const StyledButton = styled(Button)({
  position: "absolute",
  bottom: "10px",
  left: "10px",
  backgroundColor: "#3f51b5",
  color: "white",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
  width: "80px",
  height: "25px",
  padding: "0",
  fontSize: "10px",
});

function CenterButton() {
  const map = useMap();

  const centerView = () => {
    map.flyTo([39.09014653873912, 35.56743804787035], 5);
  };

  return (
    <StyledButton onClick={centerView} variant="contained">
      Center View
    </StyledButton>
  );
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const InfoRow = ({ label, value }) => (
  <Typography component="div" variant="body2">
    <Typography variant="body2" component="span" style={{ fontWeight: "bold" }}>
      {label}:
    </Typography>{" "}
    {value}
  </Typography>
);

const CustomSelect = ({
  label,
  name,
  value,
  onChange,
  children,
  disabled,
  style,
}) => (
  <FormControl
    fullWidth
    style={{ marginBottom: "5px", marginTop: "10px", ...style }}
  >
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: "230px",
            width: "20ch",
          },
        },
      }}
    >
      {children}
    </Select>
  </FormControl>
);

const atmValidationSchema = yup.object({
  atmName: yup.string("Enter ATM Name").required("ATM Name is required"),
  latitude: yup
    .number("Enter valid Latitude")
    .required("Latitude is required")
    .min(-90, "Minimum latitude is -90")
    .max(90, "Maximum latitude is 90"),
  longitude: yup
    .number("Enter valid Longitude")
    .required("Longitude is required")
    .min(-180, "Minimum longitude is -180")
    .max(180, "Maximum longitude is 180"),
  cityID: yup.number("Select City").required("City is required"),
  districtID: yup.number("Select District").required("District is required"),
});

/* const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
  padding: "5px 6px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const DeleteButton = styled(Button)({
  backgroundColor: "#ff0000", // kırmızı
  "&:hover": {
    backgroundColor: "#b30000", // üzerine gelindiğinde daha koyu bir kırmızı
  },
}); */

/* const UpdateButton = styled(Button)({
  backgroundColor: "#008000", // yeşil
  "&:hover": {
    backgroundColor: "#006400", // üzerine gelindiğinde daha koyu bir yeşil
  },s
}); */

function App() {
  const [atmData, setAtmData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [hoveredAtmId, setHoveredAtmId] = useState(null);
  const formik = useFormik({
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
        addAtm(values);
      } else if (openUpdate) {
        updateAtm(values);
      }
    },
  });

  useEffect(() => {
    fetchAtmData();
    fetchCities();
  }, []);
  useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID]);

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

  const addAtm = async () => {
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
  };

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
  const updateAtm = async () => {
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
  };

  const resetForm = () => {
    formik.resetForm();
    setCities([]);
    setDistricts([]);
  };

  const handleOpenAdd = async () => {
    await Promise.all([fetchCities(), fetchDistricts()]);
    setOpenAdd(true);
  };

  const handleOpenUpdate = async (atmToUpdate) => {
    await fetchCities();
    await fetchDistricts(atmToUpdate.cityID);
    formik.setValues(atmToUpdate);
    setOpenUpdate(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    resetForm();
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    resetForm();
  };

  return (
    <Fragment>
      <ToastContainer />
      <Home>
        <Grid container style={{ height: "100%" }}>
          <Grid id="table-grid" item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <ThemeProvider theme={theme}>
              <AtmTable
                handleOpenAdd={handleOpenAdd}
                atmData={atmData}
                deleteAtm={deleteAtm}
                handleOpenUpdate={handleOpenUpdate}
                hoveredAtmId={hoveredAtmId}
                setHoveredAtmId={setHoveredAtmId}
              />
            </ThemeProvider>
          </Grid>
          <Grid id="map-grid" item xs={12} md={4} order={{ xs: 1, md: 2 }}>
            <div
              style={{
                position: "sticky",
                top: "0",
                height: "50vh",
              }}
            >
              <MapContainer
                center={[39.09014653873912, 35.56743804787035]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {atmData.map((atm) => (
                  <Marker key={atm.id} position={[atm.latitude, atm.longitude]}>
                    {hoveredAtmId === atm.id && (
                      <Tooltip permanent>
                        <InfoRow label="Name" value={atm.atmName} />
                        <InfoRow label="City" value={atm.cityName} />
                        <InfoRow label="District" value={atm.districtName} />
                        <InfoRow label="Latitude" value={atm.latitude} />
                        <InfoRow label="Longitude" value={atm.longitude} />
                      </Tooltip>
                    )}
                    <Popup>
                      <InfoRow label="Name" value={atm.atmName} />
                      <InfoRow label="City" value={atm.cityName} />
                      <InfoRow label="District" value={atm.districtName} />
                      <InfoRow label="Latitude" value={atm.latitude} />
                      <InfoRow label="Longitude" value={atm.longitude} />
                    </Popup>
                  </Marker>
                ))}
                <Control position="bottomleft">
                  <CenterButton />
                </Control>
              </MapContainer>
            </div>
          </Grid>
        </Grid>

        <Dialog label="Add" open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Add New ATM</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter ATM details.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="atmName"
              name="atmName"
              label="ATM Name"
              type="text"
              fullWidth
              value={formik.values.atmName}
              onChange={formik.handleChange}
              error={formik.touched.atmName && Boolean(formik.errors.atmName)}
              helperText={formik.touched.atmName && formik.errors.atmName}
            />

            <TextField
              margin="dense"
              name="latitude"
              label="Latitude"
              type="text"
              fullWidth
              value={formik.values.latitude}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
            />
            <TextField
              margin="dense"
              name="longitude"
              label="Longitude"
              type="text"
              fullWidth
              value={formik.values.longitude}
              onChange={formik.handleChange}
              error={
                formik.touched.longitude && Boolean(formik.errors.longitude)
              }
              helperText={formik.touched.longitude && formik.errors.longitude}
            />

            <CustomSelect
              label="City"
              name="cityID"
              value={formik.values.cityID}
              onChange={async (e) => {
                formik.handleChange(e);
                await fetchDistricts(e.target.value);
              }}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </CustomSelect>

            <CustomSelect
              label="District"
              name="districtID"
              value={formik.values.districtID}
              onChange={formik.handleChange}
              disabled={!formik.values.cityID}
            >
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="primary">
              Cancel
            </Button>
            <Button onClick={formik.handleSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog label="Update" open={openUpdate} onClose={handleCloseUpdate}>
          <DialogTitle>Update ATM</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter ATM details.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="atmName"
              label="ATM Name"
              type="text"
              fullWidth
              value={formik.values.atmName}
              onChange={formik.handleChange}
              error={formik.touched.atmName && Boolean(formik.errors.atmName)}
              helperText={formik.touched.atmName && formik.errors.atmName}
            />
            <TextField
              margin="dense"
              name="latitude"
              label="Latitude"
              type="text"
              fullWidth
              value={formik.values.latitude}
              onChange={formik.handleChange}
              error={formik.touched.latitude && Boolean(formik.errors.latitude)}
              helperText={formik.touched.latitude && formik.errors.latitude}
            />
            <TextField
              margin="dense"
              name="longitude"
              label="Longitude"
              type="text"
              fullWidth
              value={formik.values.longitude}
              onChange={formik.handleChange}
              error={
                formik.touched.longitude && Boolean(formik.errors.longitude)
              }
              helperText={formik.touched.longitude && formik.errors.longitude}
            />
            <CustomSelect
              label="City"
              name="cityID"
              value={formik.values.cityID}
              onChange={async (e) => {
                formik.handleChange(e);
                await fetchDistricts(e.target.value);
              }}
            >
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </CustomSelect>
            <CustomSelect
              label="District"
              name="districtID"
              value={formik.values.districtID}
              onChange={formik.handleChange}
            >
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </CustomSelect>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="primary">
              Cancel
            </Button>
            <Button onClick={formik.handleSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Home>
    </Fragment>
  );
}

export default App;
