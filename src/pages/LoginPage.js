// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/apiConfig';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

// src/pages/LoginPage.js
const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
  
    try {
      const response = await api.post('/admin/login', { username, password });
  
      if (response.data.success) {
        // ✅ Store token in localStorage
        localStorage.setItem('Atoken', response.data.token);
        setIsAuthenticated(true);
        navigate('/content-resource-management');
      } else {
        setErrorMsg('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-success">Admin Login</h3>

          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
