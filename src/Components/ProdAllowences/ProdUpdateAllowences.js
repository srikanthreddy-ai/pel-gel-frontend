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
      await axiosInstance.put(`/updateAllowence/${employee._id}`, formData); // Update API
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Allowence</DialogTitle>
      <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Allowence Name"
                name="allowence"
                value={formData.allowence}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="shift Name"
                name="shift"
                placeHolder="Day/Night"
                value={formData.shift}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  step: 600, // 600 seconds = 10 minutes; use 900 for 15-minute steps
                }}
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
