import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './header.css';  
import SideNavBar from '../SideNavbar/SideNavbar';

const Header = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem('userName'); // Get email from session storage

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center p-3 text-white">
        <div className="logo d-flex ">
          <img src="./PEL.png" alt="Premier Explosives Limited"  />
          <h4 style={{marginLeft:"8px",marginTop:'8px'}}> Premier Explosives Limited</h4>
        </div>
        <div className="d-flex align-items-center mx-3">
          <h4 style={{marginTop:'8px',marginRight:'8px'}}>{email}</h4> 
          <i className="bi bi-person-circle ml-2" style={{ fontSize: '2rem' }}></i>
          <i
            className="bi bi-box-arrow-right ms-3"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => navigate('/login')}  // Navigate to login page on click
          ></i>
        </div>
      </header>

    </div>
  );
};

export default Header;
