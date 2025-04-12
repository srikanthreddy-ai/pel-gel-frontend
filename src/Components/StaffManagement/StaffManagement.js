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
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by Employee Code..."
                        value={searchEmpCode}
                        onChange={handleSearchChange}
                        style={{ width: '300px', marginRight: '10px' }} 
                    />
                    <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
                </div>

                <button className="btn btn-primary" onClick={handleOpenModal}>
                    Add Staff
                </button>
            </div>

            <div className="mt-3">
                {/* Pass refreshKey as a key to force re-render */}
                <EnhancedTable key={refreshKey} empCode={searchResults} />
            </div>

            <AddStaffModal open={openModal} onClose={handleCloseModal} />
        </div>
    );
};

export default StaffManagement;
