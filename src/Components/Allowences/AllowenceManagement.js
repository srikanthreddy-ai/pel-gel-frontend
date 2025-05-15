import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../Utils/axiosInstance";
import Select from "react-select";
import debounce from "lodash.debounce";
import "react-toastify/dist/ReactToastify.css";

const AllowancesManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allowanceTerm, setAllowanceTerm] = useState("");
  const [prodShifts, setProdShifts] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [availableAllowances, setAvailableAllowances] = useState([]);
  const [selectedAllowance, setSelectedAllowance] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [allowanceResults, setAllowanceResults] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedAllowances, setSelectedAllowances] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingAllowance, setLoadingAllowance] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    productionDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shiftRes, allowanceRes] = await Promise.all([
          axiosInstance.get("/ProductionShift"),
          axiosInstance.get("/getAllowences"),
        ]);

        if (Array.isArray(shiftRes.data?.data)) {
          setProdShifts(shiftRes.data.data);
        }
        if (Array.isArray(allowanceRes.data?.data)) {
          setAvailableAllowances(allowanceRes.data.data);
        }
      } catch (error) {
        toast.error("Failed to load initial data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const searchCustomers = useCallback(
    debounce(async (term) => {
      try {
        setLoadingCustomers(true);
        const res = await axiosInstance.get(`/employeesList?empCode=${term}`);
        setCustomerResults(res.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCustomers(false);
      }
    }, 500),
    []
  );

  const searchAllowances = useCallback(
    debounce(async (term) => {
      try {
        setLoadingAllowance(true);
        const res = await axiosInstance.get(
          `/getEmpAllowences?empCode=${term}&productionDate=${formData.productionDate}`
        );
        setAllowanceResults(res.data?.data || []);
        console.log(res.data?.data,  allowanceResults);
        // setSelectedAllowances(res.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingAllowance(false);
      }
    }, 500),
    [formData.productionDate]
  );

  useEffect(() => {
    if (searchTerm.length > 2) searchCustomers(searchTerm);
    else setCustomerResults([]);

    if (allowanceTerm.length > 2) searchAllowances(allowanceTerm);
    else setAllowanceResults([]);
  }, [searchTerm, allowanceTerm, searchCustomers, searchAllowances]);

  const shiftOptions = prodShifts
    .filter((shift) => !shift.isDeleted)
    .map((shift) => ({
      value: shift._id,
      label: shift.shiftName,
    }));

  const handleShiftChange = (selected) => setSelectedShifts(selected || []);
  const handleAllowanceChange = (e) => setSelectedAllowance(e.target.value);

  const handleCustomerSelect = (customer) => {
    if (
      selectedCustomers.some((c) => c.empCode === customer.empCode) ||
      !selectedAllowance ||
      selectedShifts.length === 0
    ) {
      toast.warning("Select allowance and shifts before assigning");
      return;
    }

    const allowance = availableAllowances.find(
      (a) => a._id === selectedAllowance
    );

    const totalAmount = selectedShifts.length * allowance.amount;

    const newCustomer = {
      ...customer,
      allowance: totalAmount,
      isAdded: false,
    };

    setSelectedCustomers((prev) => [...prev, newCustomer]);
    setSearchTerm("");
  };

  const handleAddCustomer = async (customer) => {
    const payload = {
      productionDate: formData.productionDate,
      shifts: selectedShifts.map((s) => s.value),
      allowance_id: selectedAllowance,
      employee_id: customer._id,
      empCode: customer.empCode,
      amount: customer.allowance,
    };

    try {
      await axiosInstance.post("/createEmpAllowence", payload);
      toast.success("Allowance added successfully!");

      // Mark as added
      setSelectedCustomers((prev) =>
        prev.map((c) =>
          c.empCode === customer.empCode ? { ...c, isAdded: true } : c
        )
      );
    } catch (error) {
      toast.error("Failed to add allowance");
      console.error(error);
    }
  };

  const handleRemoveCustomer = (empCode) =>
    setSelectedCustomers((prev) => prev.filter((c) => c.empCode !== empCode));

  const handleTimeSheetChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleViewSelect = (customer) => {
    setSelectedAllowances([customer]);
    setAllowanceTerm("");
  };

  return (
    <div className="container mt-1">
      <ToastContainer />
      <ul className="nav nav-tabs mb-4">
        {["general", "timesheet"].map((key) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}>
              {key === "general" ? "New Allowance" : "View Allowance"}
            </button>
          </li>
        ))}
      </ul>

      {/* General Tab */}
      {activeTab === "general" && (
        <div>
          <h4>Add New Allowance</h4>
          <div className="row">
            <div className="col-md-3">
              <label>Production Date</label>
              <input
                name="productionDate"
                type="date"
                className="form-control"
                value={formData.productionDate}
                onChange={handleTimeSheetChange}
              />
            </div>
            <div className="col-md-4">
              <label>Production Shifts</label>
              <Select
                isMulti
                options={shiftOptions}
                value={selectedShifts}
                onChange={handleShiftChange}
              />
            </div>
            <div className="col-md-4">
              <label>Select Allowance</label>
              <select
                className="form-select"
                value={selectedAllowance}
                onChange={handleAllowanceChange}>
                <option value="">Select Allowance</option>
                {availableAllowances.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.allowence}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 col-md-6">
            <label>Search Customer</label>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              placeholder="Search by employee code"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <ul className="list-group mt-1">
                {loadingCustomers ? (
                  <li className="list-group-item">Loading...</li>
                ) : customerResults.length ? (
                  customerResults.map((emp) => (
                    <li
                      key={emp.empCode}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleCustomerSelect(emp)}>
                      {emp.fullName}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No results</li>
                )}
              </ul>
            )}
          </div>

          {/* Selected Customers Table */}
          {selectedCustomers.length > 0 && (
            <div className="mt-4">
              <h5>Selected Customers</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Emp Code</th>
                    <th>Allowance</th>
                    <th>Add</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomers.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.fullName}</td>
                      <td>{c.empCode}</td>
                      <td>{c.allowance}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAddCustomer(c)}
                          disabled={c.isAdded}>
                          {c.isAdded ? "Added" : "Add"}
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveCustomer(c.empCode)}
                          disabled={c.isAdded}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Timesheet Tab */}
      {activeTab === "timesheet" && (
        <div>
          <h4>View Allowance</h4>
          <div className="row">
            <div className="col-md-3">
              <label>Production Date</label>
              <input
                name="productionDate"
                type="date"
                className="form-control"
                value={formData.productionDate}
                onChange={handleTimeSheetChange}
              />
            </div>
            <div className="col-md-6">
              <label>Search Employee</label>
              <input
                type="text"
                className="form-control"
                value={allowanceTerm}
                onChange={(e) => setAllowanceTerm(e.target.value)}
                placeholder="Enter employee code..."
              />
              {allowanceTerm && (
                <ul className="list-group mt-1">
                  {loadingAllowance ? (
                    <li className="list-group-item">Loading...</li>
                  ) : allowanceResults.length ? (
                    allowanceResults.map((emp, i) => (
                      <li
                        key={i}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleViewSelect(emp)}>
                        {emp.empCode}-{emp.employee_id?.fullName}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">No results found</li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {selectedAllowances.length > 0 && (
            <div className="mt-4">
              <h5>Allowance Details</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Allowance</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAllowances.map((c, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{c.employee_id.fullName}</td>
                      <td>{c.empCode}</td>
                      <td>{c.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllowancesManagement;
