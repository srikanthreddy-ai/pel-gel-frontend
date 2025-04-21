import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';

const AddNature = ({ open, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    department: "",
    cader: "",
    empCode: "",
    designation: "",
    pfNumber: "",
    basic: "",
    hra: "",
    ca: "",
    sa: "",
    dateOfProbation: "",
    uanNumber: "",
    dateOfBirth: "",
    dateOfJoining: "",
    sonOf: "",
    bankDetails: {},
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/employees", formData); // 🔁 Replace with your actual API endpoint
      onAdded(); // callback to refresh data
      onClose();
      toast.success("Employee added successfully!");
    } catch (err) {
      console.error("Failed to add employee", err);
      toast.error("Failed to add employee. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      department: "",
      cader: "",
      empCode: "",
      designation: "",
      pfNumber: "",
      basic: "",
      hra: "",
      ca: "",
      sa: "",
      dateOfProbation: "",
      uanNumber: "",
      dateOfBirth: "",
      dateOfJoining: "",
      sonOf: "",
      bankDetails: {},
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>New Employee</DialogTitle>
      <DialogContent>
        {/* 🔹 BASIC DETAILS */}
        <h3 style={{ marginTop: "1rem" }}>Basic Details</h3>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}>
              {["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."].map((title) => (
                <MenuItem key={title} value={title}>
                  {title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Cader"
              name="cader"
              value={formData.cader}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Employee Code"
              name="empCode"
              value={formData.empCode}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="PF Number"
              name="pfNumber"
              value={formData.pfNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="UAN Number"
              name="uanNumber"
              value={formData.uanNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Son/Daughter Of"
              name="sonOf"
              value={formData.sonOf}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date of Joining"
              name="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Date of Probation"
              name="dateOfProbation"
              type="date"
              value={formData.dateOfProbation}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* 💰 SALARY DETAILS */}
        <h3 style={{ marginTop: "2rem" }}>Salary Details</h3>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Basic"
              name="basic"
              type="number"
              value={formData.basic}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="HRA"
              name="hra"
              type="number"
              value={formData.hra}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="CA"
              name="ca"
              type="number"
              value={formData.ca}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="SA"
              name="sa"
              type="number"
              value={formData.sa}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        {/* 🏦 BANK DETAILS */}
        <h3 style={{ marginTop: "2rem" }}>Bank Details</h3>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankDetails.bankName"
              value={formData.bankDetails?.bankName || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: {
                    ...formData.bankDetails,
                    bankName: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Account Number"
              name="bankDetails.accountNumber"
              value={formData.bankDetails?.accountNumber || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: {
                    ...formData.bankDetails,
                    accountNumber: e.target.value,
                  },
                })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="IFSC Code"
              name="bankDetails.ifsc"
              value={formData.bankDetails?.ifsc || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: {
                    ...formData.bankDetails,
                    ifsc: e.target.value,
                  },
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
        <ToastContainer position="top-right" autoClose={3000} />
      </DialogActions>
    </Dialog>
  );
};

export default AddNature;
