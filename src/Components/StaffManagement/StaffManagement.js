import React, { useState } from "react";
import EnhancedTable from "./Table";
import AddStaffModal from "./AddStaffModal"; // Import the AddStaffModal component

const StaffManagement = () => {
    const [openModal, setOpenModal] = useState(false); // Modal visibility
    const [searchEmpCode, setSearchEmpCode] = useState(""); // Search input
    const [searchResults, setSearchResults] = useState(); // Search results
    const [refreshKey, setRefreshKey] = useState(0); // Force re-render key

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setRefreshKey(prev => prev + 1); // Trigger table refresh
    };

    const handleSearchChange = (event) => {
        setSearchEmpCode(event.target.value); 
    };

    const handleSearch = () => {
        setSearchResults(searchEmpCode); 
        console.log("Search Results:", searchResults); 
    };

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
          <div className="row align-items-center mb-3">
            {/* Search Section */}
            <div className="col-md-6 mb-2 mb-md-0">
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
      
            {/* Add Button */}
            <div className="col-md-2 text-md-end">
              <button className="btn btn-primary w-100 w-md-auto" onClick={handleOpenModal}>
                Add
              </button>
            </div>
          </div>
      
          {/* Table Section */}
          <div className="mt-3">
            <EnhancedTable key={refreshKey} empCode={searchResults} />
          </div>
      
          {/* Modal for Adding Staff */}
          <AddStaffModal open={openModal} onClose={handleCloseModal} />
        </div>
      );
      
};

export default StaffManagement;
