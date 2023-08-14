import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import Control from "react-leaflet-custom-control";
import { Button, styled, Typography, Grid } from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
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

const InfoRow = ({ label, value }) => (
  <Typography component="div" variant="body2">
    <Typography variant="body2" component="span" style={{ fontWeight: "bold" }}>
      {label}:
    </Typography>{" "}
    {value}
  </Typography>
);

const AtmMap = ({ atmData, hoveredAtmId }) => {
  return (
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
  );
};

export default AtmMap;
