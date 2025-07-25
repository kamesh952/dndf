import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setMessage({ text: '', type: '' }); // Clear previous messages
  };

  // Register User
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await registerUser(formData);
      setMessage({ text: response.message || 'Registration successful! Redirecting to login...', type: 'success' });

      setTimeout(() => navigate('/login'), 1500); // Redirect to login after 1.5 seconds
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Registration failed. Please try again.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="col-md-5">
        <h2 className="text-center mb-4">Register</h2>

        {/* Display Success or Error Message */}
        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="card p-4 shadow">
          {/* First Name */}
          <div className="mb-3">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Navigation Link */}
          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
