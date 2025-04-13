import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons import
import { Link } from 'react-router-dom';
const SideNavBar = ({ onNavItemClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Toggle dropdown open/close state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="sidenav d-flex flex-column p-3 text-white"
      style={{
        position: 'fixed',
        top: '82px', // Ensure it's not overlapping with header
        left: 0,
        bottom: 0,
        width: '255px',
        backgroundColor: '#343a40', // Dark background for sidebar
        paddingTop: '20px',
        zIndex: 999,
      }}
    >
      <ul className="nav flex-column">
        {/* Dashboard Item */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={() => onNavItemClick('dashboard')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-house-door me-2"></i> Dashboard
          </button>
        </li>

        {/* Staff Item */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={() => onNavItemClick('staff')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-person-lines-fill me-2"></i> Timesheet
          </button>
        </li>

        {/* Staff Management Item */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={() => onNavItemClick('staffmanagment')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-person-lines-fill me-2"></i> Employee
          </button>
        </li>
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={() => onNavItemClick('staffmanagment')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-person-lines-fill me-2"></i> Reports
          </button>
        </li>
        {/* Master Data Dropdown */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={toggleDropdown}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
          >
            <i className="bi bi-database me-2"></i> Master Data
          </button>

          {/* Dropdown Items */}
          <div className={`collapse ${isDropdownOpen ? 'show' : ''}`} id="masterDataDropdown">
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => onNavItemClick('category')}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <i className="bi bi-database-add me-2"></i> Building Category
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => onNavItemClick('subcategory')}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <i className="bi bi-clipboard-data me-2"></i> Prod Nature
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link text-white"
                  onClick={() => onNavItemClick('Shift')}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  <i className="bi bi-clipboard-data me-2"></i> Shift
                </button>
              </li>
            </ul>
          </div>
        </li>

        {/* Settings Item */}
        <li className="nav-item mb-3">
          <button
            className="nav-link text-white"
            onClick={() => onNavItemClick('settings')}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            <i className="bi bi-gear me-2"></i> Settings
          </button>
        </li>

        {/* Log Out Item */}
        <li className="nav-item mb-3">
          <Link to="/login" className="nav-link text-white">
            <i className="bi bi-box-arrow-right me-2"></i> Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
