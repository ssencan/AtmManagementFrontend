import React, { useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Button,
  MenuItem,
} from "@mui/material";

const StyledDialogTitle = styled(DialogTitle)({
  backgroundColor: "#006400",
  color: "#FFFFFF",
});

const StyledDialogContent = styled(DialogContent)({
  backgroundColor: "#F9F9F9",
});

const StyledButton = styled(Button)({
  backgroundColor: "#006400",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#004F00",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
});

const CancelButton = styled(Button)({
  backgroundColor: "#ff0000",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#6f0000",
  },
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .8)",
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

const CustomTextField = ({ name, label, formik }) => (
  <TextField
    margin="dense"
    name={name}
    label={label}
    type="text"
    fullWidth
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
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
  }, [fetchCities]);

  useEffect(() => {
    if (formik.values.cityID) {
      fetchDistricts(formik.values.cityID);
    }
  }, [formik.values.cityID, fetchDistricts]);

  const getFormikData = () => ({
    atmName: formik.values.atmName,
    latitude: parseFloat(formik.values.latitude),
    longitude: parseFloat(formik.values.longitude),
    cityID: parseInt(formik.values.cityID),
    districtID: parseInt(formik.values.districtID),
    isActive: formik.values.isActive,
  });

  const getFormikDataWithId = () => ({
    ...getFormikData(),
    id: formik.values.id,
  });

  const handleAtmRequest = async (method, url, data) => {
    try {
      const response = await axios[method](url, data);
      fetchAtmData();
      handleClose();
      toast.success("ATM operation successful.");
      return response;
    } catch (error) {
      console.error(error);
      toast.error("Failed to perform ATM operation.");
    }
  };

  const addAtm = () =>
    handleAtmRequest(
      "post",
      "https://localhost:44334/api/Atm/CreateAtm",
      getFormikData()
    );

  const updateAtm = () =>
    handleAtmRequest(
      "put",
      "https://localhost:44334/api/Atm/UpdateAtm",
      getFormikDataWithId()
    );

  const handleClose = () => {
    setOpen(false);
    resetForm();
    fetchCities();
  };

  const resetForm = () => {
    formik.resetForm();
    setCities([]);
    setDistricts([]);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogTitle>
        {mode === "add" ? "Add New ATM" : "Update ATM"}
      </StyledDialogTitle>
      <StyledDialogContent>
        <DialogContentText>Enter ATM details.</DialogContentText>
        <CustomTextField name="atmName" label="ATM Name" formik={formik} />
        <CustomTextField name="latitude" label="Latitude" formik={formik} />
        <CustomTextField name="longitude" label="Longitude" formik={formik} />

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
      </StyledDialogContent>
      <DialogActions>
        <CancelButton onClick={handleClose}>Cancel</CancelButton>
        <StyledButton onClick={formik.handleSubmit}>
          {mode === "add" ? "Add" : "Update"}
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default AtmDialog;
