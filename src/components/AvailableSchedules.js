import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig";

const AvailableSchedules = () => {
  const [schedules, setSchedules] = useState([]);

  // Fetch the available schedules from the backend
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get('/schedule/available');
        console.log(response.data)
        setSchedules(response.data); // Assuming the response is an array of schedules
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  // Remove a schedule
  const handleRemoveSchedule = async (scheduleId) => {
    try {
      await api.delete(`/schedule/remove/${scheduleId}`);
      // Remove the schedule from the state
      setSchedules(schedules.filter(schedule => schedule._id !== scheduleId));
    } catch (error) {
      console.error('Error removing schedule:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Available Schedules</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Exam</th>
            <th>Category</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Hours & Days</th>
            <th>Stage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.goalId.goal}</td> {/* Display the goal from CourseContent */}
              <td>{schedule.exam}</td>
              <td>{schedule.category}</td>
              <td>{schedule.price}</td>
              <td>{schedule.goalId.duration}</td> {/* Display the duration from CourseContent */}
              <td>{schedule.hrsanddays}</td>
              <td>{schedule.stage}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveSchedule(schedule._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableSchedules;
