import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../Utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const ReportsManagement = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const [reportType, setReportType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDownload = () => {
    if (!selectedReport || !startDate || !endDate || !reportType) {
      alert("Please select a report, report type, and date range.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff > 31) {
      alert("Date range should not exceed 31 days.");
      return;
    }

    if (dayDiff < 0) {
      alert("End date should be after start date.");
      return;
    }

    // Replace this with your download logic

    axiosInstance
      .get("/downloadReport", {
        params: {
          report: selectedReport,
          type: reportType,
          startDate: startDate,
          endDate: endDate,
        },
        responseType: "blob", // Important for file download
      })
      .then((response) => {
        toast.success(
          `Downloading ${selectedReport} report (${reportType}) from ${startDate} to ${endDate}`
        );

        const blob = new Blob([response.data]);

        if (reportType.toLowerCase() === "html") {
          // Open HTML in a new tab
          const url = window.URL.createObjectURL(response.data);
          window.open(url, "_blank");
        } else {
          // Get filename from headers or fallback
          const contentDisposition = response.headers["content-disposition"];
          let fileName = `${selectedReport}.${reportType.toLowerCase()}`;

          if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?/);
            if (match && match[1]) fileName = match[1];
          }

          // Create and click download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        }
      })
      .catch((error) => {
        console.error("Error downloading report:", error);
        toast.error("Failed to download report. Please try again.");
      });
  };

  return (
    <div className="main-content p-4">
      <ToastContainer position="top-right" autoClose={1000} />
      <h2 className="mb-4">Reports Management</h2>

      <div className="row mb-3">
        {/* Select Report */}
        <div className="col-md-6">
          <label htmlFor="reportDropdown" className="form-label">
            Select Report
          </label>
          <select
            className="form-select"
            id="reportDropdown"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}>
            <option value="">-- Choose a report --</option>
            <option value="Attendance">Attendance Report</option>
            <option value="Payroll">Monthly Payroll Report</option>
            <option value="DaywiseIncentives">
              Daywise Incentives/Allowances Report
            </option>
          </select>
        </div>

        {/* Report Type */}
        <div className="col-md-6">
          <label htmlFor="reportTypeDropdown" className="form-label">
            Report Type
          </label>
          <select
            className="form-select"
            id="reportTypeDropdown"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}>
            <option value="">-- Choose a report type --</option>
            {/* <option value="pdf">PDF</option> */}
            {/* <option value="csv">CSV</option> */}
            <option value="xlsx">Excel</option>
            <option value="html">HTML</option>
          </select>
        </div>
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
