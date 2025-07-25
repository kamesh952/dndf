import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userId, setUserId] = useState(null); // Track logged-in user

  useEffect(() => {
    fetchUserData();
    fetchEvents();
    fetchUserBookings();
  }, []);

  // Fetch Logged-in User Data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserId(response.data.id);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch All Events
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Fetch User's Bookings to Check Registration
  const fetchUserBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const bookedEventIds = response.data.map((booking) => booking.eventId);
      setRegisteredEvents(bookedEventIds);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Handle Event Registration
  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/bookings',
        { eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRegisteredEvents((prev) => [...prev, eventId]); // Update state
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.description}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>

                  {/* Registration or Registered State */}
                  {registeredEvents.includes(event.id) ? (
                    <button className="btn btn-secondary me-2" disabled>
                      Registered
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleRegister(event.id)}
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
