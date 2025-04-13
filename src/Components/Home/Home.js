import React ,{useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './home.css';  
import SideNavBar from '../SideNavbar/SideNavbar';

import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import StaffManagement from '../StaffManagement/StaffManagement';
import BuildingCategoryManagement from '../BuildingCategory/BuildingCategoryManagement'
import Login from '../Login/Login';
const Home = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard'); // Default component

  const handleNavItemClick = (component) => {
    setActiveComponent(component); // Change active component based on the clicked menu item
  };
    const renderActiveComponent = () => {
        switch (activeComponent) {
          case 'dashboard':
            return <Dashboard />;
        //   case 'staff':
        //     return <Staff />;
          case 'staffmanagment':
            return <StaffManagement />;
          case 'category':
            return <BuildingCategoryManagement />;
        //   case 'subcategory':
        //     return <SubCategory />;
        //   case 'settings':
        //     return <Settings />;
          case 'logout':
            return <Login />;
          default:
            return <Dashboard />;
        }
      };
    

  return (
    <div>  
    <Header/>
      <div className="content">
    <div className='row' style={{width:'101%'}}>
        <div className="col-md-2">
        <SideNavBar onNavItemClick={handleNavItemClick}/>
        </div>
        <div className="col-md-10">
            <div className="card shadow-dark" style={{height:'85vh',borderRadius:'10px'}}>
                    <div>
                    {/* <div className="container" style={{ marginLeft: '250px', overflowX: 'hidden',height: '75vh' }}> */}
                      {renderActiveComponent()}
                    {/* </div> */}

                </div>
            </div>
        </div>
    </div>
      </div>
    </div>
  );
};

export default Home;
