import { useEffect, useState } from 'react';
import { getAdminDashboardStats } from '../../services/api.js';
import Card from '../../components/Card.jsx';

// Komponen untuk kartu statistik
const StatCard = ({ title, value, isLoading }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow">
    <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
    {isLoading ? (
      <div className="h-12 w-20 bg-gray-200 rounded animate-pulse mt-2"></div>
    ) : (
      <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
    )}
  </Card>
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    pendingPayments: 0,
    activeHikers: 0,
    todayBookings: 0,
    blacklistedHikers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data statistik dari API
    const fetchStats = async () => {
      try {
        const response = await getAdminDashboardStats();
        setStats(response.data.data); // Sesuaikan jika data ada di dalam properti 'data'
      } catch (err) {
        setError('Gagal memuat data statistik. Pastikan backend berjalan.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Pembayaran Pending" value={stats.pendingPayments} isLoading={isLoading} />
        <StatCard title="Pendaki Sedang Naik" value={stats.activeHikers} isLoading={isLoading} />
        <StatCard title="Booking Hari Ini" value={stats.todayBookings} isLoading={isLoading} />
        <StatCard title="Pendaki di-Blacklist" value={stats.blacklistedHikers} isLoading={isLoading} />
      </div>

      <div className="mt-10">
        <Card className="shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Terkini</h2>
            <p className="text-gray-600">
              Menampilkan daftar booking terbaru atau pembayaran yang baru masuk akan menjadi fitur yang bagus di sini.
            </p>
        </Card>
      </div>
    </div>
  );
}
