import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimeSheetList = () => {
  const [filters, setFilters] = useState({
    building: "",
    nature: "",
    shift: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  const [buildings, setBuildings] = useState([]);
  const [natures, setNatures] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [timesheets, setTimesheets] = useState([]);

  // Load building and shift options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [buildingRes, shiftRes] = await Promise.all([
          axiosInstance.get("/getNatureListByCategory"),
          axiosInstance.get("/ProductionShift"),
        ]);
        setBuildings(buildingRes.data.data);
        setShifts(shiftRes.data.data);
      } catch (err) {
        toast.error("Failed to load filter options");
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch timesheets when filters are updated
  useEffect(() => {
    const fetchTimesheets = async () => {
      console.log("Fetching timesheets with filters:", filters);
      const { building, nature, shift, date } = filters;
      if (!building || !nature || !shift || !date) return;

      try {
        const res = await axiosInstance.get("/getAllTimeSheets", {
          params: { building, nature, shift, date },
        });
        setTimesheets(res.data || []);
      } catch (err) {
        toast.error("Failed to fetch timesheets");
      }
    };

    fetchTimesheets();
  }, [filters]);

  // Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "building" && { nature: "" }), // Reset nature on building change
    }));

    // Dynamically update natures based on selected building
    if (name === "building") {
      const selectedBuilding = buildings.find((b) => b.id === value);
      setNatures(selectedBuilding?.productionNatures || []);
    }
  };

  return (
    <div className="container mt-2">
      <h3 className="mb-2">TimeSheets</h3>

      {/* 🔽 Filter Section */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Production Date</label>
          <input
            type="date"
            name="date" // 🔹 Make sure this is present!
            className="form-control"
            onChange={handleChange}
            value={filters.date}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Building</label>
          <select
            name="building"
            className="form-select"
            onChange={handleChange}
            value={filters.building}>
            <option value="">Select Building</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Nature</label>
          <select
            name="nature"
            className="form-select"
            onChange={handleChange}
            value={filters.nature}
            disabled={!filters.building}>
            <option value="">Select Nature</option>
            {natures.map((n) => (
              <option key={n.id} value={n.id}>
                {n.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Shift</label>
          <select
            name="shift"
            className="form-select"
            onChange={handleChange}
            value={filters.shift}>
            <option value="">Select Shift</option>
            {shifts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.shiftName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📋 Timesheet Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Building</th>
              <th>Nature</th>
              <th>Incentive</th>
              <th>Shift</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No data available
                </td>
              </tr>
            ) : (
              timesheets.map((t, i) => (
                <tr key={t._id}>
                  <td>{i + 1}</td>
                  <td>
                    {t.employee_id.empCode} -{t.employee_id.fullName}
                  </td>
                  <td>{t.building_id.buildingName}</td>
                  <td>{t.nature_id.productionNature}</td>
                  <td>{t.incentiveAmount}</td>
                  <td>{t.shiftName}</td>
                  <td>{new Date(t.productionDate).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TimeSheetList;
