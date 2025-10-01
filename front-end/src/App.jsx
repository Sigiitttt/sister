// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts
import Layout from "./components/layout/Layout"; // Layout untuk publik
import AdminLayout from "./components/layout/AdminLayout"; // Layout khusus admin

import ProtectedRoute from "./components/auth/ProtectedRoute";

// Halaman publik
import HomePage from "./pages/HomePage";
import CekKuotaPage from "./pages/CekKuotaPage";
import BookingPage from "./pages/BookingPage";
import CekBookingPage from "./pages/CekBookingPage";

// Halaman admin
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import VerificationPage from "./pages/admin/VerificationPage";
import BlacklistPage from "./pages/admin/BlacklistPage";
import OperationalPage from './pages/admin/OperationalPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Grup 1: Rute Publik menggunakan Layout standar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cek-kuota" element={<CekKuotaPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/cek-booking" element={<CekBookingPage />} />
        </Route>

        {/* Grup 2: Rute Admin dilindungi & menggunakan AdminLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/verifikasi" element={<VerificationPage />} />
            <Route path="/admin/blacklist" element={<BlacklistPage />} />
            <Route path="/admin/operasional" element={<OperationalPage />} />
          </Route>
        </Route>

        {/* Grup 3: Halaman login tanpa layout apapun */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Grup 4: Halaman "Tidak Ditemukan" */}
        <Route path="*" element={<div className="text-center mt-20"><h1>404: Halaman Tidak Ditemukan</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;