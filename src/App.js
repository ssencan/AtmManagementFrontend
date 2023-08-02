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

/* const atmValidationSchema = yup.object({
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
}); */

function App() {
  const [hoveredAtmId, setHoveredAtmId] = useState(null);

  return (
    <Fragment>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
            <Home
              //handleOpenAdd taşındı table componente
              //handleOpenUpdate taşındı table componente
              deleteAtm={deleteAtm}
              hoveredAtmId={hoveredAtmId}
              setHoveredAtmId={setHoveredAtmId}
            />
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
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
