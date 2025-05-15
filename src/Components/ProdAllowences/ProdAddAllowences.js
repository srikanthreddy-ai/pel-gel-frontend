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
import { toast, ToastContainer } from "react-toastify";

const AddNature = ({ open, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    allowence: "",
    shift: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/createAllowence", formData); // 🔁 Replace with your actual API endpoint
      setFormData({ allowence: "", shift: "", amount: "" });
      onAdded(); // callback to refresh data
      onClose();
    } catch (err) {
      console.error("Failed to add allowence", err);
      toast.error(
        err.response.data.error ||
          "Failed to add allowence! Please try again later."
      );
    }
  };

  const handleClose = () => {
    setFormData({
      allowence: "",
      shift: "",
      amount: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <ToastContainer position="top-right" autoClose={3000} />
      <DialogTitle>New Allowence</DialogTitle>
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
