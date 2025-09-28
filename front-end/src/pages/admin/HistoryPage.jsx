import { useState } from 'react';
import { getBookingForCheckin, processCheckin, processCheckout } from '../../services/api';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function CheckInOutPage() {
    const [kodeBooking, setKodeBooking] = useState('');
    const [bookingData, setBookingData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!kodeBooking.trim()) {
            setError('Kode booking tidak boleh kosong.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setBookingData(null);
        try {
            const response = await getBookingForCheckin(kodeBooking);
            setBookingData(response.data.data);
        } catch (err) {
            setError('Booking tidak ditemukan atau terjadi kesalahan.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckin = async (memberId) => {
        try {
            await processCheckin({ booking_id: bookingData.id, hiker_id: memberId });
            alert('Check-in berhasil dicatat.');
            // Refresh data booking untuk melihat status terbaru
            // Create a new event object to pass to handleSearch
            const syntheticEvent = { preventDefault: () => { } };
            handleSearch(syntheticEvent);
        } catch (err) {
            alert('Gagal mencatat check-in.');
            console.error(err);
        }
    };

    const handleCheckout = async (memberId) => {
        try {
            await processCheckout({ booking_id: bookingData.id, hiker_id: memberId });
            alert('Check-out berhasil dicatat.');
            // Refresh data booking
            const syntheticEvent = { preventDefault: () => { } };
            handleSearch(syntheticEvent);
        } catch (err) {
            alert('Gagal mencatat check-out.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Check-in & Check-out Pendaki</h1>

            <Card className="shadow-lg mb-6">
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Masukkan Kode Booking..."
                        value={kodeBooking}
                        onChange={(e) => setKodeBooking(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Mencari...' : 'Cari'}
                    </Button>
                </form>
            </Card>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            {bookingData && (
                <Card className="shadow-lg">
                    <div className="p-4 border-b">
                        <h2 className="text-xl font-bold">Detail Booking: {bookingData.kode_booking}</h2>
                        <p>Ketua: <span className="font-semibold">{bookingData.ketua.nama_lengkap}</span></p>
                        <p>Tanggal Pendakian: <span className="font-semibold">{new Date(bookingData.tanggal_pendakian).toLocaleDateString('id-ID')}</span></p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Anggota</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookingData.members.map(member => (
                                    <tr key={member.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{member.hiker.nama_lengkap}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {member.checkin_time && !member.checkout_time && <span className="text-blue-600 font-semibold">Sedang Mendaki</span>}
                                            {member.checkin_time && member.checkout_time && <span className="text-green-600 font-semibold">Selesai</span>}
                                            {!member.checkin_time && <span className="text-gray-500">Belum Check-in</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            {!member.checkin_time && (
                                                <Button onClick={() => handleCheckin(member.hiker.id)} className="bg-green-500 hover:bg-green-600 text-xs py-1 px-2">Check-in</Button>
                                            )}
                                            {member.checkin_time && !member.checkout_time && (
                                                <Button onClick={() => handleCheckout(member.hiker.id)} className="bg-yellow-500 hover:bg-yellow-600 text-xs py-1 px-2">Check-out</Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
}

