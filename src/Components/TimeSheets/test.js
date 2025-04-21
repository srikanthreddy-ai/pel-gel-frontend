import React, { useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const TimeSheetManagement = () => {
  const [buildingsData, setBuildingsData] = useState([]);
  const [prodShifts, setProdShifts] = useState([]);

  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [availableNatures, setAvailableNatures] = useState([]);
  const [availableShifts, setAvailableShifts] = useState([]);

  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buildingRes, shiftRes] = await Promise.all([
          axiosInstance.get("/getNatureListByCategory"),
          axiosInstance.get("/ProductionShift"),
        ]);

        if (buildingRes.status === 200 && Array.isArray(buildingRes.data?.data)) {
          setBuildingsData(buildingRes.data.data);
        }

        if (shiftRes.status === 200 && Array.isArray(shiftRes.data?.data)) {
          setProdShifts(shiftRes.data.data);
          setAvailableShifts(shiftRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data.");
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const updated = selectedCustomers.map((cust) => ({
      ...cust,
      incentive: calculateIncentive(cust),
    }));
    setSelectedCustomers(updated);
  }, [formData.norms, formData.manpower]);
  
  // Debounced Customer Search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim().length > 1) {
        fetchCustomerList(searchTerm);
      } else {
        setCustomerResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const fetchCustomerList = async (query) => {
    try {
      setLoadingCustomers(true);
      const res = await axiosInstance.get(/employeesList?empCode=${query});
      if (res.status === 200 && Array.isArray(res.data?.data)) {
        setCustomerResults(res.data.data);
      } else {
        setCustomerResults([]);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      setCustomerResults([]);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleBuildingChange = (e) => {
    const buildingId = e.target.value;
    const building = buildingsData.find((b) => b.id === buildingId);
    setSelectedBuilding(buildingId);
    setAvailableNatures(building?.productionNatures || []);
    setSelectedNature(null);
  };

  const handleNatureChange = (e) => {
    const natureId = e.target.value;
    const nature = availableNatures.find((n) => n.id === natureId);
    setSelectedNature(nature);
  };

  const handleShiftChange = (e) => {
    const shiftId = e.target.value;
    const shift = prodShifts.find((s) => s._id === shiftId);
    setSelectedShift(shift || null);
  };

  // const handleCustomerSelect = (employee) => {
  //   if (!selectedCustomers.find((c) => c.empCode === employee.empCode)) {
  //     setSelectedCustomers((prev) => [...prev, employee]);
  //   }
  //   setSearchTerm("");
  //   setCustomerResults([]);
  // };

  const handleCustomerSelect = (customer) => {
    // Prevent duplicates
    const alreadySelected = selectedCustomers.some(
      (c) => c.empCode === customer.empCode
    );
    if (alreadySelected) return;
  
    // Calculate incentive
    const incentive = calculateIncentive(customer);
  
    // Add customer with incentive to the selected list
    const updatedCustomer = {
      ...customer,
      incentive,
    };
  
    setSelectedCustomers([...selectedCustomers, updatedCustomer]);
    setSearchTerm(""); // clear search input
  };

  const handleRemoveCustomer = (empCode) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.empCode !== empCode));
  };
  
  const calculateIncentive = (customer) => {
    if (!customer.manpower || !customer.norms) return 0;

    // Simple logic: total divided equally among all
    const totalIncentive = customer.norms * 0.05; // say, 5% of norms
    return totalIncentive / customer.manpower;
  };
  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4">Timesheet Entry</h2>

      {/* Row: Building + Nature + Shift */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Production Building</label>
          <select
            className="form-select"
            onChange={handleBuildingChange}
            value={selectedBuilding}
          >
            <option value="">Select Building</option>
            {buildingsData.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Production Nature</label>
          <select
            className="form-select"
            onChange={handleNatureChange}
            value={selectedNature?.id || ""}
            disabled={availableNatures.length === 0}
          >
            <option value="">Select Nature</option>
            {availableNatures.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Production Shift</label>
          <select
            className="form-select"
            onChange={handleShiftChange}
            value={selectedShift?._id || ""}
            disabled={availableShifts.length === 0}
          >
            <option value="">Select Shift</option>
            {availableShifts.map((s) => (
              <option key={s._id} value={s._id}>
                {s.shiftName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Auto-populated fields */}
      {selectedNature && selectedShift && (
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Production Type</label>
            <input className="form-control" value={selectedNature.productionType} readOnly />
          </div>
          <div className="col-md-3">
            <label className="form-label">Manpower</label>
            <input className="form-control" value={selectedNature.manpower}  />
          </div>
          <div className="col-md-3">
            <label className="form-label">Norms</label>
            <input className="form-control" value={selectedNature.norms}  />
          </div>
          <div className="col-md-3">
            <label className="form-label">Shift Hr's</label>
            <input className="form-control" value={selectedShift.shiftHrs}  />
          </div>
        </div>
      )}

      {/* Customer Search */}
      <div className="mb-3">
        <label className="form-label">Search Customer</label>
        <input
          type="text"
          className="form-control"
          placeholder="Start typing customer name..."
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

      {/* Selected Customers Table */}
      {selectedCustomers.length > 0 && (
        <div className="mt-4">
          <h5>Selected Customers</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Employee Code</th>
                <th>Incentive</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedCustomers.map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{customer.fullName}</td>
                  <td>{customer.incentive}</td>
                  <td>{customer.designation}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveCustomer(customer.empCode)}
                    >
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
  );
};

export default TimeSheetManagement; 