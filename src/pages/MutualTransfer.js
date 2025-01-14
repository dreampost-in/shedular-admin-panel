import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig";  // API configuration to make requests to the server

const MutualTransferPage = () => {
  // State for storing the fetched transfer requests
  const [transferRequests, setTransferRequests] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Filter
  const [selectedDepartment, setSelectedDepartment] = useState('SSC');

  const departmentOptions = ['SSC', 'RRB', 'Banking'];

  // Fetch transfer requests from the server
  useEffect(() => {
    const fetchTransferRequests = async () => {
      try {
        const response = await api.get('/admin/mutual-transfers');
        console.log(response.data);
        setTransferRequests(response.data);
      } catch (error) {
        console.error("Error fetching transfer requests:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };
    fetchTransferRequests();
  }, []);

  // Handle department filter change
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // Get filtered requests based on department
  const filteredRequests = transferRequests.filter((request) => {
    return request.matches && request.matches.some((match) => {
      // Check if either userRecord or potentialMatch has the selected department
      return match.userRecord.selectedGoal === selectedDepartment || match.potentialMatch.selectedGoal === selectedDepartment;
    });
  });

  console.log(filteredRequests); // For debugging

  return (
    <div className="container">
      <h1>Mutual Transfer Page</h1>

      {/* Filter for department */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="department-filter">Department</label>
          <select
            className="form-select"
            id="department-filter"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            {departmentOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
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

      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User Full Name</th>
              <th scope="col">Match Full Name</th>
              <th scope="col">Post</th>
              <th scope="col">Current Posting</th>
              <th scope="col">Desired Posting</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request, idx) => (
              request.matches && request.matches.length > 0 ? (
                request.matches.map((match, idx) => (
                  (match.userRecord.selectedGoal === selectedDepartment || match.potentialMatch.selectedGoal === selectedDepartment) && (
                    <tr key={idx}>
                      <td>{match.userRecord.fullName}</td>
                      <td>{match.potentialMatch.fullName}</td>
                      <td>{match.userRecord.post}</td>
                      <td>{match.userRecord.currentPosting.join(', ')}</td>
                      <td>{match.potentialMatch.desiredPosting.join(', ')}</td>
                      <td>{match.userRecord.email}</td>
                      <td>{match.userRecord.mobileNumber}</td>
                    </tr>
                  )
                ))
              ) : null
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MutualTransferPage;
