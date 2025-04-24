import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../Utils/axiosInstance";

const AllowencesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prodShifts, setProdShifts] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [availableAllowances, setAvailableAllowances] = useState([]);
  const [selectedAllowance, setSelectedAllowance] = useState("");
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customerResults, setCustomerResults] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shiftRes, allowanceRes] = await Promise.all([
          axiosInstance.get("/ProductionShift"),
          axiosInstance.get("/getAllowences"), // ✅ Assuming this is your endpoint
        ]);

        if (shiftRes.status === 200 && Array.isArray(shiftRes.data?.data)) {
          setProdShifts(shiftRes.data.data);
          setAvailableShifts(shiftRes.data.data);
        }

        if (allowanceRes.status === 200 && Array.isArray(allowanceRes.data?.data)) {
          setAvailableAllowances(allowanceRes.data.data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  const handleShiftChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (opt) => opt.value);
    const selected = availableShifts.filter((s) => selectedIds.includes(s._id));
    setSelectedShifts(selected);
  };

  const handleAllowanceChange = (e) => {
    setSelectedAllowance(e.target.value);
  };

  const handleCustomerSelect = (customer) => {
    const alreadySelected = selectedCustomers.some(
      (c) => c.empCode === customer.empCode
    );
    if (alreadySelected) return;
    setSelectedCustomers((prev) => [...prev, customer]);
    setSearchTerm("");
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-3">Allowances Management</h2>

      <div
        className="scrollable-form-container"
        style={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "10px",
        }}
      >
        {/* Multi-Select Production Shifts */}
        <div className="mb-3 col-md-4">
          <label className="form-label">Production Shifts</label>
          <select
            className="form-select"
            multiple
            onChange={handleShiftChange}
            value={selectedShifts.map((s) => s._id)}
            disabled={!availableShifts.length}
          >
            {availableShifts
              .filter((s) => !s.isDeleted)
              .map((s) => (
                <option key={s._id} value={s._id}>
                  {s.shiftName}
                </option>
              ))}
          </select>
        </div>

        {/* Allowance Dropdown */}
        <div className="mb-3 col-md-4">
          <label className="form-label">Select Allowance</label>
          <select
            className="form-select"
            onChange={handleAllowanceChange}
            value={selectedAllowance}
            disabled={!availableAllowances.length}
          >
            <option value="">Select Allowance</option>
            {availableAllowances.map((a) => (
              <option key={a._id} value={a._id}>
                {a.allowence}
              </option>
            ))}
          </select>
        </div>

        {/* Summary */}
        {(selectedShifts.length > 0 || selectedAllowance) && (
          <div className="mb-3 col-md-12">
            <strong>Selected:</strong>
            <ul>
              {selectedShifts.map((shift) => (
                <li key={shift._id}>Shift: {shift.shiftName}</li>
              ))}
              {selectedAllowance && (
                <li>
                  Allowance:{" "}
                  {
                    availableAllowances.find((a) => a._id === selectedAllowance)
                      ?.allowence
                  }
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Customer Search */}
        <div className="mb-3 col-md-6">
          <label className="form-label">Search Customer</label>
          <input
            type="text"
            className="form-control"
            placeholder="Start typing employee code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ul className="list-group mt-1">
              {loadingCustomers ? (
                <li className="list-group-item">Searching...</li>
              ) : customerResults.length ? (
                customerResults.map((emp, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCustomerSelect(emp)}
                  >
                    {emp.fullName}
                  </li>
                ))
              ) : (
                <li className="list-group-item">No customer found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllowencesManagement;
