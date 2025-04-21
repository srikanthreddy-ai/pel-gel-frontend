import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance"; // Adjust path as needed
import { toast, ToastContainer } from "react-toastify";

const AddNature = ({ open, onClose, onAdded }) => {
  const [prodDepts, setProdDepts] = useState([]);
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buildingRes = await axiosInstance.get("/ProductionDept");
        if (
          buildingRes.status === 200 &&
          Array.isArray(buildingRes.data?.data)
        ) {
          setProdDepts(buildingRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching production departments:", error);
        toast.error("Failed to load production departments.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, type, value } = e.target;

    // If changing building_id, optionally reset related fields
    if (name === "building_id") {
      const selectedBuilding = prodDepts.find((dept) => dept._id === value);
      // You can auto-fill or react to changes here if needed
    }

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("Form Data:", formData); // Debugging line
      await axiosInstance.post("/ProductionNature", formData);
      onAdded(); // Refresh parent
      onClose(); // Close modal
      toast.success("Production Nature added successfully!");
    } catch (err) {
      console.error("Failed to add production nature:", err);
      if (err.response?.data?.message?.includes("duplicate key")) {
        toast.error("Production Code already exists!");
      } else {
        toast.error("Something went wrong while creating data.");
      }
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

  const handleClose = () => {
    setFormData({
      building_id: "",
      productionNature: "",
      productionType: "",
      productionCode: "",
      manpower: "",
      norms: "",
      startDate: "",
      endDate: "",
      incentives: [],
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Production Nature</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          margin="dense"
          label="Select Production Dept"
          name="building_id"
          value={formData.building_id}
          onChange={handleChange}>
          {prodDepts.map((dept) => (
            <MenuItem key={dept._id} value={dept._id}>
              {dept.buildingName} ({dept.buildingCode})
            </MenuItem>
          ))}
        </TextField>

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
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
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

        {/* Optional: Uncomment and enhance incentive input fields here if needed */}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
        <ToastContainer position="top-right" autoClose={3000} />
      </DialogActions>
    </Dialog>
  );
};

export default AddNature;
