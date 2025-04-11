import React, { useState } from "react";
import EnhancedTable from "./Table";
import AddStaffModal from "./AddStaffModal"; // Import the AddStaffModal component

const StaffManagement = () => {
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility

    const handleOpenModal = () => {
        setOpenModal(true); // Open modal when "Add Staff" button is clicked
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close modal
    };

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            {/* Search Bar with Search Button on the Left */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search Staff..." 
                        style={{ width: '300px', marginRight: '10px' }} 
                    />
                    <button className="btn btn-secondary">Search</button>
                </div>

                {/* Add Button on the Right */}
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    Add Staff
                </button>
            </div>

            {/* Dynamic Table */}
            <div className="mt-3">
                <EnhancedTable />
            </div>

            {/* Render the AddStaffModal component when modal state is true */}
            <AddStaffModal open={openModal} onClose={handleCloseModal} />
        </div>
    );
};

export default StaffManagement;
