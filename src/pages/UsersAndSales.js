// src/pages/UserAndSalesPage.js
import React, { useState } from 'react';

const UserAndSalesPage = () => {
  // Sample schedules data (you can replace it with your actual data)
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Schedule 1' },
    { id: 2, name: 'Schedule 2' },
    { id: 3, name: 'Schedule 3' },
  ]);

  // Sample user and sales data (replace with real data or API calls)
  const [userData, setUserData] = useState({
    1: { 'Today': 15, 'Last 7 Days': 100, '1 Month': 200 },
    2: { 'Today': 10, 'Last 7 Days': 70, '1 Month': 150 },
    3: { 'Today': 20, 'Last 7 Days': 150, '1 Month': 300 },
  });

  const [salesData, setSalesData] = useState({
    1: { 'Today': 500, 'Last 7 Days': 3500, '1 Month': 7000 },
    2: { 'Today': 300, 'Last 7 Days': 2100, '1 Month': 4200 },
    3: { 'Today': 600, 'Last 7 Days': 4200, '1 Month': 8400 },
  });

  const timeOptions = ['Today', 'Last 7 Days', '1 Month', '3 Months', '6 Months', 'All Time'];

  // State variables to hold the selected values
  const [userFilter, setUserFilter] = useState('Today');
  const [salesFilter, setSalesFilter] = useState('Today');

  // Handle user filter change
  const handleUserFilterChange = (event) => {
    setUserFilter(event.target.value);
  };

  // Handle sales filter change
  const handleSalesFilterChange = (event) => {
    setSalesFilter(event.target.value);
  };

  // Calculate total user and sales data for the selected filter
  const calculateUserTotal = () => {
    return schedules.reduce((total, schedule) => {
      return total + (userData[schedule.id][userFilter] || 0); // Summing based on selected filter
    }, 0);
  };

  const calculateSalesTotal = () => {
    return schedules.reduce((total, schedule) => {
      return total + (salesData[schedule.id][salesFilter] || 0); // Summing based on selected filter
    }, 0);
  };

  return (
    <div className="container">
      <h1>User and Sales Data</h1>

      {/* Filters for selecting time periods */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="user-filter">User Data</label>
          <select
            className="form-select"
            id="user-filter"
            value={userFilter}
            onChange={handleUserFilterChange}
          >
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="sales-filter">Sales Data</label>
          <select
            className="form-select"
            id="sales-filter"
            value={salesFilter}
            onChange={handleSalesFilterChange}
          >
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table to display schedules, users, and sales */}
      <table className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th scope="col" style={{ width: '40%' }}>Schedule</th>
            <th scope="col" style={{ width: '30%' }}>User Data</th>
            <th scope="col" style={{ width: '30%' }}>Sales Data</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.name}</td>
              <td>{userData[schedule.id][userFilter]}</td>
              <td>${salesData[schedule.id][salesFilter]}</td>
            </tr>
          ))}
          {/* Total Row */}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>{calculateUserTotal()}</strong></td>
            <td><strong>${calculateSalesTotal()}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserAndSalesPage;
