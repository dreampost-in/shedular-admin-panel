import React, { useState } from 'react';

const MutualTransferPage = () => {
  // Sample data for mutual transfer requests (you can replace this with real data or API calls)
  const [transferRequests, setTransferRequests] = useState([
    { id: 1, department: 'SSC', requestDate: '2024-11-10' },
    { id: 2, department: 'RRB', requestDate: '2024-11-05' },
    { id: 3, department: 'Banking', requestDate: '2024-10-15' },
    { id: 4, department: 'SSC', requestDate: '2024-08-01' },
    { id: 5, department: 'RRB', requestDate: '2024-05-01' },
    { id: 6, department: 'Banking', requestDate: '2024-01-01' },
  ]);

  const departmentOptions = ['SSC', 'RRB', 'Banking'];
  const timeOptions = ['Today', 'Last 7 Days', '1 Month', '3 Months', '6 Months', 'All Time'];

  const [selectedDepartment, setSelectedDepartment] = useState('SSC');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('Today');

  // Handle filter changes
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleTimeFilterChange = (event) => {
    setSelectedTimeFilter(event.target.value);
  };

  // Function to filter transfer requests based on department and date range
  const filterTransferRequests = (department, filter) => {
    const currentDate = new Date();

    return transferRequests.filter((request) => {
      const requestDate = new Date(request.requestDate);
      const diffTime = currentDate - requestDate; // Difference in milliseconds

      // Filter by department
      if (request.department !== department && department !== 'All') {
        return false;
      }

      // Filter by date range
      switch (filter) {
        case 'Today':
          return requestDate.toDateString() === currentDate.toDateString(); // Same day
        case 'Last 7 Days':
          return diffTime <= 7 * 24 * 60 * 60 * 1000; // Within the last 7 days
        case '1 Month':
          return diffTime <= 30 * 24 * 60 * 60 * 1000; // Within the last 30 days
        case '3 Months':
          return diffTime <= 90 * 24 * 60 * 60 * 1000; // Within the last 90 days
        case '6 Months':
          return diffTime <= 180 * 24 * 60 * 60 * 1000; // Within the last 180 days
        case 'All Time':
          return true; // All requests
        default:
          return true;
      }
    });
  };

  // Get filtered requests based on department and time filter
  const filteredRequests = filterTransferRequests(selectedDepartment, selectedTimeFilter);

  return (
    <div className="container">
      <h1>Mutual Transfer Page</h1>

      {/* Filters for department and time */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="department-filter">Department</label>
          <select
            className="form-select"
            id="department-filter"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="SSC">SSC</option>
            <option value="RRB">RRB</option>
            <option value="Banking">Banking</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="time-filter">Time Period</label>
          <select
            className="form-select"
            id="time-filter"
            value={selectedTimeFilter}
            onChange={handleTimeFilterChange}
          >
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Total Matches */}
      <div className="row mb-3">
        <div className="col-md-12">
          <h3>Total Matches: {filteredRequests.length}</h3>
        </div>
      </div>

      {/* Table to Display Filtered Transfer Requests */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Request ID</th>
            <th scope="col">Department</th>
            <th scope="col">Request Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.department}</td>
              <td>{request.requestDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MutualTransferPage;
