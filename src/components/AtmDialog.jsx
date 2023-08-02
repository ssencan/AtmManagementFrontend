import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";

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

const AtmDialog = ({
  atmToUpdate,
  setAtmToUpdate,
  setOpenAdd,
  setOpenUpdate,
  openAdd,
  openUpdate,
}) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: atmToUpdate ? atmToUpdate.id : "",
      atmName: atmToUpdate ? atmToUpdate.atmName : "",
      latitude: atmToUpdate ? atmToUpdate.latitude : "",
      longitude: atmToUpdate ? atmToUpdate.longitude : "",
      cityID: atmToUpdate ? atmToUpdate.cityID : "",
      districtID: atmToUpdate ? atmToUpdate.districtID : "",
      isActive: atmToUpdate ? atmToUpdate.isActive : true,
    },
    validationSchema: atmValidationSchema,
    onSubmit: (values) => {
      if (props.openAdd) {
        addAtm(values);
        props.setOpenAdd(false);
      } else if (props.openUpdate) {
        updateAtm(values);
        props.setOpenUpdate(false);
      }
      setAtmToUpdate(null); // formik submit olduktan sonra atmToUpdate'yi null olarak set ediyoruz
    },
  });

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
    fetchCities();
  }, []);

  useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID]);

  const handleClose = () => {
    if (props.openAdd) {
      props.setOpenAdd(false);
    } else if (props.openUpdate) {
      props.setOpenUpdate(false);
    }
    setAtmToUpdate(null);
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

  const handleCloseAdd = () => {
    setOpenAdd(false);
    resetForm();
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    resetForm();
  };

  return (
    <Dialog open={props.openAdd || props.openUpdate} onClose={handleClose}>
      <DialogTitle>{props.openAdd ? "Add New ATM" : "Update ATM"}</DialogTitle>
      <DialogContent>
        {" "}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
          {props.openAdd ? "Add" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
