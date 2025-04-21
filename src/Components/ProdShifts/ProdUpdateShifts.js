import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust the import path as needed

const EditEmployeeModal = ({ open, onClose, employee, onSuccess }) => {
  const [formData, setFormData] = useState({
    productionNature: "",
    productionCode: "",
    productionType: "",
    date: "",
  });
  console.log("employee", formData, employee);
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
      await axiosInstance.put(`/ProductionShift/${employee._id}`, formData); // Update API
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Shift</DialogTitle>
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
          label="Shift Hours"
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
