// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { getSop, getWeather } from '../services/api';
import Card from '../components/ui/Card';

const HomePage = () => {
  const [sopData, setSopData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [sopResponse, weatherResponse] = await Promise.all([
          getSop(),
          getWeather(),
        ]);

        setSopData(sopResponse.data.data);
        setWeatherData(weatherResponse.data.data);
        setError(null);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal memuat data dari server. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Memuat data...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Informasi Pendakian Gunung Penanggungan
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card untuk Informasi Cuaca */}
        <Card title="Informasi Cuaca Terkini">
          {weatherData && (
            <div className="space-y-2">
              <p>
                <strong>Lokasi:</strong> {weatherData.lokasi}
              </p>
              <p>
                <strong>Suhu:</strong> {weatherData.suhu}
              </p>
              <p>
                <strong>Kondisi:</strong> {weatherData.kondisi}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Diperbarui:{" "}
                {new Date(weatherData.timestamp).toLocaleString("id-ID")}
              </p>
            </div>
          )}
        </Card>

        {/* Card untuk SOP Pendakian */}
        <Card title="Standar Operasional Prosedur (SOP)">
          {sopData.length > 0 ? (
            <ol className="list-decimal list-inside space-y-2">
              {sopData.map((item) => (
                <li key={item.id}>{item.aturan}</li>
              ))}
            </ol>
          ) : (
            <p>SOP tidak tersedia.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
