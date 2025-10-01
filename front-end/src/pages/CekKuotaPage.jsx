import React, { useState } from 'react';
import { checkQuota } from '../services/api';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CekKuotaPage = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [quotaData, setQuotaData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('Silakan pilih tanggal untuk melihat kuota yang tersedia.');

    // Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const handleCheckQuota = async (e) => {
        e.preventDefault(); // Mencegah form dari reload halaman

        if (!selectedDate) {
            setError('Tanggal harus dipilih terlebih dahulu.');
            return;
        }

        setLoading(true);
        setError(null);
        setQuotaData(null);
        setMessage(null);

        try {
            // 1. Memanggil fungsi API 'checkQuota' dengan tanggal yang dipilih
            const response = await checkQuota(selectedDate);

            // 2. Menyimpan data yang diterima dari backend ke dalam state
            // Data ini berasal dari database yang diakses oleh backend
            setQuotaData(response.data.data); // [cite: 68]
        } catch (err) {
            console.error("Gagal mengecek kuota:", err);
            setError("Gagal mengambil data kuota. Silakan coba lagi.");
            if (err.response && err.response.status === 404) {
                setError(`Tidak ada data kuota untuk tanggal ${selectedDate}.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Cek Ketersediaan Kuota Pendakian">
            <form onSubmit={handleCheckQuota} className="space-y-4">
                <Input
                    label="Pilih Tanggal Pendakian"
                    id="tanggal_pendakian"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    min={getTodayDate()}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Mencari...' : 'Cek Kuota'}
                </Button>
            </form>

            <div className="mt-6">
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-gray-600">{message}</p>}

                {/* 3. Menampilkan data yang berhasil diambil */}
                {quotaData && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                        <p className="font-semibold text-gray-800">
                            Hasil Pengecekan untuk Tanggal: {new Date(quotaData.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-2xl font-bold text-green-700 mt-2">
                            Kuota Tersedia: {quotaData.kuota_tersedia} orang
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default CekKuotaPage;