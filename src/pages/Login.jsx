import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api'; // Using your API function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // For displaying messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages

    try {
      const response = await loginUser({ email, password });
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });

      // Store token and redirect
      localStorage.setItem('token', response.token);
      setTimeout(() => navigate('/profile'), 1500); // Delay for UX
    } catch (error) {
      console.error('Login failed:', error);
      setMessage({
        text: error.response?.data?.message || 'Login failed. Please check your credentials.',
        type: 'danger',
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="col-md-5">
        <h2 className="text-center mb-4">Login</h2>
        
        {/* Display Message */}
        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="card p-4 shadow">
          {/* Email Input */}
          <div className="mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">Login</button>
          <p className="mt-3 text-center">
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
