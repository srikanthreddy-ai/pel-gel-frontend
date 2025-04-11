import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box, LinearProgress, Typography, Grid } from '@mui/material';

const AddStaffModal = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    joiningDate: '',
    department: '',
  });

  const steps = [
    ['name', 'email', 'phone'],
    ['address', 'joiningDate', 'department'],
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    onClose();
  };

  const renderStepFields = () => {
    return steps[activeStep].map((field, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <TextField
          margin="dense"
          name={field}
          label={capitalizeFirstLetter(field)}
          fullWidth
          variant="outlined"
          value={formData[field]}
          onChange={handleChange}
        />
      </Grid>
    ));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Staff</DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={(activeStep / steps.length) * 100}
            sx={{ marginBottom: '20px' }}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Render Fields for the Current Step */}
          {renderStepFields()}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleBack} color="primary" disabled={activeStep === 0}>
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} color="primary">
            Add Staff
          </Button>
        ) : (
          <Button onClick={handleNext} color="primary">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffModal;
