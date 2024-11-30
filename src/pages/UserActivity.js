// src/pages/UserActivityPage.js
import React, { useState } from 'react';
import api from "../components/apiConfig";

const UserActivityPage = () => {
  // Sample user sign-up data (replace with real data or API calls)
  const [userSignups, setUserSignups] = useState([
    { id: 1, signupDate: '2024-11-10' }, // Signed up today
    { id: 2, signupDate: '2024-11-05' }, // Signed up 5 days ago
    { id: 3, signupDate: '2024-10-15' }, // Signed up 1 month ago
    { id: 4, signupDate: '2024-08-01' }, // Signed up 3 months ago
    { id: 5, signupDate: '2024-05-01' }, // Signed up 6 months ago
    { id: 6, signupDate: '2024-01-01' }, // Signed up all-time
  ]);

  const timeOptions = ['Today', 'Last 7 Days', '1 Month', '3 Months', '6 Months', 'All Time'];

  const [timeFilter, setTimeFilter] = useState('Today');

  // Handle filter change
  const handleFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  // Function to filter signups based on the selected time period
  const filterSignups = (filter) => {
    const currentDate = new Date();

    return userSignups.filter((user) => {
      const signupDate = new Date(user.signupDate);
      const diffTime = currentDate - signupDate; // Difference in milliseconds

      switch (filter) {
        case 'Today':
          return signupDate.toDateString() === currentDate.toDateString(); // Same day
        case 'Last 7 Days':
          return diffTime <= 7 * 24 * 60 * 60 * 1000; // Within the last 7 days
        case '1 Month':
          return diffTime <= 30 * 24 * 60 * 60 * 1000; // Within the last 30 days
        case '3 Months':
          return diffTime <= 90 * 24 * 60 * 60 * 1000; // Within the last 90 days
        case '6 Months':
          return diffTime <= 180 * 24 * 60 * 60 * 1000; // Within the last 180 days
        case 'All Time':
          return true; // All signups
        default:
          return true;
      }
    });
  };

  // Get filtered sign-ups based on the selected filter
  const filteredSignups = filterSignups(timeFilter);

  return (
    <div className="container">
      <h1>User Activity</h1>

      {/* Filter Dropdown */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="time-filter">Filter by Time</label>
          <select
            className="form-select"
            id="time-filter"
            value={timeFilter}
            onChange={handleFilterChange}
          >
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Sign-up Count */}
      <div className="row mb-3">
        <div className="col-md-12">
          <h3>
            Total Users Signed Up: {filteredSignups.length}
          </h3>
        </div>
      </div>

      {/* Display Table for User Sign-up Data */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Sign-up Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredSignups.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.signupDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivityPage;
