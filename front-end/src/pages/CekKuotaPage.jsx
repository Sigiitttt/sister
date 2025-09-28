import React, { useState } from 'react';
import { getQuotaByDate } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

export default function CekKuotaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false); // Untuk menandai apakah pencarian sudah dilakukan

  const handleCekKuota = async (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError('Silakan pilih tanggal terlebih dahulu.');
      return;
    }

    setLoading(true);
    setError('');
    setQuota(null);
    setSearched(true);

    try {
      const response = await getQuotaByDate(selectedDate);
      setQuota(response.data);
    } catch (err) {
      console.error("Gagal mengambil data kuota:", err);
      if (err.response && err.response.status === 404) {
        setError(`Kuota untuk tanggal ${new Date(selectedDate).toLocaleDateString('id-ID', { dateStyle: 'long' })} belum ditetapkan.`);
      } else {
        setError('Gagal terhubung ke server. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-[70vh]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Cek Kuota Pendakian</h1>
        <p className="text-center text-gray-500 mb-8">Pilih tanggal untuk melihat ketersediaan kuota pendakian.</p>

        <Card>
          <form onSubmit={handleCekKuota} className="flex flex-col sm:flex-row items-end gap-4">
            <div className="w-full">
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">
                Pilih Tanggal Pendakian
              </label>
              <Input
                type="date"
                id="tanggal"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Tanggal minimal adalah hari ini
                className="py-3"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full sm:w-auto py-3">
              {loading ? 'Mencari...' : 'Cek Kuota'}
            </Button>
          </form>
        </Card>

        <div className="mt-8">
          {loading && <p className="text-center text-gray-500">Mencari kuota...</p>}
          {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}

          {searched && !loading && !error && quota && (
            <Card title={`Hasil Kuota untuk ${new Date(selectedDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`}>
              <div className="text-center">
                <p className="text-6xl font-bold">
                  <span className="text-blue-600">{quota.kuota_max - quota.kuota_terpakai}</span>
                  <span className="text-3xl text-gray-500"> / {quota.kuota_max}</span>
                </p>
                <p className="text-2xl text-gray-700 mt-2">Kuota Tersisa</p>
                {(quota.kuota_max - quota.kuota_terpakai) > 0 ? (
                  <p className="text-green-600 mt-4">Tersedia untuk booking.</p>
                ) : (
                  <p className="text-red-600 mt-4">Kuota sudah penuh.</p>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
