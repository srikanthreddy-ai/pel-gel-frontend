import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "./ProdDeleteAllowences";
import EditAllowenceModal from "./ProdUpdateAllowences";
import AddAllowence from "./ProdAddAllowences"; // Make sure this import is correct
import axiosInstance from "../Utils/axiosInstance";
import { toast, ToastContainer } from 'react-toastify';

const ProdShifts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getAllowences"); // Update with your API
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      // Check if the response has data and it's an array
      if (response.status === 200 && Array.isArray(response.data?.data)) {
        setData(response.data.data); // Set rows with the data
        toast.success("Data fetched successfully!");
      } else {
        setData([]); // Empty data or no content returned
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch data! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setOpenAdd(true); // This sets openAdd state to true when clicking "Add"
  };

  const handleEdit = (nature) => {
    setSelectedEmployee(nature); // Set the selected employee for editing
    setOpenEdit(true);
  };

  const handleDelete = (nature) => {
    setSelectedEmployee(nature);
    setOpenDelete(true);
  };

  const refreshData = () => {
    fetchData();
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row align-items-center mb-4">
        <div className="col text-center">
          <h5 className="mb-0">Production Allowences</h5>
        </div>
        <div className="col-auto ms-auto">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Allowence</th>
            <th>Shift Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No data available
              </td>
            </tr>
          ) : (
            data.map((nature, index) => (
              <tr key={nature.id || index} style={nature.isDeleted ? { backgroundColor: '#ffe6e6', color: '#a00' } : {}}>
                <td>{index + 1}</td>
                <td>{nature.allowence}</td>
                <td>{nature.shift}</td>
                <td>{nature.amount}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(nature)}>
                    Edit
                  </button>
                  {/* <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(nature)}>
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Add Modal */}
      <AddAllowence
        open={openAdd} // Show modal based on openAdd state
        onClose={() => setOpenAdd(false)} // Close the modal when triggered
        onAdded={fetchData} // callback to refresh data
      />

      {/* Edit Modal */}
      <EditAllowenceModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        employee={selectedEmployee}
        onSuccess={refreshData}
      />

      {/* Delete Modal */}
      <ConfirmDeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        employee={selectedEmployee}
        onDeleted={refreshData}
      />
    </div>
  );
};

export default ProdShifts;
