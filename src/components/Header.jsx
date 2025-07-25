import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Using React state instead of localStorage for Claude.ai compatibility
  const [token, setToken] = useState('sample-token'); // Simulating logged-in state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setToken(null);
    alert('Logged out successfully!');
    setIsMobileMenuOpen(false);
  };

  const handleMobileToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .navbar-custom {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-scrolled {
          background: rgba(13, 110, 253, 0.95) !important;
          box-shadow: 0 8px 32px rgba(13, 110, 253, 0.3);
          padding: 0.5rem 0;
        }

        .navbar-brand {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .navbar-brand:hover {
          transform: scale(1.05);
          color: #fff !important;
        }

        .navbar-brand::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffd700, #ff6b35);
          transition: width 0.3s ease;
        }

        .navbar-brand:hover::after {
          width: 100%;
        }

        .nav-link-custom {
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 0.5rem 1rem !important;
          border-radius: 8px;
          margin: 0 0.2rem;
        }

        .nav-link-custom:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          color: #ffd700 !important;
        }

        .nav-link-custom::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #ffd700, #ff6b35);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link-custom:hover::before {
          width: 80%;
        }

        .btn-logout {
          background: linear-gradient(135deg, #dc3545, #c82333);
          border: none;
          border-radius: 25px;
          padding: 0.4rem 1.2rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }

        .btn-logout:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
          background: linear-gradient(135deg, #c82333, #dc3545);
        }

        .mobile-toggle {
          border: none;
          background: none;
          color: white;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 0.5rem;
        }

        .mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }

        .mobile-sidebar-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1040;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mobile-sidebar-backdrop.show {
          opacity: 1;
        }

        .mobile-sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: linear-gradient(135deg, #0d6efd, #0056b3);
          z-index: 1050;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
          overflow-y: auto;
        }

        .mobile-sidebar.show {
          right: 0;
        }

        .sidebar-header {
          padding: 2rem 1.5rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .sidebar-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(180deg);
        }

        .sidebar-nav-item {
          padding: 0.8rem 1.5rem;
          margin: 0.3rem 1rem;
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: block;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .sidebar-nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffd700;
          transform: translateX(10px);
        }

        .sidebar-nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, #ffd700, #ff6b35);
          transition: width 0.3s ease;
          z-index: -1;
        }

        .sidebar-nav-item:hover::before {
          width: 4px;
        }

        .sidebar-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.1);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stagger-animation > * {
          animation: fadeIn 0.6s ease-out;
        }

        .stagger-animation > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-animation > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-animation > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-animation > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-animation > *:nth-child(5) { animation-delay: 0.5s; }

        @media (max-width: 991.98px) {
          .navbar-nav {
            display: none;
          }
        }

        @media (min-width: 992px) {
          .mobile-toggle {
            display: none;
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(255, 215, 0, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0);
          }
        }
      `}</style>

      {/* Main Navbar */}
      <nav className={`navbar navbar-expand-lg navbar-dark navbar-custom ${isScrolled ? 'navbar-scrolled' : ''} bg-primary fixed-top`}>
        <div className="container">
          {/* Brand */}
          <Link className="navbar-brand fw-bold fs-3" to="/">
            ✨ Event Management
          </Link>

          {/* Mobile Toggle Button */}
          <button 
            className="mobile-toggle d-lg-none"
            type="button"
            onClick={handleMobileToggle}
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Desktop Navigation */}
          <div className="navbar-nav ms-auto d-none d-lg-flex align-items-center">
            <Link className="nav-link nav-link-custom text-white fw-semibold" to="/events">
              📅 Events
            </Link>
            
            {token ? (
              <>
                <Link className="nav-link nav-link-custom text-white fw-semibold" to="/profile">
                  👤 Profile
                </Link>
                <Link className="nav-link nav-link-custom text-white fw-semibold" to="/events/create">
                  ➕ Create Event
                </Link>
                <button className="btn btn-logout btn-sm ms-3" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link nav-link-custom text-white fw-semibold" to="/login">
                  🔐 Login
                </Link>
                <Link className="nav-link nav-link-custom text-white fw-semibold pulse-animation" to="/register">
                  📝 Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className={`mobile-sidebar-backdrop ${isMobileMenuOpen ? 'show' : ''}`}
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'show' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <button 
            className="sidebar-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
          <h4 className="text-white mb-0 fw-bold">✨ Navigation</h4>
          <p className="text-white-50 mb-0 small">Event Management System</p>
        </div>

        {/* Sidebar Navigation */}
        <div className="py-3 stagger-animation">
          <Link 
            className="sidebar-nav-item fw-semibold" 
            to="/events"
            onClick={closeMobileMenu}
          >
            📅 Events
          </Link>
          
          {token ? (
            <>
              <Link 
                className="sidebar-nav-item fw-semibold" 
                to="/profile"
                onClick={closeMobileMenu}
              >
                👤 Profile
              </Link>
              <Link 
                className="sidebar-nav-item fw-semibold" 
                to="/events/create"
                onClick={closeMobileMenu}
              >
                ➕ Create Event
              </Link>
              <div className="px-3 mt-4">
                <button 
                  className="btn btn-logout w-100 fw-semibold" 
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                className="sidebar-nav-item fw-semibold" 
                to="/login"
                onClick={closeMobileMenu}
              >
                🔐 Login
              </Link>
              <Link 
                className="sidebar-nav-item fw-semibold pulse-animation" 
                to="/register"
                onClick={closeMobileMenu}
              >
                📝 Register
              </Link>
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="text-center">
            <p className="text-white-50 mb-2 small">
              © 2025 Event Management
            </p>
            <div className="d-flex justify-content-center gap-3">
              <a href="#" className="text-white-50 small">Privacy</a>
              <a href="#" className="text-white-50 small">Terms</a>
              <a href="#" className="text-white-50 small">Support</a>
            </div>
          </div>
        </div>
      </div>

      {/* Font Awesome for icons */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />
    </>
  );
};

export default Header;