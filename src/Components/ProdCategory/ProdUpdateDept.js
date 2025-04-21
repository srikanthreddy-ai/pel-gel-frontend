import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    const { name, type, value } = e.target;
    if (name === "isDeleted") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/ProductionDept/${employee._id}`, formData); // Update API
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
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
          <h4 style={{ marginRight: "10px" }}>Delete</h4>
          <FormControlLabel
            control={
              <Checkbox
                name="isDeleted"
                checked={formData.isDeleted}
                onChange={handleChange}
                color="primary"
              />
            }
          />
        </div>
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
