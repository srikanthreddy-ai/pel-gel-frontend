import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "./DeleteEmployee";
import EditEmployeeModal from "./UpdateNewEmloyee";
import AddEmployee from "./AddEmployee"; // Make sure this import is correct
import axiosInstance from "../Utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import Papa from "papaparse";

const EmployeeManagement = ({ handleOpenModal }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchEmpCode, setSearchEmpCode] = useState(""); // Search input
  const [searchResults, setSearchResults] = useState(); // Search results
  const [uploadedFile, setUploadedFile] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/employeesList"); // Update with your API
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      // Check if the response has data and it's an array
      if (response.status === 200 && Array.isArray(response.data?.data)) {
        setData(response.data.data); // Set rows with the data
        toast.success("Data fetched successfully!");
      } else {
        setData([]);
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
  const handleUpload = () => {
    if (!uploadedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);

    fetch("/api/employees/bulk-upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upload success:", data);
        alert("File uploaded successfully");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert("Upload failed. Please try again.");
      });
  };

  const handleSearchChange = async (event) => {
    setSearchEmpCode(event.target.value);
  };

  const handleEdit = (nature) => {
    setSelectedEmployee(nature); // Set the selected employee for editing
    setOpenEdit(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // setEmployeeData(results.data);
          console.log("Parsed CSV:", results.data);
          // You can now send results.data to your API for bulk upload
        },
        error: (err) => {
          console.error("CSV Parsing Error:", err);
        },
      });
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDelete = (nature) => {
    setSelectedEmployee(nature);
    setOpenDelete(true);
  };

  const handleSearch = async () => {
    setSearchResults(searchEmpCode);
    try {
      const response = await axiosInstance.get(
        `/employeesList?empCode=${searchEmpCode}`
      ); // Update with your API
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      // Check if the response has data and it's an array
      if (response.status === 200 && Array.isArray(response.data?.data)) {
        setData(response.data.data); // Set rows with the data
        toast.success("Data fetched successfully!");
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch data! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="bottom-right" autoClose={1000} />
      <div className="row align-items-center mb-4">
        <div className="col-md-4 mb-2 mb-md-0">
          <div className="d-flex flex-column flex-md-row align-items-stretch">
            <input
              type="text"
              className="form-control me-md-2 mb-2 mb-md-0"
              placeholder="Search by Employee Code..."
              value={searchEmpCode}
              onChange={handleSearchChange}
            />
            <button className="btn btn-secondary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="col-md-8 d-flex flex-column flex-md-row align-items-stretch justify-content-end gap-2">
          <div className="col-md-6">
            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={handleFileUpload}
            />
          </div>
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
          <button className="btn btn-primary" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
      <div
        className="table-scroll-container"
        style={{ maxHeight: "500px", overflowY: "auto" }}>
        <table className="table table-bordered table-hover">
          <thead
            className="table-dark"
            style={{
              position: "sticky",
              top: "0",
              background: "#343a40",
              color: "white",
              zIndex: "1",
            }}>
            <tr>
              <th>#</th>
              <th>Employee Code</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Actions</th>
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
                <tr key={nature.id || index}>
                  <td>{index + 1}</td>
                  <td>{nature.empCode}</td>
                  <td>{nature.fullName}</td>
                  <td>{nature.designation}</td>
                  <td>{nature.department}</td>
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
      </div>

      {/* Add Modal */}
      <AddEmployee
        open={openAdd} // Show modal based on openAdd state
        onClose={() => setOpenAdd(false)} // Close the modal when triggered
        onAdded={fetchData} // callback to refresh data
      />

      {/* Edit Modal */}
      <EditEmployeeModal
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

export default EmployeeManagement;
