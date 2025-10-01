// src/pages/CekBookingPage.jsx

import React, { useState } from 'react';
import { checkBookingStatus } from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CekBookingPage = () => {
  const [kodeBooking, setKodeBooking] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('Masukkan kode booking Anda untuk melihat status.');

  const handleCekStatus = async (e) => {
    e.preventDefault();
    if (!kodeBooking) {
      setError('Kode booking tidak boleh kosong.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setBookingDetails(null);
    setMessage(null);

    try {
      const response = await checkBookingStatus(kodeBooking);
      setBookingDetails(response.data.data); // Simpan detail booking [cite: 110]
    } catch (err) {
      console.error("Gagal cek status:", err);
      setBookingDetails(null);
      setError(err.response?.data?.message || 'Kode booking tidak ditemukan atau terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };
  
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      verified: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      booked: 'bg-blue-100 text-blue-800',
      checked_in: 'bg-indigo-100 text-indigo-800',
      checked_out: 'bg-gray-100 text-gray-800',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || statusStyles['booked']}`}>
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };


  return (
    <Card title="Cek Status Booking">
      <form onSubmit={handleCekStatus} className="flex items-end gap-4">
        <Input
          label="Kode Booking"
          id="kode_booking"
          value={kodeBooking}
          onChange={(e) => setKodeBooking(e.target.value)}
          placeholder="Contoh: PENAN-ABCDE123"
        />
        <Button type="submit" disabled={loading} className="h-10">
          {loading ? 'Mencari...' : 'Cari'}
        </Button>
      </form>

      <div className="mt-6">
        {message && <p className="text-gray-600">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {bookingDetails && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Detail Booking: {bookingDetails.kode_booking}</h3>
            <div className="p-4 border rounded-md grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tanggal Pendakian</p>
                <p className="font-semibold">{new Date(bookingDetails.tanggal_pendakian).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Pembayaran</p>
                <p><StatusBadge status={bookingDetails.status_pembayaran} /></p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status Pendakian</p>
                <p><StatusBadge status={bookingDetails.status_pendakian} /></p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bayar</p>
                <p className="font-semibold">Rp {bookingDetails.total_bayar.toLocaleString('id-ID')}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Ketua Kelompok</p>
                <p className="font-semibold">{bookingDetails.ketua}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Anggota</p>
                <ul className="list-disc list-inside">
                  {bookingDetails.anggota.map((nama, index) => (
                    <li key={index} className="font-semibold">{nama}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CekBookingPage;