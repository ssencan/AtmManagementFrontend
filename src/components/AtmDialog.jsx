import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
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

const AtmDialog = ({
  open,
  setOpen,
  mode,
  initialValues,
  fetchCities,
  fetchDistricts,
  cities,
  districts,
  fetchAtmData,
  setCities,
  setDistricts,
  atmToUpdate,
  setAtmToUpdate,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: atmValidationSchema,
    onSubmit: (values) => {
      if (mode === "add") {
        addAtm(values);
      } else if (mode === "update") {
        updateAtm(values);
      }
    },
    enableReinitialize: true, // Bu formik hook'una initialValues değiştiğinde formun yeniden başlatılmasını söyler.
  });

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID]);

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
      handleClose();
    } catch (atmPOSTerror) {
      console.error(atmPOSTerror);
      toast.error("Failed to add ATM.");
    }
  };

  const updateAtm = async () => {
    try {
      const id = formik.values.id;
      console.log(typeof id, id);
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
      handleClose();
    } catch (atmPuterror) {
      console.error(atmPuterror);

      toast.error("Failed to update ATM.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
    //setAtmToUpdate(null);
    //formik.setValues(initialValues); // initialValues to reset form
    fetchCities();
  };

  const resetForm = () => {
    formik.resetForm();
    setCities([]);
    setDistricts([]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{mode === "add" ? "Add New ATM" : "Update ATM"}</DialogTitle>
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
          defaultValue={initialValues.latitude}
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
          error={formik.touched.longitude && Boolean(formik.errors.longitude)}
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
          {mode === "add" ? "Add" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AtmDialog;
