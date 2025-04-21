import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust the import path as needed

const ConfirmDeleteModal = ({ open, onClose, employee, onDeleted }) => {

  const handleDelete = async () => {
    try {
      if (employee) {
        console.log("Deleting nature:", employee);
        // Assuming you're using a proper API route for deletion
        await axiosInstance.delete(`/ProductionDept/${employee._id}`); // Update API endpoint accordingly
        onDeleted(); // Callback to refresh data after deletion
        onClose();   // Close the modal
      } else {
        console.error("Nature data is missing!");
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        {employee ? (
          <Typography>
            Are you sure you want to delete <strong>{employee.productionNature}</strong>?
          </Typography>
        ) : (
          <Typography className="text-muted">Loading data...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
