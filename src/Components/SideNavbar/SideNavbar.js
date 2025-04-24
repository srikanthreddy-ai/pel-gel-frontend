import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidenavbar.css'; // Custom styles (optional)

const SideNavBar = ({ onNavItemClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (section) => {
    setOpenDropdown((prev) => (prev === section ? null : section));
  };

  const renderNavItem = (icon, label, onClick) => (
    <li className="nav-item mb-2">
      <button className="nav-link text-white nav-btn" onClick={onClick}>
        <i className={`bi ${icon} me-2`}></i> {label}
      </button>
    </li>
  );

  const renderDropdown = (title, icon, sectionKey, items) => (
    <li className="nav-item mb-2">
      <button
        className="nav-link text-white nav-btn d-flex align-items-center"
        onClick={() => toggleDropdown(sectionKey)}
        aria-expanded={openDropdown === sectionKey}
      >
        <i className={`bi ${icon} me-2`}></i>
        {title}
        <i className={`bi ms-auto ${openDropdown === sectionKey ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
      </button>

      {openDropdown === sectionKey && (
        <ul className="nav flex-column ms-3 mt-2">
          {items.map(({ icon, label, key }) =>
            renderNavItem(icon, label, () => onNavItemClick(key))
          )}
        </ul>
      )}
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

        {renderDropdown('TimeSheet', 'bi-database', 'timesheet', [
          { icon: 'bi-database-add', label: 'Timesheet Entry', key: 'timesheet' },
          { icon: 'bi-database-add', label: 'workPlans', key: 'workplans' },
          { icon: 'bi-clipboard-data', label: 'Allowances', key: 'allowences' },
        ])}

        {renderNavItem('bi-people-fill', 'Staff Management', () => onNavItemClick('staffmanagment'))}
        {renderNavItem('bi-bar-chart-line', 'Reports', () => onNavItemClick('reports'))}

        {renderDropdown('Master Data', 'bi-database', 'masterdata', [
          { icon: 'bi-database-add', label: 'Prod Category', key: 'prodcategory' },
          { icon: 'bi-clipboard-data', label: 'Prod Nature', key: 'prodnature' },
          { icon: 'bi-clipboard-data', label: 'Prod Shift', key: 'prodshifts' },
          { icon: 'bi-clipboard-data', label: 'Prod Allowences', key: 'prodallowences' },
        ])}

        {renderNavItem('bi-gear', 'Settings', () => onNavItemClick('settings'))}

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
