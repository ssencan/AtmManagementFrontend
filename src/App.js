import React, { Fragment, useEffect, useState } from "react";
import { Button, IconButton, TextField } from "@mui/material";
import * as colors from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function App() {
  const [atmData, setAtmData] = useState([]);

  useEffect(() => {
    const fetchAtmData = async () => {
      try {
        const response = await axios.get("https://localhost:44334/api/Atm");
        setAtmData(response.data);
      } catch (atmGETerror) {
        console.error(atmGETerror);
      }
    };
    fetchAtmData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ATM Name</TableCell>
            <TableCell>Latitude</TableCell>
            <TableCell>Longitude</TableCell>
            <TableCell>City Name</TableCell>
            <TableCell>District Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {atmData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.atmName}</TableCell>
              <TableCell>{item.latitude}</TableCell>
              <TableCell>{item.longitude}</TableCell>
              <TableCell>{item.cityName}</TableCell>
              <TableCell>{item.districtName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default App;
