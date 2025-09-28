// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout.jsx';

// --- Halaman-halaman Aplikasi ---

// Halaman untuk Pendaki / Publik
import HomePage from './pages/HomePage.jsx';
import CekKuotaPage from './pages/CekKuotaPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import CekStatusPage from './pages/CekStatusPage.jsx';

// Halaman Admin (akan dibuat nanti)
// import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* --- Rute untuk Publik / Pendaki --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/cek-kuota" element={<CekKuotaPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/cek-status" element={<CekStatusPage />} />
          {/* <Route path="/sop" element={<div>Halaman SOP</div>} /> */}
          {/* <Route path="/register" element={<div>Halaman Registrasi Akun</div>} /> */}
          
          {/* --- Rute untuk Admin --- */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> */}
          
          {/* Rute untuk halaman tidak ditemukan */}
          <Route path="*" element={
            <div className="text-center p-16 min-h-[60vh]">
              <h1 className="text-4xl font-bold">404</h1>
              <p className="text-gray-600 mt-2">Halaman Tidak Ditemukan</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

