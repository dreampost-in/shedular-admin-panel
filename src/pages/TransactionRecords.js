import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig"; // Assuming you have an API config for axios

const TransactionReportPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('Today');
  const [loading, setLoading] = useState(false);

  // Fetch the transactions based on the selected filter
  const fetchTransactions = async (filter) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/sales/filtered`, { params: { filter } });
      setTransactions(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  // Handle date filter change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    fetchTransactions(selectedFilter);
  };

  // Initial fetch of all transactions
  useEffect(() => {
    fetchTransactions('Today');
  }, []);

  return (
    <div className="container">
      <h1>Transaction Report</h1>

      {/* Date Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="dateFilter" className="form-label">Filter By Date</label>
        <select
          id="dateFilter"
          className="form-select"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="Today">Today</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="1 Month">Last 1 Month</option>
          <option value="3 Months">Last 3 Months</option>
          <option value="6 Months">Last 6 Months</option>
          <option value="All Time">All Time</option>
        </select>
      </div>

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Transaction Table */}
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Schedule</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.userName}</td>
                <td>{transaction.schedule}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionReportPage;
