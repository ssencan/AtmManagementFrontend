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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

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

const UpdateButton = styled(Button)({
  backgroundColor: "#008000", // yeşil
  "&:hover": {
    backgroundColor: "#006400", // üzerine gelindiğinde daha koyu bir yeşil
  },
});

function App() {
  const [atmData, setAtmData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [atm, setAtm] = useState({
    id: "",
    atmName: "",
    latitude: "",
    longitude: "",
    cityID: "",
    districtID: "",
    isActive: true,
  });

  useEffect(() => {
    fetchAtmData();
    fetchCities();
    fetchDistricts();
  }, []);

  const fetchAtmData = async () => {
    try {
      const response = await axios.get("https://localhost:44334/api/Atm");
      const activeAtms = response.data.filter((atm) => atm.isActive);
      setAtmData(activeAtms);
      //console.log("ATM data fetched: ", activeAtms);
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
        atmName: atm.atmName,
        latitude: parseFloat(atm.latitude),
        longitude: parseFloat(atm.longitude),
        cityID: parseInt(atm.cityID),
        districtID: parseInt(atm.districtID),
        isActive: atm.isActive,
      });
      alert("ATM added successfully.");
      fetchAtmData();
      handleCloseAdd();
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
        fetchAtmData();
      }
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
    }
  };
  const updateAtm = async () => {
    try {
      const response = await axios.put(
        "https://localhost:44334/api/Atm/UpdateAtm",
        {
          id: atm.id,
          atmName: atm.atmName,
          latitude: parseFloat(atm.latitude),
          longitude: parseFloat(atm.longitude),
          cityID: parseInt(atm.cityID),
          districtID: parseInt(atm.districtID),
          isActive: atm.isActive,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response: ", response);
      await fetchAtmData();
      alert("ATM updated successfully.");
      handleCloseUpdate();
    } catch (atmPuterror) {
      console.error(atmPuterror);
    }
  };

  const handleOpenAdd = async () => {
    await Promise.all([fetchCities(), fetchDistricts()]);
    setOpenAdd(true);
  };

  const handleOpenUpdate = async (atmToUpdate) => {
    await fetchCities();
    await fetchDistricts(atmToUpdate.cityID);
    setAtm(atmToUpdate);
    setOpenUpdate(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleInputChange = (e) => {
    setAtm({ ...atm, [e.target.name]: e.target.value });
  };
  const handleCityChange = async (event) => {
    const cityID = event.target.value;
    await fetchDistricts(cityID);
    setAtm({ ...atm, cityID: cityID });
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
                <StyledTableCell colSpan={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenAdd}
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
                  <StyledTableCell>
                    <UpdateButton
                      variant="contained"
                      onClick={() => handleOpenUpdate(item)}
                    >
                      Update
                    </UpdateButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog label="Add" open={openAdd} onClose={handleCloseAdd}>
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
            <FormControl fullWidth>
              <InputLabel id="city-add-select-label">City</InputLabel>
              <Select
                labelId="city-add-select-label"
                name="CityID"
                value={atm.cityID}
                onChange={async (e) => {
                  handleCityChange(e);
                  await fetchDistricts(e.target.value);
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="district-add-select-label">District</InputLabel>
              <Select
                labelId="district-add-select-label"
                name="districtID"
                value={atm.districtID}
                onChange={handleInputChange}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="primary">
              Cancel
            </Button>
            <Button onClick={addAtm} color="primary">
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
              value={atm.atmName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="latitude"
              label="Latitude"
              type="text"
              fullWidth
              value={atm.latitude}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="longitude"
              label="Longitude"
              type="text"
              fullWidth
              value={atm.longitude}
              onChange={handleInputChange}
            />
            <FormControl fullWidth>
              <InputLabel id="city-update-select-label">City</InputLabel>
              <Select
                labelId="city-update-select-label"
                name="CityID"
                value={atm.cityID}
                onChange={async (e) => {
                  handleCityChange(e);
                  await fetchDistricts(e.target.value);
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="district-update-select-label">
                District
              </InputLabel>
              <Select
                labelId="district-update-select-label"
                name="districtID"
                value={atm.districtID}
                onChange={handleInputChange}
              >
                {districts.map((district) => (
                  <MenuItem key={district.id} value={district.id}>
                    {district.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="primary">
              Cancel
            </Button>
            <Button onClick={updateAtm} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  );
}
export default App;
