import React, { useState } from 'react';
import api from "../components/apiConfig";

const UserFeedbackPage = () => {
  // Sample feedback data (you can replace this with real data or API calls)
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, username: 'John Doe', feedback: 'Great app, very user-friendly!', status: 'Pending' },
    { id: 2, username: 'Jane Smith', feedback: 'Needs more features for restaurant owners.', status: 'Pending' },
    { id: 3, username: 'Mary Johnson', feedback: 'The app is crashing when I try to order.', status: 'Pending' },
    { id: 4, username: 'James Brown', feedback: 'Overall good experience.', status: 'Pending' },
  ]);

  // Function to handle feedback approval
  const handleApprove = (id) => {
    setFeedbacks(feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, status: 'Approved' } : feedback
    ));
  };

  // Function to handle feedback rejection
  const handleReject = (id) => {
    setFeedbacks(feedbacks.map(feedback =>
      feedback.id === id ? { ...feedback, status: 'Rejected' } : feedback
    ));
  };

  return (
    <div className="container">
      <h1>User Feedbacks</h1>

      {/* Table to Display Feedbacks */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Feedback</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.username}</td>
              <td>{feedback.feedback}</td>
              <td>
                <span className={`badge ${feedback.status === 'Approved' ? 'bg-success' : feedback.status === 'Rejected' ? 'bg-danger' : 'bg-warning'}`}>
                  {feedback.status}
                </span>
              </td>
              <td>
                <button 
                  className="btn btn-success me-2" 
                  onClick={() => handleApprove(feedback.id)}
                  disabled={feedback.status !== 'Pending'}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(feedback.id)}
                  disabled={feedback.status !== 'Pending'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFeedbackPage;
