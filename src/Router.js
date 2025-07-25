import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Profile from './pages/Profile';
import EventCreate from './pages/EventCreate';
import Header from './components/Header';
import Footer from './components/Footer';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events/create" element={<EventCreate />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRouter;
