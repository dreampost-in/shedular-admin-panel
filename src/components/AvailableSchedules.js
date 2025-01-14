import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig";

const AvailableSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [courseContentOptions, setCourseContentOptions] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedSchedule, setEditedSchedule] = useState({});

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get('/schedule/available');
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    const fetchCourseContent = async () => {
      try {
        const response = await api.get('/coursecontent/goals');
        setCourseContentOptions(response.data);
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    };

    fetchSchedules();
    fetchCourseContent();
  }, []);

  const getExamOptions = (goal) => {
    switch (goal) {
      case 'SSC':
        return ['CGL', 'CPO', 'CHSL', 'MTS', 'GD'];
      case 'RRB':
        return ['NTPC', 'ALP', 'JE', 'Group-D'];
      case 'BANKING':
        return ['PO', 'Clerk'];
      default:
        return [];
    }
  };

  const handleEditClick = (schedule) => {
    setEditMode(schedule._id);
    setEditedSchedule({ ...schedule });
  };

  const handleFieldChange = (field, value) => {
    setEditedSchedule({ ...editedSchedule, [field]: value });
  };

  const handleGoalChange = (goalId) => {
    const selectedGoal = courseContentOptions.find((content) => content.goalId === goalId);
    const updatedExams = getExamOptions(selectedGoal?.goal);

    setEditedSchedule({
      ...editedSchedule,
      goalId,
      goal: selectedGoal?.goal,
      duration: selectedGoal?.duration,
      exam: updatedExams.length > 0 ? updatedExams[0] : '',
    });
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/schedule/edit/${editedSchedule._id}`, editedSchedule);
      setSchedules((prev) =>
        prev.map((schedule) => (schedule._id === response.data._id ? response.data : schedule))
      );
      setEditMode(null);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedSchedule({});
  };

  const handleDelete = async (scheduleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this schedule?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/schedule/remove/${scheduleId}`);
      setSchedules((prev) => prev.filter((schedule) => schedule._id !== scheduleId));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Available Schedules</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Table</th>
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
              {editMode === schedule._id ? (
                <>
                  <td>
                    <select
                      value={editedSchedule.goalId || ''}
                      onChange={(e) => handleGoalChange(e.target.value)}
                    >
                      {courseContentOptions.map((content) => (
                        <option key={content.goalId} value={content.goalId}>
                          {content.goal} ({content.duration})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editedSchedule.exam || ''}
                      onChange={(e) => handleFieldChange('exam', e.target.value)}
                    >
                      {getExamOptions(editedSchedule.goal).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editedSchedule.category}
                      onChange={(e) => handleFieldChange('category', e.target.value)}
                    >
                      {['FRESHER', 'REPEATER', 'BOTH'].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedSchedule.price || ''}
                      onChange={(e) => handleFieldChange('price', e.target.value)}
                    />
                  </td>
                  <td>{editedSchedule.duration}</td>
                  <td>
                    <select
                      value={editedSchedule.hrsanddays}
                      onChange={(e) => handleFieldChange('hrsanddays', e.target.value)}
                    >
                      {['<5', '>5'].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      value={editedSchedule.stage}
                      onChange={(e) => handleFieldChange('stage', e.target.value)}
                    >
                      {['PRELIMS', 'MAINS', 'PRELIMS+MAINS'].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={handleSave}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{schedule.goalId.goal}</td>
                  <td>{schedule.exam}</td>
                  <td>{schedule.category}</td>
                  <td>{schedule.price}</td>
                  <td>{schedule.goalId.duration}</td>
                  <td>{schedule.hrsanddays}</td>
                  <td>{schedule.stage}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(schedule)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(schedule._id)}
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableSchedules;
