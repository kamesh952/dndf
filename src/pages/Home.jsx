import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center">
      <h1>Welcome to Event Management</h1>
      <p>Discover and manage amazing events.</p>
      <Link to="/events" className="btn btn-primary">View Events</Link>
    </div>
  );
};

export default Home;
