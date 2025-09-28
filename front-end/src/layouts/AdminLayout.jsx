import { Link, Outlet, useNavigate } from 'react-router-dom';

// Komponen NavLink kustom untuk styling link aktif
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2.5 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token admin dari local storage
    localStorage.removeItem('admin_token');
    alert('Anda telah logout.');
    // Arahkan kembali ke halaman login admin
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="h-16 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/verifikasi">Verifikasi Pembayaran</NavLink>
          <NavLink to="/admin/checkin-out">Check-in / Out</NavLink>
          <NavLink to="/admin/blacklist">Manajemen Blacklist</NavLink>
          <NavLink to="/admin/history">History Pendakian</NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Outlet akan merender komponen halaman spesifik (misal: DashboardPage) */}
        <Outlet />
      </main>
    </div>
  );
}
