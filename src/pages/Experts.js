import React, { useState } from 'react';

const ExpertsPage = () => {
  // Sample expert data (Replace with real data or API calls)
  const [experts, setExperts] = useState([]);

  // State for handling form visibility
  const [showForm, setShowForm] = useState(false);

  // State for holding the new expert's data
  const [newExpert, setNewExpert] = useState({
    photo: '',
    experience: '',
    points: [],
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add points to the expert's experience
  const handleAddPoint = () => {
    if (newExpert.experience) {
      setNewExpert((prev) => ({
        ...prev,
        points: [...prev.points, newExpert.experience],
        experience: '',
      }));
    }
  };

  // Publish the new expert
  const handlePublish = () => {
    if (newExpert.photo && newExpert.points.length > 0) {
      setExperts([...experts, newExpert]);
      setNewExpert({ photo: '', experience: '', points: [] }); // Reset the form
      setShowForm(false); // Hide the form after publishing
    }
  };

  // Remove an expert from the list
  const handleRemoveExpert = (index) => {
    const updatedExperts = experts.filter((_, idx) => idx !== index);
    setExperts(updatedExperts);
  };

  return (
    <div className="container">
      <h1>Experts</h1>

      {/* Display Add Expert Button if no experts */}
      {experts.length === 0 && !showForm && (
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          Add Expert
        </button>
      )}

      {/* Add Expert Form */}
      {showForm && (
        <div className="mt-4">
          <h3>Add New Expert</h3>
          <div className="mb-3">
            <label htmlFor="photo" className="form-label">Photo URL</label>
            <input
              type="text"
              className="form-control"
              id="photo"
              name="photo"
              value={newExpert.photo}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="experience" className="form-label">Experience</label>
            <input
              type="text"
              className="form-control"
              id="experience"
              name="experience"
              value={newExpert.experience}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="btn btn-info mt-2"
              onClick={handleAddPoint}
            >
              Add Point to Experience
            </button>
          </div>

          <div className="mb-3">
            <h5>Experience Points</h5>
            <ul>
              {newExpert.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <button className="btn btn-success" onClick={handlePublish}>
            Publish Expert
          </button>
        </div>
      )}

      {/* Display List of Experts */}
      {experts.length > 0 && (
        <div className="mt-4">
          <h3>Experts List</h3>
          <ul className="list-group">
            {experts.map((expert, index) => (
              <li key={index} className="list-group-item">
                <div>
                  <img
                    src={expert.photo}
                    alt="expert"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                  <strong>{`Expert ${index + 1}`}</strong>
                  <ul>
                    {expert.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveExpert(index)}
                >
                  Remove Expert
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpertsPage;
