import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await api.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};

// Event APIs
export const createEvent = async (eventData, token) => {
  const response = await api.post('/events', eventData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
export const deleteEvent = async (id, token) => {
  const response = await api.delete(`/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};
