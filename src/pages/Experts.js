import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpert, setNewExpert] = useState({
    name: '',
    degree: '',
    experience: '',
  });

  // State to handle editing an expert
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpertId, setCurrentExpertId] = useState(null);

  // Fetch all experts on component mount
  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/experts');
      setExperts(response.data);
    } catch (error) {
      console.error('Failed to fetch experts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/experts', newExpert);
      setExperts((prev) => [...prev, response.data]);
      setNewExpert({ name: '', degree: '', experience: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create expert:', error);
    }
  };

  const handleUpdateExpert = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/experts/${currentExpertId}`, newExpert);
      setExperts((prev) =>
        prev.map((expert) => (expert._id === currentExpertId ? response.data : expert))
      );
      setNewExpert({ name: '', degree: '', experience: '' });
      setIsEditing(false);
      setCurrentExpertId(null);
    } catch (error) {
      console.error('Failed to update expert:', error);
    }
  };

  const handleEditExpert = (expert) => {
    setNewExpert({
      name: expert.name,
      degree: expert.degree,
      experience: expert.experience,
    });
    setIsEditing(true);
    setCurrentExpertId(expert._id);
    setShowForm(true);
  };

  const handleRemoveExpert = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/experts/${id}`);
      setExperts((prev) => prev.filter((expert) => expert._id !== id));
    } catch (error) {
      console.error('Failed to delete expert:', error);
    }
  };

  return (
    <div className="container">
      <h1>Experts</h1>
      
      {/* Show the Add Expert button always */}
      <button className="btn btn-primary" onClick={() => setShowForm(true)}>
        Add Expert
      </button>

      {showForm && (
        <div className="mt-4">
          <h3>{isEditing ? 'Edit Expert' : 'Add New Expert'}</h3>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={newExpert.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="degree" className="form-label">Degree</label>
            <input
              type="text"
              className="form-control"
              id="degree"
              name="degree"
              value={newExpert.degree}
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
          </div>
          <button className="btn btn-success" onClick={isEditing ? handleUpdateExpert : handlePublish}>
            {isEditing ? 'Update Expert' : 'Publish Expert'}
          </button>
        </div>
      )}

      {experts.length > 0 && (
        <div className="mt-4">
          <h3>Experts List</h3>
          <ul className="list-group">
            {experts.map((expert) => (
              <li key={expert._id} className="list-group-item">
                <div>
                  <strong>{expert.name}</strong>
                  <p>Degree: {expert.degree}</p>
                  <p>Experience: {expert.experience}</p>
                </div>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEditExpert(expert)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveExpert(expert._id)}
                >
                  Remove
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
