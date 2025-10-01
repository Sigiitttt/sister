// src/components/layout/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              Penanggungan
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/cek-kuota" className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Cek Kuota
              </Link>
              <Link to="/cek-booking" className="text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Cek Status Booking
              </Link>
              <Link to="/admin/login" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;