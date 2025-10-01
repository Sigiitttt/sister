// src/pages/admin/VerificationPage.jsx

import React, { useState, useEffect } from 'react';
import { getPendingPayments, verifyPayment } from '../../services/api';

const VerificationPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      // Mengambil daftar pembayaran pending
      const response = await getPendingPayments();
      setPayments(response.data.data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pembayaran.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (paymentId) => {
    if (!window.confirm("Apakah Anda yakin ingin memverifikasi pembayaran ini?")) return;

    try {
      // Memverifikasi pembayaran
      await verifyPayment(paymentId);
      alert("Pembayaran berhasil diverifikasi.");
      // Refresh data pembayaran
      fetchPayments();
    } catch (err) {
      console.error(err);
      alert("Gagal memverifikasi pembayaran.");
    }
  };

  if (loading) return <div>Memuat data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Verifikasi Pembayaran</h1>
      {payments.length === 0 ? (
        <p>Tidak ada pembayaran yang menunggu verifikasi.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode Booking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bukti Bayar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {payment.booking.kode_booking}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rp {payment.jumlah.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`http://127.0.0.1:8000/storage/${payment.bukti_bayar}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Lihat Bukti
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleVerify(payment.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Verifikasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerificationPage;
