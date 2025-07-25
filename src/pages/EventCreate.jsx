import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/api';

const EventCreate = () => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      await createEvent(eventData, token);
      alert('Event created successfully!');
      navigate('/events');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to create event.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="col-md-6">
        <h2 className="text-center mb-4">Create Event</h2>
        <form onSubmit={handleCreateEvent} className="card p-4 shadow">
          {/* Title */}
          <div className="mb-3">
            <label>Event Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={eventData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              className="form-control"
              value={eventData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default EventCreate;