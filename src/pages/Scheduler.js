import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Scheduler = () => {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [features, setFeatures] = useState('');
  const [resources, setResources] = useState('');
  const [courseInfo, setCourseInfo] = useState('');
  const [columns, setColumns] = useState([{ title: 'Day', rows: [1] }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ goal, duration, features, resources, courseInfo });
  };

  const handleAddColumn = () => {
    setColumns([...columns, { title: '', rows: [] }]);
  };

  const handleAddRow = (columnIndex) => {
    const updatedColumns = [...columns];
    const dayColumnIndex = 0;

    if (columnIndex === dayColumnIndex) {
      return; // No action for the "Day" column
    }

    // Add a new day to the "Day" column if not already added
    const dayRowCount = columns[dayColumnIndex].rows.length;
    if (dayRowCount < updatedColumns[columnIndex].rows.length + 1) {
      updatedColumns[dayColumnIndex].rows.push(dayRowCount + 1);
    }

    updatedColumns[columnIndex].rows.push(''); // Add an empty cell for the new day
    setColumns(updatedColumns);
  };

  const handleColumnTitleChange = (e, columnIndex) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].title = e.target.value;
    setColumns(updatedColumns);
  };

  const handleRowDataChange = (e, columnIndex, rowIndex) => {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex].rows[rowIndex] = e.target.value;
    setColumns(updatedColumns);
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">Scheduler</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="goal" className="form-label">Goal</label>
            <select 
              id="goal" 
              className="form-select" 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
              required
            >
              <option value="">Select Goal</option>
              <option value="ssc">SSC</option>
              <option value="rrb">RRB</option>
              <option value="banking">Banking</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="duration" className="form-label">Duration</label>
            <select 
              id="duration" 
              className="form-select" 
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              <option value="">Select Duration</option>
              <option value="120-days">120 Days</option>
              <option value="150-days">150 Days</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="features" className="form-label">Features</label>
            <textarea 
              id="features" 
              className="form-control" 
              rows="3" 
              value={features} 
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Enter features as points or paragraph" 
              required
            ></textarea>
          </div>

          <div className="col-md-4">
            <label htmlFor="resources" className="form-label">Required Resources</label>
            <textarea 
              id="resources" 
              className="form-control" 
              rows="3" 
              value={resources} 
              onChange={(e) => setResources(e.target.value)}
              placeholder="Enter required resources" 
              required
            ></textarea>
          </div>

          <div className="col-md-4">
            <label htmlFor="courseInfo" className="form-label">About the Course</label>
            <textarea 
              id="courseInfo" 
              className="form-control" 
              rows="3" 
              value={courseInfo} 
              onChange={(e) => setCourseInfo(e.target.value)}
              placeholder="Enter course information" 
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-success mb-4">Save Schedule</button>
      </form>

      <h3 className="my-4">Course Content</h3>
      <button className="btn btn-primary mb-3" onClick={handleAddColumn}>
        Add New Subject
      </button>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              {columns.map((col, colIndex) => (
                <th key={colIndex} className="text-center">
                  <input
                    type="text"
                    placeholder={colIndex === 0 ? 'Day' : 'Enter Column Title'}
                    className="form-control mb-2"
                    value={col.title}
                    readOnly={colIndex === 0} // Day column is read-only
                    onChange={(e) => handleColumnTitleChange(e, colIndex)}
                  />
                  {colIndex > 0 && (
                    <button
                      className="btn btn-secondary btn-sm mt-2"
                      onClick={() => handleAddRow(colIndex)}
                    >
                      Add New Day
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {columns[0].rows.map((_, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {colIndex === 0 ? (
                      <span>{col.rows[rowIndex]}</span>
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Row Data"
                        value={col.rows[rowIndex] || ''}
                        onChange={(e) => handleRowDataChange(e, colIndex, rowIndex)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Scheduler;
