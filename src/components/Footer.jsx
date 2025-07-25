import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-3 bg-dark text-white">
      <p>&copy; {new Date().getFullYear()} Event Management. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
