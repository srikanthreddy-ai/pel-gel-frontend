import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import axiosInstance from "../Utils/axiosInstance"; // Make sure axiosInstance is set up correctly

// Column headers
const headCells = [
  { id: 'buildingCode', label: 'Building Code' },
  { id: 'buildingName', label: 'Building Name' },
  { id: 'description', label: 'Description' },
  { id: 'startDate', label: 'Start Date' },
  { id: 'endDate', label: 'End Date' },
];

const EnhancedTable = ({ buildingCode }) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(12);
  const [loading, setLoading] = useState(false); // To show loading state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.get('/ProductionDept');

        // Check if the response has data and it's an array
        if (response.status === 200 && Array.isArray(response.data?.data)) {
          setRows(response.data.data); // Set rows with the data
        } else {
          setRows([]); // Empty data or no content returned
        }
      } catch (error) {
        console.error('Error fetching building category data:', error);
        setRows([]); // Handle error by setting empty rows
      } finally {
        setLoading(false); // Stop loading
      }
    };

    // Only fetch if buildingCode is provided
      fetchData();

  }, []); // Refetch data when buildingCode changes

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Handle page change
  };

  // Paginate rows based on the current page
  const paginatedRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer sx={{ maxHeight: 450, overflow: "auto" }}>
        <Table sx={{ minWidth: 750 }} aria-label="Building Category Table">
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
                {headCell.label}
              </TableCell>
            ))}
          </TableRow>

          {/* Table Body */}
          <TableBody>
            {loading ? (
              // Show a loading row if data is loading
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ padding: '12px' }}>
                  Loading data...
                </TableCell>
              </TableRow>
            ) : paginatedRows.length > 0 ? (
              // Display actual rows if data exists
              paginatedRows.map((row) => (
                <TableRow hover key={row._id}>
                  <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                    {row.buidlingCode}
                  </TableCell>
                  <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                    {row.budlingName}
                  </TableCell>
                  <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                    {row.description}
                  </TableCell>
                  <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                    {new Date(row.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ padding: '12px', textAlign: 'center' }}>
                    {new Date(row.endDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Show a message when no data is available
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ padding: '12px' }}>
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[12]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
};

export default EnhancedTable;
