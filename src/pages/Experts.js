import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig";
import { Modal, Button, Spinner, Table } from 'react-bootstrap';

const ExpertsPage = () => {
  const [experts, setExperts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExpert, setNewExpert] = useState({
    name: '',
    degree: '',
    experience: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpertId, setCurrentExpertId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expertToDelete, setExpertToDelete] = useState(null);

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const response = await api.get('/experts');
      setExperts(response.data);
    } catch (error) {
      console.error('Failed to fetch experts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewExpert({ ...newExpert, image: e.target.files[0] });
  };

  const handlePublish = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', newExpert.name);
      formData.append('degree', newExpert.degree);
      formData.append('experience', newExpert.experience);
      if (newExpert.image) formData.append('image', newExpert.image);

      const response = await api.post('/experts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setExperts((prev) => [...prev, response.data]);
      resetForm();
    } catch (error) {
      console.error('Failed to create expert:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExpert = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', newExpert.name);
      formData.append('degree', newExpert.degree);
      formData.append('experience', newExpert.experience);

      if (newExpert.image instanceof File) {
        formData.append('image', newExpert.image); // New image
      } else if (newExpert.image) {
        formData.append('imageUrl', newExpert.image); // Existing image URL
      }

      const response = await api.put(`/experts/${currentExpertId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setExperts((prev) =>
        prev.map((expert) => (expert._id === currentExpertId ? response.data : expert))
      );
      resetForm();
    } catch (error) {
      console.error('Failed to update expert:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditExpert = (expert) => {
    setNewExpert({
      name: expert.name,
      degree: expert.degree,
      experience: expert.experience,
      image: expert.imageUrl, // Include the existing image URL
    });
    setIsEditing(true);
    setCurrentExpertId(expert._id);
    setShowForm(true);
  };

  const handleRemoveExpert = async () => {
    try {
      await api.delete(`/experts/${expertToDelete}`);
      setExperts((prev) => prev.filter((expert) => expert._id !== expertToDelete));
      setShowDeleteModal(false);
      setExpertToDelete(null);
    } catch (error) {
      console.error('Failed to delete expert:', error);
    }
  };

  const confirmDeleteExpert = (id) => {
    setExpertToDelete(id);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setNewExpert({ name: '', degree: '', experience: '', image: null });
    setIsEditing(false);
    setCurrentExpertId(null);
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Experts</h1>
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Add Expert
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Degree</th>
            <th>Experience</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {experts.map((expert, index) => (
            <tr key={expert._id}>
              <td>{index + 1}</td>
              <td>{expert.name}</td>
              <td>{expert.degree}</td>
              <td>{expert.experience}</td>
              <td>
                {expert.imageUrl && (
                  <img
                    src={expert.imageUrl}
                    alt="Expert"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditExpert(expert)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => confirmDeleteExpert(expert._id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Expert' : 'Add New Expert'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
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
            <label htmlFor="degree" className="form-label">
              Degree
            </label>
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
            <label htmlFor="experience" className="form-label">
              Experience
            </label>
            <input
              type="text"
              className="form-control"
              id="experience"
              name="experience"
              value={newExpert.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Close
          </Button>
          <Button variant="success" onClick={isEditing ? handleUpdateExpert : handlePublish} disabled={loading}>
            {loading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : isEditing ? 'Update Expert' : 'Publish Expert'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this expert?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveExpert}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExpertsPage;
