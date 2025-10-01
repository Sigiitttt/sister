// src/pages/BookingPage.jsx

import React, { useState } from 'react';
import { createBooking } from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    tanggal_pendakian: '',
    ketua: {
      nama_lengkap: '',
      no_identitas: '',
      tanggal_lahir: '',
      jenis_kelamin: 'Laki-laki',
      alamat: '',
      telepon: '',
    },
    anggota: [],
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Handler untuk perubahan data ketua
  const handleKetuaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ketua: { ...prev.ketua, [name]: value },
    }));
  };

  // Handler untuk perubahan data anggota
  const handleAnggotaChange = (index, e) => {
    const { name, value } = e.target;
    const newAnggota = [...formData.anggota];
    newAnggota[index][name] = value;
    setFormData((prev) => ({ ...prev, anggota: newAnggota }));
  };

  // Fungsi untuk menambah field anggota baru
  const addAnggota = () => {
    setFormData((prev) => ({
      ...prev,
      anggota: [...prev.anggota, { nama_lengkap: '', no_identitas: '' }],
    }));
  };

  // Fungsi untuk menghapus field anggota
  const removeAnggota = (index) => {
    setFormData((prev) => ({
      ...prev,
      anggota: prev.anggota.filter((_, i) => i !== index),
    }));
  };

  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await createBooking(formData);
      setBookingResult(response.data.data); // data: { kode_booking, total_bayar }
      setModalOpen(true);
    } catch (err) {
      console.error("Booking gagal:", err);
      setError(err.response?.data?.message || "Terjadi kesalahan saat membuat booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card title="Formulir Pendaftaran Pendakian">
          {error && <p className="mb-4 text-center text-red-500 bg-red-100 p-3 rounded-md">{error}</p>}
          <div className="space-y-6">
            <Input
              label="Tanggal Pendakian"
              type="date"
              name="tanggal_pendakian"
              value={formData.tanggal_pendakian}
              onChange={(e) => setFormData({ ...formData, tanggal_pendakian: e.target.value })}
              required
            />
            
            <hr />
            <h3 className="text-xl font-semibold">Data Ketua Kelompok</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nama Lengkap" name="nama_lengkap" value={formData.ketua.nama_lengkap} onChange={handleKetuaChange} required />
              <Input label="No. Identitas (KTP/SIM)" name="no_identitas" value={formData.ketua.no_identitas} onChange={handleKetuaChange} required />
              <Input label="Tanggal Lahir" name="tanggal_lahir" type="date" value={formData.ketua.tanggal_lahir} onChange={handleKetuaChange} required />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                <select name="jenis_kelamin" value={formData.ketua.jenis_kelamin} onChange={handleKetuaChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
              <Input label="No. Telepon" name="telepon" type="tel" value={formData.ketua.telepon} onChange={handleKetuaChange} required />
              <Input label="Alamat" name="alamat" value={formData.ketua.alamat} onChange={handleKetuaChange} required className="md:col-span-2" />
            </div>

            <hr />
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Data Anggota</h3>
              <Button type="button" variant="secondary" onClick={addAnggota}>Tambah Anggota</Button>
            </div>
            {formData.anggota.map((anggota, index) => (
              <div key={index} className="p-4 border rounded-md relative space-y-4">
                <p className="font-semibold">Anggota {index + 1}</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nama Lengkap" name="nama_lengkap" value={anggota.nama_lengkap} onChange={(e) => handleAnggotaChange(index, e)} required />
                    <Input label="No. Identitas (KTP/SIM)" name="no_identitas" value={anggota.no_identitas} onChange={(e) => handleAnggotaChange(index, e)} required />
                 </div>
                <Button type="button" variant="danger" className="absolute top-2 right-2" onClick={() => removeAnggota(index)}>Hapus</Button>
              </div>
            ))}

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Memproses...' : 'Daftar Sekarang'}
              </Button>
            </div>
          </div>
        </Card>
      </form>
      
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Booking Berhasil">
        {bookingResult && (
          <div className="space-y-3">
            <p>Pendaftaran Anda telah berhasil dibuat.</p>
            <p className="text-lg font-bold">
              Kode Booking Anda: <span className="text-blue-600">{bookingResult.kode_booking}</span>
            </p>
            <p>
              Total Pembayaran: <span className="font-semibold">Rp {bookingResult.total_bayar.toLocaleString('id-ID')}</span>
            </p>
            <p className="text-sm text-gray-600">
              Silakan simpan kode booking Anda untuk mengecek status dan melakukan konfirmasi pembayaran.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BookingPage;