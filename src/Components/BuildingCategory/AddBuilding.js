import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@mui/material";
import axiosInstance from "../Utils/axiosInstance";

const AddAssemblyLineModal = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [buidlingId, setBuildingId] = useState("");
    const [budlingName, setBudlingName] = useState("");
    const [buidlingCode, setBuildingCode] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(false);

    // Reset form when modal opens or closes
    useEffect(() => {
        if (!open) {
            setName("");
            setBuildingId("");
            setBudlingName("");
            setBuildingCode("");
            setDescription("");
            setStartDate("");
            setEndDate("");
        }
    }, [open]);

    const isFormValid = () =>
        name && buidlingId && budlingName && buidlingCode && startDate && endDate;

    const handleAddAssemblyLine = async () => {
        const payload = {
            name,
            buidlingId: parseInt(buidlingId),
            budlingName,
            buidlingCode,
            description,
            startDate,
            endDate,
        };

        try {
            setLoading(true);
            await axiosInstance.post("/ProductionDept", payload);
            onClose(); // ✅ Close modal on success
        } catch (error) {
            console.error("Error adding assembly line:", error?.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>New Building</DialogTitle>
            <DialogContent>
                <TextField label="Building ID" type="number" fullWidth value={buidlingId} onChange={(e) => setBuildingId(e.target.value)} margin="dense" />
                <TextField label="Building Name" fullWidth value={budlingName} onChange={(e) => setBudlingName(e.target.value)} margin="dense" />
                <TextField label="Building Code" fullWidth value={buidlingCode} onChange={(e) => setBuildingCode(e.target.value)} margin="dense" />
                <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} margin="dense" />
                <TextField label="Start Date" type="date" fullWidth value={startDate} onChange={(e) => setStartDate(e.target.value)} margin="dense" InputLabelProps={{ shrink: true }} />
                <TextField label="End Date" type="date" fullWidth value={endDate} onChange={(e) => setEndDate(e.target.value)} margin="dense" InputLabelProps={{ shrink: true }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleAddAssemblyLine} color="primary" disabled={!isFormValid() || loading}>
                    {loading ? "Adding..." : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAssemblyLineModal;
