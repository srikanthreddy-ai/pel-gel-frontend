import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../Utils/axiosInstance";
import Select from "react-select";
import debounce from "lodash.debounce";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";

const BulkUploads = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [uploadedFile, setUploadedFile] = useState(null);

  const [formData, setFormData] = useState({
    productionDate: new Date().toISOString().split("T")[0],
  });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        toast.error("Failed to load initial data");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-1">
      <ToastContainer />
      <ul className="nav nav-tabs mb-4">
        {["master", "employees"].map((key) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}>
              {key === "master" ? "Master Data" : "Employees"}
            </button>
          </li>
        ))}
      </ul>

      {/* General Tab */}
      {activeTab === "master" && (
        <div>
          <h4>Master Data</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex align-items-stretch gap-2">
                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timesheet Tab */}
      {activeTab === "employees" && (
        <div>
          <h4>Employees</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex align-items-stretch gap-2">
                <input
                  type="file"
                  accept=".csv"
                  className="form-control"
                  onChange={handleFileUpload}
                />
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUploads;
