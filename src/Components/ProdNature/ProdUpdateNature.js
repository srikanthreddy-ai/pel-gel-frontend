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
    building_id: "",
    productionNature: "",
    productionType: "",
    productionCode: "",
    manpower: "",
    norms: "",
    startDate: "",
    endDate: "",
    incentives: [], // initialize this to prevent runtime issues if you uncomment dynamic fields
    isDeleted: false,
  });
  console.log("nature", formData, employee);
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
  const addIncentive = () => {
    setFormData({
      ...formData,
      incentives: [
        ...formData.incentives,
        { min: "", max: "", each: "", amount: "" },
      ],
    });
  };
  const removeIncentive = (index) => {
    const newIncentives = formData.incentives.filter((_, i) => i !== index);
    setFormData({ ...formData, incentives: newIncentives });
  };
  const handleIncentiveChange = (index, field, value, type) => {
    // Convert value to number if type is 'number'
    if (type === "number") {
      value = Number(value);
    }

    const newIncentives = [...formData.incentives];
    newIncentives[index][field] = value;

    setFormData({ ...formData, incentives: newIncentives });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.put(`/ProductionNature/${employee._id}`, formData); // Update API
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Nature</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Building ID"
          name="building_id"
          value={formData.building_id.buildingName}
          onChange={handleChange}
          disabled
        />

        <TextField
          fullWidth
          margin="dense"
          label="Production Nature"
          name="productionNature"
          value={formData.productionNature}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Production Type"
          name="productionType"
          value={formData.productionType}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Production Code"
          name="productionCode"
          value={formData.productionCode}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Manpower"
          name="manpower"
          type="number"
          value={formData.manpower}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="dense"
          label="Norms"
          name="norms"
          type="number"
          value={formData.norms}
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

         <div style={{ marginTop: "1rem" }}>
                  <h4>Incentives</h4>
                  {formData.incentives.map((incentive, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                      <TextField
                        label="Min"
                        type="number"
                        value={incentive.min}
                        onChange={(e) =>
                          handleIncentiveChange(
                            index,
                            "min",
                            e.target.value,
                            e.target.type
                          )
                        }
                        fullWidth
                      />
                      <TextField
                        label="Max"
                        type="number"
                        value={incentive.max}
                        onChange={(e) =>
                          handleIncentiveChange(
                            index,
                            "max",
                            e.target.value,
                            e.target.type
                          )
                        }
                        fullWidth
                      />
                      <TextField
                        label="Each"
                        type="number"
                        value={incentive.each}
                        onChange={(e) =>
                          handleIncentiveChange(
                            index,
                            "each",
                            e.target.value,
                            e.target.type
                          )
                        }
                        fullWidth
                      />
                      <TextField
                        label="Amount"
                        type="number"
                        value={incentive.amount}
                        onChange={(e) =>
                          handleIncentiveChange(
                            index,
                            "amount",
                            e.target.value,
                            e.target.type
                          )
                        }
                        fullWidth
                      />
                      <Button color="error" onClick={() => removeIncentive(index)}>
                        Remove
                      </Button>
                    </div>
                  ))}
        
                  <Button variant="outlined" onClick={addIncentive}>
                    + Add Incentive
                  </Button>
                </div>

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
