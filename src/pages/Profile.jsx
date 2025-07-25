import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setBookingLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      if (window.confirm('Are you sure you want to unregister from this event?')) {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      }
    } catch (error) {
      console.error('Error deleting booking:', error.response?.data || error.message);
      alert('Failed to unregister. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-lg-5">
      {/* User Info Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="card-title mb-3">
                Welcome, <span className="text-primary">{user.firstName} {user.lastName}</span> 👋
              </h2>
              <p className="card-text mb-1">
                <i className="bi bi-envelope-fill me-2 text-secondary"></i>
                <strong>Email:</strong> {user.email}
              </p>
              {user.phone && (
                <p className="card-text mb-1">
                  <i className="bi bi-telephone-fill me-2 text-secondary"></i>
                  <strong>Phone:</strong> {user.phone}
                </p>
              )}
            </div>
            <button 
              onClick={handleLogout} 
              className="btn btn-outline-danger d-flex align-items-center"
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Your Bookings</h3>
          <button 
            onClick={fetchBookings} 
            className="btn btn-sm btn-outline-secondary"
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-arrow-clockwise"></i>
            )}
          </button>
        </div>

        {bookingLoading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="card shadow-sm">
            <div className="card-body text-center py-5">
              <i className="bi bi-calendar-x text-muted" style={{ fontSize: '3rem' }}></i>
              <h5 className="mt-3">No Bookings Found</h5>
              <p className="text-muted">You haven't registered for any events yet.</p>
              <button 
                onClick={() => navigate('/events')} 
                className="btn btn-primary mt-2"
              >
                Browse Events
              </button>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="col">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-header bg-white">
                    <h5 className="card-title mb-0 text-truncate">
                      {booking.Event?.title || 'Unknown Event'}
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <span className={`badge ${booking.status === 'confirmed' ? 'bg-success' : 'bg-danger'} me-2`}>
                        {booking.status}
                      </span>
                      <small className="text-muted">
                        {new Date(booking.Event?.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </small>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1">
                        <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                        <strong>Location:</strong> {booking.Event?.location || 'N/A'}
                      </p>
                      {booking.Event?.time && (
                        <p className="mb-1">
                          <i className="bi bi-clock-fill me-2 text-primary"></i>
                          <strong>Time:</strong> {booking.Event.time}
                        </p>
                      )}
                    </div>

                    {booking.status !== 'canceled' ? (
                      <div className="d-grid gap-2">
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="btn btn-outline-danger"
                        >
                          <i className="bi bi-trash me-2"></i>Unregister
                        </button>
                        <button className="btn btn-outline-primary">
                          <i className="bi bi-calendar-event me-2"></i>Add to Calendar
                        </button>
                      </div>
                    ) : (
                      <div className="alert alert-warning mb-0">
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        You have unregistered from this event.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;