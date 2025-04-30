// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import ContentResourceManagement from './pages/ContentResourceManagement';
import UsersAndSales from './pages/UsersAndSales';
import UserActivity from './pages/UserActivity';
import MutualTransfer from './pages/MutualTransfer';
import UserFeedback from './pages/UserFeedback';
import Experts from './pages/Experts';
import TransactionRecords from './pages/TransactionRecords';
import Scheduler from './pages/Scheduler';
import AvailableSchedules from './components/AvailableSchedules';
import EditShedular from './pages/EditShedular';
import Hiring from './pages/Hiring';
import Contactus from './pages/contactus';
import AdminStatistics from './pages/AdminStatistics';
import PromoCodesPage from './pages/PromoCodesPage';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('Atoken')
  );
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/*"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <div className="d-flex">
              <Sidebar setIsAuthenticated={setIsAuthenticated} />
              <div className="content p-4">
                  <Routes>
                    <Route path="/content-resource-management" element={<ContentResourceManagement />} />
                    <Route path="/users-sales" element={<UsersAndSales />} />
                    <Route path="/user-activity" element={<UserActivity />} />
                    <Route path="/mutual-transfer" element={<MutualTransfer />} />
                    <Route path="/user-feedback" element={<UserFeedback />} />
                    <Route path="/experts" element={<Experts />} />
                    <Route path="/transaction-records" element={<TransactionRecords />} />
                    <Route path="/scheduler" element={<Scheduler />} />
                    <Route path="/available-schedules" element={<AvailableSchedules />} />
                    <Route path="/Edit-schedules" element={<EditShedular />} />
                    <Route path="/Hiring-records" element={<Hiring />} />
                    <Route path="/Contactus" element={<Contactus />} />
                    <Route path="/AdminStatistics" element={<AdminStatistics />} />
                    <Route path="/Promocodes" element={<PromoCodesPage />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;