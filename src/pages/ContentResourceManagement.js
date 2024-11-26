import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContentResourceManagement = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    goalId: '', // Changed to goalId to store the selected goal's ID
    goal: '',
    exam: '',
    category: '',
    hrsanddays: '',
    stage: '',
    price: '',
  });
  const [goalOptions, setGoalOptions] = useState([]); // To store goal options

  // Fetch the schedules on component mount
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/coursecontent/goals');
        setGoalOptions(response.data); // Set the fetched goals to state
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  // Dynamic exam options based on the selected goal
  const getExamOptions = (goal) => {
    switch (goal) {
      case 'SSC':
        return ['CGL', 'CPO', 'CHSL', 'MTS', 'GD'];
      case 'RRB':
        return ['NTPC', 'ALP', 'JE', 'Group-D'];
      case 'Banking':
        return ['PO', 'Clerk'];
      default:
        return [];
    }
  };

  const getCategoryOptions = () => ['FRESHER', 'REPEATER', 'BOTH'];
  const getHrsAndDaysOptions = () => ['<5', '>5'];
  const getStageOptions = () => ['PRELIMS', 'MAINS', 'PRELIMS+MAINS'];

  // Navigate to the scheduler page when adding a new schedule
  const handleAddScheduleClick = () => {
    navigate('/scheduler');
  };

  // Handle publish toggle to send schedule to the backend
  const handlePublishToggle = async () => {
    try {
      // Ensure goalId is selected
      if (!newSchedule.goalId) {
        alert('Please select a goal before publishing the schedule.');
        return;
      }
console.log(newSchedule,newSchedule.goalId)
      // Combine the schedule with the selected goalId
      const scheduleWithGoalId = {
        ...newSchedule,
        goal: newSchedule.goal, // Ensure goalId is set
        goalId: newSchedule.goalId, // Ensure goalId is set
      };

      // Send the schedule to the backend
      const response = await axios.post('http://localhost:5000/api/schedule/add', scheduleWithGoalId);

      // Update the schedules state
      setSchedules((prevSchedules) => [...prevSchedules, response.data.data]);

      // Reset the form
      setNewSchedule({
        goalId: '',
        exam: '',
        category: '',
        hrsanddays: '',
        stage: '',
        price: '',
      });
    } catch (error) {
      console.error('Error publishing schedule:', error);
    }
  };

  // Handle changes in the schedule form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h1 className="text-center text-primary mb-4">Content and Resource Management</h1>
      <p className="text-center text-muted">Manage your schedules and course content with ease.</p>

      <h3 className="mt-5 text-secondary">Available Schedules</h3>

      {/* Goal Dropdown */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label text-muted">Select Goal</label>
          <select
            className="form-select"
            value={newSchedule.goalId} // Use goalId here
            onChange={(e) => {
              const selectedGoal = goalOptions.find(option => option.goalId === e.target.value);
              setNewSchedule({
                ...newSchedule,
                goalId: e.target.value,
                goal: selectedGoal?.goal || '',
              });
            }}
          >
            <option value="">Select Goal</option>
            {goalOptions.map((option) => (
              <option key={option.goalId} value={option.goalId}>
                {option.goal} ({option.duration})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Render other fields dynamically based on selected goal */}
      {newSchedule.goalId && (
        <>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label text-muted">Exam</label>
              <select
                className="form-select"
                value={newSchedule.exam}
                onChange={handleInputChange}
                name="exam"
              >
                <option value="">Select Exam</option>
                {getExamOptions(newSchedule.goal).map((exam) => (
                  <option key={exam} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Category</label>
              <select
                className="form-select"
                value={newSchedule.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="">Select Category</option>
                {getCategoryOptions().map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Hours/Days</label>
              <select
                className="form-select"
                value={newSchedule.hrsanddays}
                onChange={handleInputChange}
                name="hrsanddays"
              >
                <option value="">Select Hours/Days</option>
                {getHrsAndDaysOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted">Stage</label>
              <select
                className="form-select"
                value={newSchedule.stage}
                onChange={handleInputChange}
                name="stage"
              >
                <option value="">Select Stage</option>
                {getStageOptions().map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label text-muted">Price</label>
              <input
                type="text"
                className="form-control"
                value={newSchedule.price}
                onChange={handleInputChange}
                name="price"
              />
            </div>
            <div className="col-md-3">
              <button onClick={handlePublishToggle} className="btn btn-primary">
                Publish
              </button>
            </div>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <button onClick={handleAddScheduleClick} className="btn btn-success">
          Add Schedule
        </button>
      </div>
    </div>
  );
};

export default ContentResourceManagement;
