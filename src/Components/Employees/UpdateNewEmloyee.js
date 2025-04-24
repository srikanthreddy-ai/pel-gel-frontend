import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust the import path as needed

const EditEmployeeModal = ({ open, onClose, employee, onSuccess }) => {
  const [formData, setFormData] = useState({
    buildingId: "",
    buildingName: "",
    buildingCode: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  console.log("category", formData, employee);
  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/employees/${employee._id}`, formData); // Update API
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg"> 
      <DialogTitle>Edit Employee</DialogTitle>
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
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModal;
