import React, { useState, useEffect } from 'react';
import api from "../components/apiConfig";
import { Modal, Button, Spinner, Table } from 'react-bootstrap';

const PromoCodesPage = () => {
  const [promoCodes, setPromoCodes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPromo, setNewPromo] = useState({ code: '', discount: '' });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState(null);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async () => {
    try {
      const response = await api.get('/promos');
      setPromoCodes(response.data);
    } catch (error) {
      console.error('Failed to fetch promo codes:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePromo = async () => {
    setLoading(true);
    try {
      await api.post('/promos/add', newPromo);
      fetchPromoCodes();
      resetForm();
    } catch (error) {
      console.error('Failed to save promo code:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePromo = async () => {
    try {
      await api.delete(`/promos/delete/${promoToDelete}`);
      setPromoCodes((prev) => prev.filter((promo) => promo._id !== promoToDelete));
      setShowDeleteModal(false);
      setPromoToDelete(null);
    } catch (error) {
      console.error('Failed to delete promo code:', error);
    }
  };

  const confirmDeletePromo = (id) => {
    setPromoToDelete(id);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setNewPromo({ code: '', discount: '' });
    setShowForm(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Promo Codes</h1>
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Add Promo Code
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Discount (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promoCodes.map((promo, index) => (
            <tr key={promo._id || index}>
              <td>{index + 1}</td>
              <td>{promo.code}</td>
              <td>{promo.discount}</td>
              <td>
                <Button variant="danger" onClick={() => confirmDeletePromo(promo._id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Promo Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Code</label>
            <input type="text" className="form-control" name="code" value={newPromo.code} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Discount (%)</label>
            <input type="number" className="form-control" name="discount" value={newPromo.discount} onChange={handleInputChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>Close</Button>
          <Button variant="success" onClick={handleSavePromo} disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this promo code?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleRemovePromo}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PromoCodesPage;