import React from "react";

const Dashboard = () => {
  // Sample employee and production data
  const totalEmployees = 20;
  const employeesPresent = 15;
  const employeesOnLeave = totalEmployees - employeesPresent;

  const totalProduction = 500;
  const completedUnits = 350;
  const pendingUnits = totalProduction - completedUnits;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard Overview</h2>

      {/* Employee Attendance Section */}
      <div className="row mb-5">
        <h4 className="mb-3">Employee Attendance</h4>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Total Employees</h5>
              <p className="card-text fs-4">{totalEmployees}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Present Today</h5>
              <p className="card-text fs-4">{employeesPresent}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body text-center">
              <h5 className="card-title">On Leave</h5>
              <p className="card-text fs-4">{employeesOnLeave}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Section */}
      <div className="row">
        <h4 className="mb-3">Production Summary</h4>
        <div className="col-md-4 mb-3">
          <div className="card bg-light h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Total Units Planned</h5>
              <p className="card-text fs-4">{totalProduction}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Units Completed</h5>
              <p className="card-text fs-4">{completedUnits}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Pending Units</h5>
              <p className="card-text fs-4">{pendingUnits}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
