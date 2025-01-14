import React, { useState, useEffect } from "react";
import api from "../components/apiConfig";

const UserActivityPage = () => {
  const timeOptions = ["Today", "Last 7 Days", "1 Month", "3 Months", "6 Months", "All Time"];
  const [timeFilter, setTimeFilter] = useState("Today");
  const [userSignups, setUserSignups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user signups based on the filter
  const fetchUserSignups = async (filter) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/user-activity`, {
        params: { filter },
      });
      console.log(response.data);
      setUserSignups(response.data.data || []); // Ensure we access the correct property
    } catch (error) {
      console.error("Error fetching user signups:", error);
      setUserSignups([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setTimeFilter(selectedFilter);
    fetchUserSignups(selectedFilter);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserSignups(timeFilter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Display Sign-up Count */}
      {!loading && (
        <div className="row mb-3">
          <div className="col-md-12">
            <h3>Total Users Signed Up: {userSignups.length}</h3>
          </div>
        </div>
      )}

      {/* Display Table for User Sign-up Data */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Sign-up Date</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            userSignups.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserActivityPage;
