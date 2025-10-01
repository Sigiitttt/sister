// src/pages/admin/OperationalPage.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { getTodayBookings, checkinBooking, checkoutBooking, getHistory } from '../../services/api';
import Button from '../../components/ui/Button';

const OperationalPage = () => {
  const [activeTab, setActiveTab] = useState('checkin'); // 'checkin' atau 'history'
  const [todayBookings, setTodayBookings] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fungsi untuk mengambil data berdasarkan tab yang aktif
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'checkin') {
        const response = await getTodayBookings(); // API untuk booking hari ini [cite: 185]
        setTodayBookings(response.data.data);
      } else {
        const response = await getHistory(); // API untuk riwayat pendakian 
        setHistory(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data.');
    } finally {
      setLoading(false);
    }
  };

  // Ambil data setiap kali tab berubah
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleCheckin = async (kodeBooking) => {
    if (!window.confirm(`Lakukan check-in untuk booking ${kodeBooking}?`)) return;
    try {
      await checkinBooking(kodeBooking); // API untuk check-in [cite: 201]
      alert('Check-in berhasil.');
      fetchData(); // Refresh data
    } catch (err) {
      alert('Gagal melakukan check-in.');
    }
  };

  const handleCheckout = async (kodeBooking) => {
    if (!window.confirm(`Lakukan check-out untuk booking ${kodeBooking}?`)) return;
    try {
      await checkoutBooking(kodeBooking); // API untuk check-out [cite: 214]
      alert('Check-out berhasil.');
      fetchData(); // Refresh data
    } catch (err) {
      alert('Gagal melakukan check-out.');
    }
  };

  // Filter booking berdasarkan pencarian
  const filteredBookings = useMemo(() =>
    todayBookings.filter(booking =>
      booking.kode_booking.toLowerCase().includes(searchQuery.toLowerCase())
    ), [todayBookings, searchQuery]
  );
  
  const renderContent = () => {
    if (loading) return <div>Memuat data...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    if (activeTab === 'checkin') {
      return (
        <div>
          <input
            type="text"
            placeholder="Cari berdasarkan kode booking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-sm"
          />
          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode Booking</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ketua</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Pendaki</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length > 0 ? filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4">{booking.kode_booking}</td>
                    <td className="px-6 py-4">{booking.ketua}</td>
                    <td className="px-6 py-4">{booking.jumlah_pendaki}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status_pendakian === 'verified' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {booking.status_pendakian}
                        </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {booking.status_pendakian === 'verified' && <Button variant="primary" onClick={() => handleCheckin(booking.kode_booking)}>Check-in</Button>}
                      {booking.status_pendakian === 'checked_in' && <Button variant="secondary" onClick={() => handleCheckout(booking.kode_booking)}>Check-out</Button>}
                    </td>
                  </tr>
                )) : <tr><td colSpan="5" className="text-center py-4">Tidak ada booking untuk hari ini.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'history') {
      return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode Booking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Pendakian</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ketua</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah Pendaki</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.length > 0 ? history.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{item.kode_booking}</td>
                  <td className="px-6 py-4">{new Date(item.tanggal_pendakian).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-4">{item.ketua}</td>
                  <td className="px-6 py-4">{item.jumlah_pendaki}</td>
                </tr>
              )) : <tr><td colSpan="4" className="text-center py-4">Riwayat pendakian masih kosong.</td></tr>}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Operasional Harian</h1>
      <div className="mb-4 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('checkin')}
            className={`${activeTab === 'checkin' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Check-in & Check-out
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${activeTab === 'history' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Riwayat Pendakian
          </button>
        </nav>
      </div>
      {renderContent()}
    </div>
  );
};

export default OperationalPage;