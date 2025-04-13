import React, { useState } from "react";
import EnhancedTable from "./BuildingCategoryTable"; // The table component for displaying building data
import AddAssemblyLineModal from './AddBuilding' // Modal component to add new building category

const BuildingCategoryManagement = () => {
    const [openModal, setOpenModal] = useState(false); // Modal visibility state
    const [searchBuildingCode, setSearchBuildingCode] = useState(""); // State for search input
    const [searchResults, setSearchResults] = useState(""); // Store search results for building code
    const [refreshKey, setRefreshKey] = useState(0); // Key for forcing table re-render when needed

    // Opens the modal to add a new building category
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Closes the modal and refreshes the table
    const handleCloseModal = () => {
        setOpenModal(false);
        setRefreshKey((prev) => prev + 1); // Trigger a re-render of the table after closing the modal
    };

    // Updates the search term for building code
    const handleSearchChange = (event) => {
        setSearchBuildingCode(event.target.value);
    };

    // Initiates the search when the search button is clicked
    const handleSearch = () => {
        setSearchResults(searchBuildingCode); // Sets the search result to the building code
    };

    return (
        <div className="container" style={{ paddingTop: '20px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Search input and button */}
                <div className="d-flex align-items-center">
                    </div>

                {/* Button to open Add Building Category modal */}
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    Add Building Category
                </button>
            </div>

            <div className="mt-3">
                {/* Pass the refreshKey to force re-render */}
                <EnhancedTable key={refreshKey} buildingCode={searchResults} />
            </div>

            {/* Add Building Category Modal */}
            <AddAssemblyLineModal open={openModal} onClose={handleCloseModal} />
</div>
    );
};

export default BuildingCategoryManagement;
