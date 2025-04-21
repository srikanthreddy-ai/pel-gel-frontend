import React, { useState } from "react";

const SettingsManagement = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    defaultDepartment: "",
    enableManualEntry: true,
    overtimeAfterHours: 8,
    leaveEntitlement: 20,
    payPeriod: "Monthly",
    sendDailyReminders: true,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const tabs = [
    { key: "general", label: "General" },
    { key: "timesheet", label: "Timesheet" },
    { key: "payroll", label: "Payroll" },
    { key: "notifications", label: "Notifications" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Settings</h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* General Settings */}
      {activeTab === "general" && (
        <div>
          <div className="mb-3">
            <label className="form-label">Default Department</label>
            <input
              type="text"
              className="form-control"
              name="defaultDepartment"
              value={settings.defaultDepartment}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Working Days</label>
            <div>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div className="form-check form-check-inline" key={day}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={day}
                    checked={settings.workingDays.includes(day)}
                    onChange={() => {
                      const updatedDays = settings.workingDays.includes(day)
                        ? settings.workingDays.filter((d) => d !== day)
                        : [...settings.workingDays, day];
                      setSettings((prev) => ({ ...prev, workingDays: updatedDays }));
                    }}
                  />
                  <label className="form-check-label" htmlFor={day}>
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Timesheet Settings */}
      {activeTab === "timesheet" && (
        <div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="enableManualEntry"
              checked={settings.enableManualEntry}
              onChange={handleChange}
              id="manualEntry"
            />
            <label className="form-check-label" htmlFor="manualEntry">
              Enable Manual Time Entry
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Overtime Starts After (Hours)</label>
            <input
              type="number"
              className="form-control"
              name="overtimeAfterHours"
              value={settings.overtimeAfterHours}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {/* Payroll Settings */}
      {activeTab === "payroll" && (
        <div>
          <div className="mb-3">
            <label className="form-label">Leave Entitlement (Days)</label>
            <input
              type="number"
              className="form-control"
              name="leaveEntitlement"
              value={settings.leaveEntitlement}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pay Period</label>
            <select
              className="form-select"
              name="payPeriod"
              value={settings.payPeriod}
              onChange={handleChange}
            >
              <option>Weekly</option>
              <option>Biweekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === "notifications" && (
        <div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="sendDailyReminders"
              checked={settings.sendDailyReminders}
              onChange={handleChange}
              id="dailyReminders"
            />
            <label className="form-check-label" htmlFor="dailyReminders">
              Send Daily Timesheet Reminders
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManagement;
