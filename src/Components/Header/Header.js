import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './header.css';  

const Header = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userName');

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session if needed
    navigate('/login');
  };

  return (
    <header className="header d-flex justify-content-between align-items-center p-3 text-white">
      <div className="logo d-flex align-items-center">
        <img src="/PEL.png" alt="Premier Explosives Limited" className="logo-img" />
        <h4 className="ms-2 mt-2">Premier Explosives Limited</h4>
      </div>

      <div className="user-info d-flex align-items-center mx-3">
        <h5 className="mb-0 me-3">{email || "Guest"}</h5>
        <i className="bi bi-person-circle" style={{ fontSize: '2rem' }}></i>
        {/* <i
          className="bi bi-box-arrow-right ms-3"
          style={{ fontSize: '2rem', cursor: 'pointer' }}
          onClick={handleLogout}
          title="Logout"
        ></i> */}
      </div>
    </header>
  );
};

export default Header;
