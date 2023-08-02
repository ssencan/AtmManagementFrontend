import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Control from "react-leaflet-custom-control";
import "leaflet/dist/leaflet.css";
import Home from "./pages/Home";
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

/* const StyledButton = styled(Button)({
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
}); */

/* function CenterButton() {
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
); */

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Home
        //handleOpenAdd taşındı table componente
        //handleOpenUpdate taşındı table componente
        //deleteAtm={deleteAtm}
        //hoveredAtmId={hoveredAtmId}
        //setHoveredAtmId={setHoveredAtmId}
        />

        {/*         <Dialog label="Add" open={openAdd} onClose={handleCloseAdd}>
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
        </Dialog> */}
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
