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

  const [formData, setFormData] = useState({
    productionType: "",
    manpower: 0,
    norms: 0,
    shiftHrs: 0,
    selectedDate: "", // Default to today's date
  });

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

        if (
          buildingRes.status === 200 &&
          Array.isArray(buildingRes.data?.data)
        ) {
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
    if (selectedNature || selectedShift) {
      setFormData((prev) => ({
        ...prev,
        productionType: selectedNature?.productionType || "",
        manpower: selectedNature?.manpower || 0,
        norms: selectedNature?.norms || 0,
        shiftHrs: selectedShift?.shiftHrs || 0,
      }));
    }
  }, [selectedNature, selectedShift]);

  useEffect(() => {
    // const updated = selectedCustomers.map((cust) => ({
    //   ...cust,
    //   incentive: calculateIncentive(),
    // }));
    // setSelectedCustomers(updated);
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
      const res = await axiosInstance.get(`/employeesList?empCode=${query}`);
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

  const handleCustomerSelect = (customer) => {
    const alreadySelected = selectedCustomers.some(
      (c) => c.empCode === customer.empCode
    );
    if (alreadySelected) return;

    if (selectedCustomers.length >= selectedNature.manpower) {
      alert(`You can only select up to ${formData.manpower} manpower.`);
      return;
    }

    const updatedCustomer = {
      ...customer,
      incentive: calculateIncentive(),
    };

    setSelectedCustomers([...selectedCustomers, updatedCustomer]);
    setSearchTerm("");
  };

  const handleRemoveCustomer = (empCode) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.empCode !== empCode));
  };

  const handleAddCustomer = async (emp) => {
    try {
      const payload = {
        productionDate: formData.selectedDate,
        building_id: selectedBuilding,
        nature_id: selectedNature.id,
        employee_id: emp._id,
        shift_id: selectedShift._id,
        shiftName: selectedShift.shiftName,
        shiftHrs: formData.shiftHrs,
        manpower: formData.manpower,
        employeeCode: emp.empCode,
        incentiveAmount: emp.incentive,
        productionType: selectedNature.productionType,
        norms: formData.norms,
      };
      console.log("create timesheet:", payload); // Debugging line
      await axiosInstance.post("/createTimeSheet", payload);
      setSelectedCustomers((prev) =>
        prev.map((c) =>
          c.empCode === emp.empCode ? { ...c, isAdded: true } : c
        )
      );
      toast.success("timesheed created successfully!");
    } catch (err) {
      console.error("Failed to create time sheet:", err);
      if (err.response?.data?.message?.includes("duplicate key")) {
        toast.error("Production Code already exists!");
      } else {
        toast.error(`Error: ${err.response.data.error}`);
      }
    }
  };

  // const calculateIncentive = () => {
  //   console.log("Calculating incentive...", selectedNature, selectedShift, formData.norms, formData.manpower, formData.shiftHrs);

  //   if (!formData.norms || !formData.manpower) return 0;
  //   const totalIncentive = formData.norms * 0.05;
  //   return (totalIncentive / formData.manpower).toFixed(2);
  // };
  const calculateIncentive = () => {
    const { norms, manpower, shiftHrs } = formData;

    if (!norms || !manpower || !shiftHrs) return 0;
    // ✅ If form values match the selectedNature config exactly, no incentive
    if (
      norms === selectedNature.norms &&
      manpower === selectedNature.manpower &&
      shiftHrs === selectedShift.shiftHrs
    ) {
      return 0;
    }
    console.log(
      "Calculating incentive...",
      selectedNature,
      selectedShift,
      norms,
      manpower,
      shiftHrs
    );
    let totalIncentive = 0;
    const incentives = selectedNature.incentives || [];

    if (norms < selectedNature.norms || norms > selectedNature.norms) {
      // If norms are less than or greater than the selectedNature's norms, calculate incentive
      const extraNorms = Math.abs(norms - selectedNature.norms);
      const match = incentives.find(r =>
        extraNorms >= r.min && (r.max == null || extraNorms <= r.max)
      );
      if (!match) {
        console.log("No matching incentive found for extra norms:", extraNorms);
        return 0; // No incentive if no match found
      }else {
        console.log("Matching incentive found:", match);
        const { amount, each } = match;
        const eligibleUnits = Math.floor(extraNorms / each);
        totalIncentive = eligibleUnits * amount;
        console.log("Eligible Units:", eligibleUnits, "Total Incentive:", totalIncentive);
        return totalIncentive.toFixed(2);  
      }
    }
    console.log("Incentives:", incentives);
  };

  const handleTimeSheetChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      let updatedValue =
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value;

      const updatedData = {
        ...prev,
        [name]: updatedValue,
      };

      // ✨ If the changed field is "shiftHrs", also update norms
      if (name === "shiftHrs") {
        const newNorms =
          (selectedNature.norms / selectedShift.shiftHrs) * Number(value); // Default to 0 if not set
        console.log("New Norms1:", newNorms);
        updatedData.norms = Number(newNorms) || 0; // or any logic to calculate norms based on shiftHrs
      }
      if (name === "manpower") {
        const newNorms =
          (selectedNature.norms / selectedNature.manpower) * Number(value); // Default to 0 if not set
        console.log("New Norms2:", newNorms);
        updatedData.norms = Number(newNorms) || 0; // or any logic to calculate norms based on shiftHrs
      }

      console.log("Updated Form Data:", updatedData, name);
      return updatedData;
    });
  };

  return (
    <div className="container mt-2">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-2">Timesheet Entry</h2>
      <div
        className="scrollable-form-container"
        style={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "10px",
        }}>
        {/* Building + Nature + Shift */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Production Date</label>
            <input
              name="selectedDate"
              type="date"
              className="form-control"
              onChange={handleTimeSheetChange}
              value={formData.selectedDate}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Production Building</label>
            <select
              className="form-select"
              onChange={handleBuildingChange}
              value={selectedBuilding}>
              <option value="">Select Building</option>
              {buildingsData.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Production Nature</label>
            <select
              className="form-select"
              onChange={handleNatureChange}
              value={selectedNature?.id || ""}
              disabled={!availableNatures.length}>
              <option value="">Select Nature</option>
              {availableNatures.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Production Shift</label>
            <select
              className="form-select"
              onChange={handleShiftChange}
              value={selectedShift?._id || ""}
              disabled={!availableShifts.length}>
              <option value="">Select Shift</option>
              {availableShifts
                .filter((s) => !s.isDeleted)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.shiftName}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Auto-populated Fields */}
        {selectedNature && selectedShift && (
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Production Type</label>
              <input
                className="form-control"
                value={formData.productionType}
                readOnly
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Man power</label>
              <input
                type="Number"
                className="form-control"
                name="manpower"
                onChange={handleTimeSheetChange}
                value={formData.manpower}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Norms</label>
              <input
                type="Number"
                className="form-control"
                name="norms"
                onChange={handleTimeSheetChange}
                value={formData.norms}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Shift Hr's</label>
              <input
                type="Number"
                className="form-control"
                name="shiftHrs"
                onChange={handleTimeSheetChange}
                value={formData.shiftHrs}
              />
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
                    onClick={() => handleCustomerSelect(emp)}>
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
                  <th>Add</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.fullName}</td>
                    <td>{customer.empCode}</td>
                    <td>{customer.incentive}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleAddCustomer(customer)}
                        disabled={customer.isAdded}>
                        {customer.isAdded ? "Added" : "Add"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveCustomer(customer.empCode)}
                        disabled={customer.isAdded}>
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
    </div>
  );
};

export default TimeSheetManagement;
