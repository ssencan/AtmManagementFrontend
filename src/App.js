import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

function App() {
  const [atmData, setAtmData] = useState([]);
  const [open, setOpen] = useState(false);
  const [atm, setAtm] = useState({
    atmName: "",
    latitude: "", // daha sonra parseFloat ile dönüştürülür
    longitude: "", // daha sonra parseFloat ile dönüştürülür
    cityID: "", // daha sonra parseInt ile dönüştürülür
    districtID: "", // daha sonra parseInt ile dönüştürülür
    isActive: true,
  });

  useEffect(() => {
    fetchAtmData();
  }, []);

  const fetchAtmData = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/Atm");
      setAtmData(response.data);
    } catch (atmGETerror) {
      console.error(atmGETerror);
    }
  };

  const addAtm = async () => {
    try {
      await axios.post("https://localhost:44334/api/Atm/CreateAtm", {
        atmName: atm.atmName,
        latitude: parseFloat(atm.latitude),
        longitude: parseFloat(atm.longitude),
        cityID: parseInt(atm.cityID),
        districtID: parseInt(atm.districtID),
        isActive: atm.isActive,
      });

      fetchAtmData();
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setAtm({ ...atm, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ATM Name</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>City Name</TableCell>
              <TableCell>District Name</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add ATM
                </Button>
              </TableCell>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New ATM</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter ATM details.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="atmName"
            label="ATM Name"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="latitude"
            label="Latitude"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="longitude"
            label="Longitude"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="cityID"
            label="City ID"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="districtID"
            label="District ID"
            type="text"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addAtm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default App;
