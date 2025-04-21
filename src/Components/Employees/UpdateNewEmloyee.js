import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
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
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Category</DialogTitle>
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
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModal;
