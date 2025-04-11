import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// Dummy data for the table
const dummyData = [
  { employeeID: 101, name: 'John Doe', mailID: 'john.doe@example.com', joiningDate: '2020-01-01' },
  { employeeID: 102, name: 'Jane Smith', mailID: 'jane.smith@example.com', joiningDate: '2021-02-15' },
  { employeeID: 103, name: 'Robert Brown', mailID: 'robert.brown@example.com', joiningDate: '2019-10-25' },
  { employeeID: 104, name: 'Alice Johnson', mailID: 'alice.johnson@example.com', joiningDate: '2018-11-13' },
  { employeeID: 105, name: 'Michael Davis', mailID: 'michael.davis@example.com', joiningDate: '2022-05-06' },
  { employeeID: 106, name: 'Emily Clark', mailID: 'emily.clark@example.com', joiningDate: '2023-03-22' },
  { employeeID: 107, name: 'David Lee', mailID: 'david.lee@example.com', joiningDate: '2017-07-30' },
  { employeeID: 108, name: 'Sophia Martinez', mailID: 'sophia.martinez@example.com', joiningDate: '2021-08-11' },
  { employeeID: 109, name: 'William Taylor', mailID: 'william.taylor@example.com', joiningDate: '2020-12-10' },
  { employeeID: 110, name: 'Emma Wilson', mailID: 'emma.wilson@example.com', joiningDate: '2021-01-05' },
  { employeeID: 111, name: 'Oliver King', mailID: 'oliver.king@example.com', joiningDate: '2022-09-17' },
  { employeeID: 112, name: 'Lucas Turner', mailID: 'lucas.turner@example.com', joiningDate: '2019-06-10' },
];

// Hardcoded column headers
const headCells = [
  { id: 'employeeID', label: 'Employee ID' },
  { id: 'name', label: 'Name' },
  { id: 'mailID', label: 'Mail ID' },
  { id: 'joiningDate', label: 'Joining Date' },
];

export default function BasicEmployeeTable() {
  const [rows, setRows] = useState([]);  // Holds the data for the table
  const [page, setPage] = useState(0);   // Tracks current page
  const [rowsPerPage] = useState(12);    // Set the default rows per page to 10

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Get the slice of dummy data for the current page
    const slicedRows = dummyData.slice(startIndex, endIndex);

    setRows(slicedRows); // Set the rows for the current page
  }, [page, rowsPerPage]);  // Re-run whenever page changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer sx={{ maxHeight: 450, overflow: 'auto' }}> {/* Increased the height to 450px */}
        <Table sx={{ minWidth: 750 }} aria-label="Employee Table">
          {/* Header Row */}
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="left"
                sx={{
                  backgroundColor: 'rgb(52, 58, 64)',  // Dark background color for header
                  color: 'white',  // White text color
                  fontWeight: 'bold',  // Bold font for the header
                  padding: '8px',  // Reduced padding for smaller height
                  position: 'sticky',  // Make header sticky
                  top: 0,  // Stick to the top of the table container
                  zIndex: 1,  // Ensure header is above the table body
                }}
              >
                <Typography variant="h6">{headCell.label}</Typography>
              </TableCell>
            ))}
          </TableRow>

          {/* Table Body */}
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                hover
                key={row.employeeID}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',  // Alternating row colors
                  '&:hover': { backgroundColor: '#e0e0e0' }, // Hover effect for rows
                }}
              >
                <TableCell sx={{ padding: '8px' }}>{row.employeeID}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.name}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.mailID}</TableCell>
                <TableCell sx={{ padding: '8px' }}>{row.joiningDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[]}  // Empty array to disable changing rows per page
        component="div"
        count={dummyData.length}  // Total number of rows
        rowsPerPage={rowsPerPage}  // Fixed number of rows per page
        page={page}  // Current page
        onPageChange={handleChangePage}  // Handle page change
      />
    </Paper>
  );
}
