import React, { Fragment, useEffect, useState } from "react";
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
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { red } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
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
});

function App() {
  const [atmData, setAtmData] = useState([]);
  const [open, setOpen] = useState(false);
  const [atm, setAtm] = useState({
    id: "",
    atmName: "",
    latitude: "",
    longitude: "",
    cityID: "",
    districtID: "",
    isActive: true,
  });
  //const [selectedAtmId, setSelectedAtmId] = useState(null);

  useEffect(() => {
    fetchAtmData();
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
      alert("ATM added successfully.");
      fetchAtmData();
      handleClose();
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
    }
  };

  const deleteAtm = async (id) => {
    try {
      const userConfirmation = window.confirm(
        "Are you sure to delete selected ATM?"
      );
      if (userConfirmation) {
        await axios.delete(`https://localhost:44334/api/Atm/${id}`);
        alert("ATM deleted successfully.");
        await fetchAtmData();
      }
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ATM Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>ATM Name</StyledTableCell>
                <StyledTableCell>Latitude</StyledTableCell>
                <StyledTableCell>Longitude</StyledTableCell>
                <StyledTableCell>City Name</StyledTableCell>
                <StyledTableCell>District Name</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    Add ATM
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {atmData.map((item, index) => (
                <StyledTableRow key={index}>
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog label="Add" open={open} onClose={handleClose}>
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
      </Container>
    </Fragment>
  );
}

export default App;
