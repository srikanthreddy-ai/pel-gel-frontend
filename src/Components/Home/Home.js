import React ,{useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './home.css';  
import SideNavBar from '../SideNavbar/SideNavbar';

import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import EmployeeManagement from '../Employees/EmployeeManagement';
import ProdDeptManagement from '../ProdCategory/ProdDeptManagement'
import ProdNatureManagement from '../ProdNature/ProdNatureManagement'
import Login from '../Login/Login';
import ReportsManagement from '../Reports/Reports'
import ProdShifts from '../ProdShifts/ShiftManagement'
import SettingsManagement from '../Settings/Settings'
import TimeSheetManagement from '../TimeSheets/TimeSheetManagement'
import WorkplansManagement from '../TimeSheets/TimeSheetList'
import AllowencesManagement from '../Allowences/AllowenceManagement'
import ProdAllowences from '../ProdAllowences/AllowencesManagement'
import BulkUploads from '../BulkUploads/BulkUpload'
const Home = () => {
    const [activeComponent, setActiveComponent] = useState('dashboard'); // Default component

  const handleNavItemClick = (component) => {
    setActiveComponent(component); // Change active component based on the clicked menu item
  };
    const renderActiveComponent = () => {
        switch (activeComponent) {
          case 'dashboard':
            return <Dashboard />;
          case 'staffmanagment':
            return <EmployeeManagement />;
          case 'prodcategory':
            return <ProdDeptManagement />;
          case 'prodnature':
            return <ProdNatureManagement />;
          case 'prodshifts':
            return <ProdShifts />;
          case 'prodallowences':
              return <ProdAllowences />;
          case 'reports':
              return <ReportsManagement />;
          case 'settings':
            return <SettingsManagement />;
          case 'timesheet':
            return <TimeSheetManagement />;
          case 'logout':
            return <Login />;
          case 'workplans':
            return <WorkplansManagement />;
          case 'allowences':
            return <AllowencesManagement />;
          case 'bulkupload':
            return <BulkUploads />;
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
