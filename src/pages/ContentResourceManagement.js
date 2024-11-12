// src/pages/ContentResourceManagement.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentResourceManagement = () => {
  const navigate = useNavigate();
  
  // Sample schedule data
  const [schedules, setSchedules] = useState([
    { id: 1, name: 'Schedule 1', published: false },
    { id: 2, name: 'Schedule 2', published: false }
  ]);
  
  // Dropdown options for the schedule attributes
  const examOptions = ['SSC', 'RRB', 'Banking'];
  const categoryOptions = ['Math', 'Science', 'English'];
  const hoursDaysOptions = ['120 Days', '150 Days'];
  const stageOptions = ['Stage 1', 'Stage 2', 'Stage 3'];
  
  const priceOptions = ['Low', 'Medium', 'High'];

  const handleAddScheduleClick = () => {
    navigate('/scheduler');
  };

  const handlePublishToggle = (scheduleId) => {
    const updatedSchedules = schedules.map(schedule =>
      schedule.id === scheduleId
        ? { ...schedule, published: !schedule.published }
        : schedule
    );
    setSchedules(updatedSchedules);
  };

  const handleRemoveSchedule = (scheduleId) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
    setSchedules(updatedSchedules);
  };

  return (
    <div className="container">
      <h1>Content and Resource Management</h1>
      <p>This is the Content and Resource Management page.</p>

      {/* Available Schedules */}
      <h3>Available Schedules</h3>
      {schedules.map((schedule) => (
        <div key={schedule.id} className="schedule-item mb-3">
          <h4>{schedule.name}</h4>
          <div className="row mb-3">
            <div className="col-md-3">
              <label>Exam</label>
              <select className="form-select">
                {examOptions.map((exam, index) => (
                  <option key={index} value={exam}>{exam}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>Category</label>
              <select className="form-select">
                {categoryOptions.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>Hours/Days</label>
              <select className="form-select">
                {hoursDaysOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>Stage</label>
              <select className="form-select">
                {stageOptions.map((stage, index) => (
                  <option key={index} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label>Price</label>
              <select className="form-select">
                {priceOptions.map((price, index) => (
                  <option key={index} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <button
                className={`btn ${schedule.published ? 'btn-success' : 'btn-warning'} mb-2`}
                onClick={() => handlePublishToggle(schedule.id)}
              >
                {schedule.published ? 'Unpublish' : 'Publish'}
              </button>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-danger mb-2"
                onClick={() => handleRemoveSchedule(schedule.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Schedule Button */}
      <button className="btn btn-primary" onClick={handleAddScheduleClick}>
        Add Schedule
      </button>
    </div>
  );
};

export default ContentResourceManagement;
