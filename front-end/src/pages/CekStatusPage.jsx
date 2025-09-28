import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

// Komponen kecil untuk setiap anggota
const AnggotaPendaki = ({ index, anggota, handleAnggotaChange, hapusAnggota }) => (
  <div className="border rounded-lg p-4 mb-4 relative">
    <h4 className="font-semibold mb-2">Anggota {index + 1}</h4>
    {index > 0 && (
      <button
        type="button"
        onClick={() => hapusAnggota(index)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
      >
        &times;
      </button>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Input
        placeholder="Nama Lengkap"
        name="nama_lengkap"
        value={anggota.nama_lengkap}
        onChange={(e) => handleAnggotaChange(index, e)}
        required
      />
      <Input
        placeholder="No. Identitas (KTP/SIM)"
        name="no_identitas"
        value={anggota.no_identitas}
        onChange={(e) => handleAnggotaChange(index, e)}
        required
      />
    </div>
  </div>
);


export default function BookingPage() {
  const [formData, setFormData] = useState({
    tanggal_pendakian: new Date().toISOString().split('T')[0],
    anggota: [{ nama_lengkap: '', no_identitas: '' }] // Ketua selalu ada di index 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAnggotaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAnggota = [...formData.anggota];
    updatedAnggota[index][name] = value;
    setFormData(prev => ({ ...prev, anggota: updatedAnggota }));
  };

  const tambahAnggota = () => {
    setFormData(prev => ({
      ...prev,
      anggota: [...prev.anggota, { nama_lengkap: '', no_identitas: '' }]
    }));
  };

  const hapusAnggota = (index) => {
    if (formData.anggota.length <= 1) return; // Minimal 1 anggota (ketua)
    const updatedAnggota = formData.anggota.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, anggota: updatedAnggota }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await createBooking(formData);
      setBookingResult(response.data);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Gagal membuat booking:", err);
      const errorMessage = err.response?.data?.message || 'Terjadi kesalahan pada server.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/cek-status?kode=${bookingResult.kode_booking}`);
  }

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Formulir Booking Pendakian</h1>
        <form onSubmit={handleSubmit}>
          <Card title="1. Informasi Pendakian">
            <div className="w-full md:w-1/2">
              <label htmlFor="tanggal_pendakian" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Tanggal Naik
              </label>
              <Input
                type="date"
                id="tanggal_pendakian"
                name="tanggal_pendakian"
                value={formData.tanggal_pendakian}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </Card>

          <Card title="2. Data Anggota Tim" className="mt-8">
            <p className="text-sm text-gray-500 mb-4">Data pertama yang diisi adalah data ketua tim.</p>
            {formData.anggota.map((anggota, index) => (
              <AnggotaPendaki
                key={index}
                index={index}
                anggota={anggota}
                handleAnggotaChange={handleAnggotaChange}
                hapusAnggota={hapusAnggota}
              />
            ))}
            <Button type="button" onClick={tambahAnggota} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              + Tambah Anggota
            </Button>
          </Card>

          {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg my-4">{error}</p>}

          <div className="mt-8 text-center">
            <Button type="submit" disabled={loading} className="w-full md:w-1/2 py-3 text-lg">
              {loading ? 'Memproses Booking...' : 'Submit Booking'}
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Booking Berhasil!"
      >
        <div className="text-center">
            <p className="text-gray-600 mb-4">Booking Anda telah berhasil dibuat. Silakan lakukan pembayaran sebelum batas waktu yang ditentukan.</p>
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-500">Kode Booking Anda:</p>
                <p className="text-2xl font-bold text-blue-600 tracking-widest">{bookingResult?.kode_booking}</p>
            </div>
            <Button onClick={handleCloseModal} className="mt-6 w-full">
                Lihat Status & Instruksi Pembayaran
            </Button>
        </div>
      </Modal>
    </div>
  );
}

