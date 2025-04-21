import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidenavbar.css'; // Optional for custom styling

const SideNavBar = ({ onNavItemClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderNavItem = (icon, label, onClick) => (
    <li className="nav-item mb-2">
      <button
        className="nav-link text-white nav-btn"
        onClick={onClick}
      >
        <i className={`bi ${icon} me-2`}></i> {label}
      </button>
    </li>
  );

  return (
    <aside
      className="sidenav d-flex flex-column text-white"
      style={{
        position: 'fixed',
        top: '82px',
        left: 0,
        bottom: 0,
        width: '255px',
        backgroundColor: '#343a40',
        padding: '1rem',
        zIndex: 999,
        overflowY: 'auto',
      }}
    >
      <ul className="nav flex-column">
        {renderNavItem('bi-house-door', 'Dashboard', () => onNavItemClick('dashboard'))}
        {renderNavItem('bi-clock-history', 'Timesheet', () => onNavItemClick('timesheet'))}
        {renderNavItem('bi-cash-stack', 'Allowance', () => onNavItemClick('timesheet'))}
        {renderNavItem('bi-people-fill', 'Employee Management', () => onNavItemClick('staffmanagment'))}
        {renderNavItem('bi-bar-chart-line', 'Reports', () => onNavItemClick('reports'))}

        {/* Master Data */}
        <li className="nav-item mb-2">
          <button
            className="nav-link text-white nav-btn d-flex align-items-center"
            onClick={toggleDropdown}
          >
            <i className="bi bi-database me-2"></i>
            Master Data
            <i className={`bi ms-auto ${isDropdownOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
          </button>

          {isDropdownOpen && (
            <ul className="nav flex-column ms-3 mt-2">
              {renderNavItem('bi-database-add', 'Prod Category', () => onNavItemClick('prodcategory'))}
              {renderNavItem('bi-clipboard-data', 'Prod Nature', () => onNavItemClick('prodnature'))}
              {renderNavItem('bi-clipboard-data', 'Prod Shift', () => onNavItemClick('prodshifts'))}
            </ul>
          )}
        </li>

        {renderNavItem('bi-gear', 'Settings', () => onNavItemClick('settings'))}

        {/* Log Out */}
        <li className="nav-item mt-3">
          <Link to="/login" className="nav-link text-white nav-btn">
            <i className="bi bi-box-arrow-right me-2"></i> Log Out
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNavBar;
