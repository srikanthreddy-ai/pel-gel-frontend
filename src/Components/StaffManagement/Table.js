import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axiosInstance from '../Utils/axiosInstance';

const headCells = [
  { id: 'empCode', label: 'Employee Code' },
  { id: 'fullName', label: 'Full Name' },
  { id: 'email', label: 'Email' },
  { id: 'designation', label: 'Designation' },
];

export default function BasicEmployeeTable({ empCode }) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(12);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch employee data when empCode changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = empCode ? `?empCode=${empCode}` : ''; // Only add empCode if provided
        const response = await axiosInstance.get(`/employeesList${query}`);
        console.log('Response data:', response.data);

        if (Array.isArray(response.data.data)) {
          const mappedData = response.data.data.map((employee) => ({
            empCode: employee.empCode,
            fullName: employee.fullName,
            email: employee.email,
            designation: employee.designation,
            department: employee.department,
            cader: employee.cader,
            pfNo: employee.pfNo,
            bankDetails: employee.bankDetails,
          }));

          setRows(mappedData);
          setTotalItems(response.data.totalItems);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Received data is not an array');
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchData();
  }, [empCode]); // Re-fetch data whenever empCode changes

  const paginatedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployee(null);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer sx={{ maxHeight: 450, overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }} aria-label="Employee Table">
          {/* Header Row */}
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="center"
                sx={{
                  backgroundColor: 'rgb(52, 58, 64)',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '12px',
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Typography variant="h6">{headCell.label}</Typography>
              </TableCell>
            ))}
          </TableRow>

          {/* Table Body */}
          <TableBody>
            {Array.isArray(paginatedRows) && paginatedRows.map((row, index) => (
              <TableRow
                hover
                key={row.empCode}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell sx={{ padding: '12px', textAlign: 'center' }}>{row.empCode}</TableCell>
                <TableCell sx={{ padding: '12px', textAlign: 'center' }}>{row.fullName}</TableCell>
                <TableCell sx={{ padding: '12px', textAlign: 'center' }}>{row.email}</TableCell>
                <TableCell sx={{ padding: '12px', textAlign: 'center' }}>{row.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[12]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        labelRowsPerPage=""
        showFirstButton={true}
        showLastButton={true}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
      />

      {/* Modal to show employee details */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee ? (
            <div>
              <Typography variant="h6">Full Name: {selectedEmployee.fullName}</Typography>
              <Typography variant="body1">Employee Code: {selectedEmployee.empCode}</Typography>
              <Typography variant="body1">Email: {selectedEmployee.email}</Typography>
              <Typography variant="body1">Designation: {selectedEmployee.designation}</Typography>
              <Typography variant="body1">Department: {selectedEmployee.department}</Typography>
              <Typography variant="body1">Cader: {selectedEmployee.cader}</Typography>
              <Typography variant="body1">PF No: {selectedEmployee.pfNo}</Typography>
              {/* Render Bank Details */}
              {selectedEmployee.bankDetails && (
                <>
                  <Typography variant="body1">Bank Name: {selectedEmployee.bankDetails.bankName}</Typography>
                  <Typography variant="body1">Account Number: {selectedEmployee.bankDetails.accountNumber}</Typography>
                  <Typography variant="body1">IFSC Code: {selectedEmployee.bankDetails.ifscCode}</Typography>
                  <Typography variant="body1">Branch: {selectedEmployee.bankDetails.branchName}</Typography>
                </>
              )}
            </div>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
