import React, { useState, useEffect } from "react";
import api from "../components/apiConfig";

const UserAndSalesPage = () => {
  const [data, setData] = useState([]); // Dynamic data from the backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [filter, setFilter] = useState("Today"); // Selected filter

  const timeOptions = ["Today", "Last 7 Days", "1 Month", "3 Months", "6 Months", "All Time"];

  // Fetch data from the backend based on the selected filter
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/user-sales`, {
        params: { filter }, // Pass the selected filter to the backend
      });
      setData(response.data.data); // Set the fetched data
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the filter changes
  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="container">
      <h1>User and Sales Data</h1>

      {/* Filters for selecting time periods */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="filter">Filter by Time</label>
          <select
            className="form-select"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {timeOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display loading, error, or data */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "50%" }}>Schedule</th>
              <th scope="col" style={{ width: "25%" }}>User Count</th>
              <th scope="col" style={{ width: "25%" }}>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.schedule}</td>
                <td>{item.userCount}</td>
                <td>{item.salesTotal.toFixed(2)}</td>
              </tr>
            ))}
            {/* Display the grand total */}
            <tr>
              <td><strong>Total</strong></td>
              <td>
                <strong>
                  {data.reduce((total, item) => total + item.userCount, 0)}
                </strong>
              </td>
              <td>
                <strong>
                  {data.reduce((total, item) => total + item.salesTotal, 0).toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAndSalesPage;
