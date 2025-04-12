import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Typography
} from '@mui/material';
import axiosInstance from '../Utils/axiosInstance'; // Adjust the import path as needed
const AddCustomerModal = ({ open, onClose }) => {
  const initialFormData = {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    department: '',
    cader: '',
    empCode: '',
    designation: '',
    pfNo: '',
    basic: '',
    fda: '',
    newVda: '',
    splPay: '',
    hra: '',
    ca: '',
    sa: '',
    ea: '',
    serAllow: '',
    linkMaintQcStoresAllow: '',
    seniorityAllow: '',
    stdGrossTotal: '',
    totalGrossWithCantAb: '',
    uanNumber: '',
    sonOf: '',  // This is mapped to "S/o"
    dateOfBirth: '',
    dateOfJoining: '',
    dateOfProbation: '',
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      branchName: '',
      accountHolderName: ''
    }
  };

  const [formData, setFormData] = useState(initialFormData);

  const formFields = [
    {
      title: 'Personal Information',
      fields: [
        { name: 'title', label: 'Title', type: 'select', options: ['Mr', 'Ms', 'Mrs', 'Dr'], required: true },
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'middleName', label: 'Middle Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
      ]
    },
    {
      title: 'Employment Information',
      fields: [
        { name: 'designation', label: 'Designation', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text' },
        { name: 'cader', label: 'Cader', type: 'text', required: true },
        { name: 'empCode', label: 'Employee Code', type: 'text', required: true },
        { name: 'pfNo', label: 'PF Number', type: 'text' },
        { name: 'dateOfJoining', label: 'Date of Joining', type: 'date' },
        { name: 'dateOfProbation', label: 'Date of Probation', type: 'date' },
        { name: 'sonOf', label: 'S/o', type: 'text' } // This is the field that will show as "S/o"
      ]
    },
    {
      title: 'Salary Details',
      fields: [
        { name: 'basic', label: 'Basic', type: 'number' },
        { name: 'fda', label: 'FDA', type: 'number' },
        { name: 'newVda', label: 'New VDA', type: 'number' },
        { name: 'splPay', label: 'Special Pay', type: 'number' },
        { name: 'hra', label: 'HRA', type: 'number' },
        { name: 'ca', label: 'CA', type: 'number' },
        { name: 'sa', label: 'SA', type: 'number' },
        { name: 'ea', label: 'EA', type: 'number' },
        { name: 'serAllow', label: 'Service Allowance', type: 'number' },
        { name: 'linkMaintQcStoresAllow', label: 'Link Maint/QC/Stores Allow', type: 'number' },
        { name: 'seniorityAllow', label: 'Seniority Allowance', type: 'number' },
        { name: 'stdGrossTotal', label: 'Std. Gross Total', type: 'number' },
        { name: 'totalGrossWithCantAb', label: 'Total Gross with Cant AB', type: 'number' },
      ]
    },
    {
      title: 'Other Information',
      fields: [
        { name: 'uanNumber', label: 'UAN Number', type: 'text' },
        { name: 'bankDetails.accountNumber', label: 'Bank Account Number', type: 'text' },
        { name: 'bankDetails.ifscCode', label: 'IFSC Code', type: 'text' },
        { name: 'bankDetails.bankName', label: 'Bank Name', type: 'text' },
        { name: 'bankDetails.branchName', label: 'Branch Name', type: 'text' },
        { name: 'bankDetails.accountHolderName', label: 'Account Holder Name', type: 'text' }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Check if the field belongs to the 'bankDetails' nested object
    if (name.includes("bankDetails")) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: type === 'checkbox' ? checked : value }
      });
    } else {
      // Update state for other fields including 'sonOf'
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
      cader: formData.cader,
      empCode: formData.empCode,
      designation: formData.designation,
      pfNo: formData.pfNo,
      basic: formData.basic,
      fda: formData.fda,
      newVda: formData.newVda,
      splPay: formData.splPay,
      hra: formData.hra,
      ca: formData.ca,
      sa: formData.sa,
      ea: formData.ea,
      serAllow: formData.serAllow,
      linkMaintQcStoresAllow: formData.linkMaintQcStoresAllow,
      seniorityAllow: formData.seniorityAllow,
      stdGrossTotal: formData.stdGrossTotal,
      totalGrossWithCantAb: formData.totalGrossWithCantAb,
      uanNumber: formData.uanNumber,
      sonOf: formData.sonOf,  // Ensure the value for S/o is included
      dateOfBirth: formData.dateOfBirth,
      dateOfJoining: formData.dateOfJoining,
      dateOfProbation: formData.dateOfProbation,
      bankDetails: {
        accountNumber: formData.bankDetails.accountNumber,
        ifscCode: formData.bankDetails.ifscCode,
        bankName: formData.bankDetails.bankName,
        branchName: formData.bankDetails.branchName,
        accountHolderName: formData.bankDetails.accountHolderName
      }
    };

    console.log('Payload to send to backend:', payload);
    const response = axiosInstance.post('/employees', payload); // Adjust the endpoint as needed
    console.log('Response from backend:', response.data);
    // Reset form data
    setFormData(initialFormData);
    onClose(); // Close the modal
  };

  const renderFormFields = (fields) => {
    return fields.map((field, index) => {
      switch (field.type) {
        case 'select':
          return (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <FormControl fullWidth required={field.required}>
                <Select
                  name={field.name}
                  value={field.name.includes('bankDetails') ? formData.bankDetails[field.name.split('.')[1]] : formData[field.name]}
                  onChange={handleChange}
                  displayEmpty
                >
                  {field.options.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          );
        default:
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type === 'number' ? 'text' : field.type}
                value={field.name.includes('bankDetails') ? formData.bankDetails[field.name.split('.')[1]] : formData[field.name]}
                onChange={handleChange}
                fullWidth
                required={field.required}
                InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                  '& .Mui-focused': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              />
            </Grid>
          );
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Add Customer Data</DialogTitle>
      <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          {formFields.map((section, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {section.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                {renderFormFields(section.fields)}
              </Grid>
            </Box>
          ))}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button onClick={onClose} color="secondary" variant="contained" style={{ marginRight: 10 }}>
              Close
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
