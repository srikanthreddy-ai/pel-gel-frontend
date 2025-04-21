import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ReportsManagement = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    if (!selectedReport || !startDate || !endDate) {
      alert("Please select a report and date range.");
      return;
    }
    // Replace this with your download logic
    alert(`Downloading ${selectedReport} report from ${startDate} to ${endDate}`);
  };

  return (
    <div className="main-content p-4" style={{ marginLeft: '150px' }}>
      <h2 className="mb-4">Reports Management</h2>
  
      {/* Report Selection Dropdown */}
      <div className="mb-3">
        <label htmlFor="reportDropdown" className="form-label">Select Report</label>
        <select
          className="form-select"
          id="reportDropdown"
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
        >
          <option value="">-- Choose a report --</option>
          <option value="Attendance">Attendance Report</option>
          <option value="Leave">Leave Report</option>
          <option value="Payroll">Payroll Report</option>
        </select>
      </div>
  
      {/* Date Range Selection */}
      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
  
      {/* Download Button */}
      <button className="btn btn-primary" onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
  
};

export default ReportsManagement;
