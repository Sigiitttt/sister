import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWeather, getQuotaByDate } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

// Anda bisa mengganti URL gambar ini dengan gambar Gunung Penanggungan yang Anda miliki di folder `src/assets`
const heroImageUrl = 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2070&auto=format&fit=crop';

export default function HomePage() {
  const [weather, setWeather] = useState(null);
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError('');

        // 1. Ambil data cuaca
        const weatherResponse = await getWeather();
        setWeather(weatherResponse.data);

        // 2. Ambil data kuota untuk hari ini
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
        const quotaResponse = await getQuotaByDate(today);
        setQuota(quotaResponse.data);

      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError('Gagal memuat data dari server. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center text-white flex flex-col justify-center items-center"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Booking Pendakian Gunung Penanggungan
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Jelajahi keindahan Puncak Pawitra. Cek kuota dan booking jadwal pendakian Anda sekarang.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/cek-kuota">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Cek Kuota
              </Button>
            </Link>
            <Link to="/booking">
              <Button className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-lg px-8 py-3">
                Booking Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto p-4 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Informasi Hari Ini</h2>
        {loading && <p className="text-center text-gray-500">Memuat data...</p>}
        {error && <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="Info Cuaca Terkini">
              {weather ? (
                <div>
                  <p className="text-5xl text-center mb-2">{weather.suhu}°C</p>
                  <p className="text-xl text-center text-gray-600 capitalize">{weather.kondisi}</p>
                  <p className="text-sm text-center text-gray-400 mt-4">Sumber: {weather.sumber_api}</p>
                </div>
              ) : <p>Data cuaca tidak tersedia.</p>}
            </Card>
            
            <Card title={`Kuota Pendakian Hari Ini (${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })})`}>
               {quota ? (
                <div>
                  <p className="text-5xl text-center mb-2">
                    <span className="text-blue-600">{quota.kuota_max - quota.kuota_terpakai}</span>
                    <span className="text-2xl text-gray-500"> / {quota.kuota_max}</span>
                  </p>
                  <p className="text-xl text-center text-gray-600">Tersisa</p>
                </div>
              ) : <p>Data kuota tidak tersedia.</p>}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

