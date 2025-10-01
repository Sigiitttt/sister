// src/components/layout/AdminLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;