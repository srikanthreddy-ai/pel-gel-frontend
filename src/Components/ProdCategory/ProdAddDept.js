import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';

const AddNature = ({ open, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    buildingId: "",
    buildingName: "",
    buildingCode: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/ProductionDept", formData); // 🔁 Replace with your actual API endpoint
      onAdded(); // callback to refresh data
      onClose();
      toast.success("Data loaded successfully!");
    } catch (err) {
      console.error("Failed to add dept", err);
      toast.error("Something went wrong while creating data!");
    }
  };

  const handleClose = () => {
    setFormData({
      buildingId: "",
      buildingName: "",
      buildingCode: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add New Category</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Building Id"
          name="buildingId"
          value={formData.buildingId}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Building Code"
          name="buildingCode"
          value={formData.buildingCode}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Building Name"
          name="buildingName"
          value={formData.buildingName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="dense"
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
        <ToastContainer />
      </DialogActions>
    </Dialog>
  );
};

export default AddNature;
