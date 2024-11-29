import React, { useState, useEffect } from 'react';
import api from "../apiConfig/apiConfig";

// Sample data (replace with real data fetching from API)
const sampleTransactions = [
  { userId: '1', userName: 'John Doe', schedule: 'Schedule 1', amount: 50, date: '2024-11-01' },
  { userId: '2', userName: 'Jane Smith', schedule: 'Schedule 2', amount: 30, date: '2024-11-02' },
  { userId: '3', userName: 'Mike Johnson', schedule: 'Schedule 1', amount: 50, date: '2024-11-03' },
  { userId: '4', userName: 'Sara Lee', schedule: 'Schedule 3', amount: 40, date: '2024-10-25' },
  // More sample data...
];

const TransactionReportPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Fetch your transaction data (replace with actual API call)
    setTransactions(sampleTransactions);
    setFilteredTransactions(sampleTransactions);
  }, []);

  // Handle date filter change
  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    // Filter logic based on selected filter (Today, Last 7 days, etc.)
    let filteredData;
    const today = new Date();

    switch (selectedFilter) {
      case 'today':
        filteredData = transactions.filter(
          (transaction) => new Date(transaction.date).toDateString() === today.toDateString()
        );
        break;
      case 'last7days':
        const last7Days = new Date(today.setDate(today.getDate() - 7));
        filteredData = transactions.filter((transaction) => new Date(transaction.date) >= last7Days);
        break;
      case 'last1month':
        const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
        filteredData = transactions.filter((transaction) => new Date(transaction.date) >= lastMonth);
        break;
      case 'last3months':
        const last3Months = new Date(today.setMonth(today.getMonth() - 3));
        filteredData = transactions.filter((transaction) => new Date(transaction.date) >= last3Months);
        break;
      case 'last6months':
        const last6Months = new Date(today.setMonth(today.getMonth() - 6));
        filteredData = transactions.filter((transaction) => new Date(transaction.date) >= last6Months);
        break;
      case 'all':
      default:
        filteredData = transactions;
        break;
    }

    setFilteredTransactions(filteredData);
  };

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
          <option value="today">Today</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last1month">Last 1 Month</option>
          <option value="last3months">Last 3 Months</option>
          <option value="last6months">Last 6 Months</option>
          <option value="all">All Time</option>
        </select>
      </div>

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
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
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
