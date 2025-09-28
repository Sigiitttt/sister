// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Layout akan diimpor setelah file-nya dibuat di src/layouts/Layout.jsx
// import Layout from './layouts/Layout.jsx';

// --- Halaman-halaman Aplikasi ---
// CATATAN: File-file ini perlu Anda buat di dalam folder `src/pages/`
// Untuk sementara, kita akan gunakan div placeholder.

// Halaman untuk Pendaki / Publik
// HomePage akan diimpor setelah file-nya dibuat di src/pages/HomePage.jsx
// import HomePage from './pages/HomePage.jsx';
// import CekKuotaPage from './pages/CekKuotaPage.jsx';
// import BookingPage from './pages/BookingPage.jsx';
// import CekStatusPage from './pages/CekStatusPage.jsx';
// import SopPage from './pages/SopPage.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';

// Halaman untuk Admin
// import AdminLoginPage from './pages/admin/AdminLoginPage.jsx';
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
// import VerifikasiPembayaranPage from './pages/admin/VerifikasiPembayaranPage.jsx';
// import CheckinPage from './pages/admin/CheckinPage.jsx';
// import CheckoutPage from './pages/admin/CheckoutPage.jsx';
// import HistoryPage from './pages/admin/HistoryPage.jsx';
// import ManajemenPendakiPage from './pages/admin/ManajemenPendakiPage.jsx';


function App() {
    return (
        <Router>
            {/* Layout akan membungkus Routes setelah komponennya dibuat dan diimpor */}
            {/* <Layout> */}
            <Routes>
                {/* --- Rute untuk Publik / Pendaki --- */}
                <Route path="/" element={<div>Halaman Home</div>} /> {/* Sementara menggunakan placeholder */}
                <Route path="/cek-kuota" element={<div>Halaman Cek Kuota</div>} />
                <Route path="/booking" element={<div>Halaman Booking</div>} />
                <Route path="/cek-status" element={<div>Halaman Cek Status</div>} />
                <Route path="/sop" element={<div>Halaman SOP</div>} />
                <Route path="/register" element={<div>Halaman Registrasi</div>} />

                {/* --- Rute untuk Admin --- */}
                <Route path="/admin/login" element={<div>Halaman Login Admin</div>} />
                <Route path="/admin/dashboard" element={<div>Halaman Dashboard Admin</div>} />
                <Route path="/admin/verifikasi-pembayaran" element={<div>Halaman Verifikasi Pembayaran</div>} />
                <Route path="/admin/check-in" element={<div>Halaman Check-in</div>} />
                <Route path="/admin/check-out" element={<div>Halaman Check-out</div>} />
                <Route path="/admin/history" element={<div>Halaman Riwayat Pendakian</div>} />
                <Route path="/admin/manajemen-pendaki" element={<div>Halaman Manajemen Pendaki</div>} />

                {/* Rute untuk halaman tidak ditemukan */}
                <Route path="*" element={<div>404 - Halaman Tidak Ditemukan</div>} />
            </Routes>
            {/* </Layout> */}
        </Router>
    );
}

export default App;

