// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
      <nav className="nav flex-column">
      {/* <Link className="nav-link" to="/Edit-schedules">Add Table</Link>  */}
      <Link className="nav-link" to="/Edit-schedules">Available Table</Link> 
        <Link className="nav-link" to="/content-resource-management">Add Shedule</Link>
        <Link className="nav-link" to="/available-schedules">Available Schedules</Link> {/* /Edit-schedules link */}
        <Link className="nav-link" to="/users-sales">Users & Sales</Link>
        <Link className="nav-link" to="/user-activity">User Activity</Link>
        <Link className="nav-link" to="/mutual-transfer">Mutual Transfer</Link>
        <Link className="nav-link" to="/user-feedback">User Feedback</Link>
        <Link className="nav-link" to="/experts">Experts</Link>
        <Link className="nav-link" to="/transaction-records">Transaction Records</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
