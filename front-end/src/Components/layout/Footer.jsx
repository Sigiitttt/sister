// src/components/layout/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Booking Pendakian Penanggungan. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;