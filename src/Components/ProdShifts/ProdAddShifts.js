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

const AddNature = ({ open, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    shiftName: "",
    shiftHrs: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/ProductionShift", formData); // 🔁 Replace with your actual API endpoint
      onAdded(); // callback to refresh data
      onClose();
    } catch (err) {
      console.error("Failed to add employee", err);
    }
  };

  const handleClose = () => {
    setFormData({
      shiftName: "",
      shiftHrs: "",
      startTime: "",
      endTime: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>New Shift</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Shift Name"
          name="shiftName"
          value={formData.shiftName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="shift Hr's"
          name="shiftHrs"
          type="number"
          value={formData.shiftHrs}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Start Time"
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            step: 600, // 600 seconds = 10 minutes; use 900 for 15-minute steps
          }}
        />

        <TextField
          fullWidth
          margin="dense"
          label="End Time"
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            step: 600, // 600 seconds = 10 minutes; use 900 for 15-minute steps
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNature;
