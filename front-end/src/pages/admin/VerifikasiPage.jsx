import { useEffect, useState } from 'react';
import { getAllHikers, updateHikerStatus } from '../../services/api.js';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';
import Modal from '../../components/Modal.jsx';

export default function BlacklistPage() {
    const [hikers, setHikers] = useState([]);
    const [filteredHikers, setFilteredHikers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedHiker, setSelectedHiker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reason, setReason] = useState('');

    // Fungsi untuk memuat data semua pendaki
    const fetchAllHikers = async () => {
        setIsLoading(true);
        try {
            const response = await getAllHikers();
            setHikers(response.data.data);
            setFilteredHikers(response.data.data);
        } catch (err) {
            setError('Gagal memuat data pendaki. Pastikan backend berjalan.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllHikers();
    }, []);

    // Fungsi untuk filtering/pencarian
    useEffect(() => {
        const results = hikers.filter(hiker =>
            hiker.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hiker.no_identitas.includes(searchTerm)
        );
        setFilteredHikers(results);
    }, [searchTerm, hikers]);

    const openBlacklistModal = (hiker) => {
        setSelectedHiker(hiker);
        setReason(hiker.alasan_blacklist || '');
        setIsModalOpen(true);
    };

    const handleStatusUpdate = async () => {
        if (!selectedHiker) return;

        const newStatus = selectedHiker.status === 'blacklist' ? 'aktif' : 'blacklist';
        // Alasan hanya wajib jika statusnya menjadi blacklist
        if (newStatus === 'blacklist' && !reason.trim()) {
            alert('Alasan wajib diisi untuk mem-blacklist pendaki.');
            return;
        }

        try {
            await updateHikerStatus(selectedHiker.id, {
                status: newStatus,
                alasan_blacklist: newStatus === 'blacklist' ? reason : null,
            });
            alert(`Status pendaki ${selectedHiker.nama_lengkap} berhasil diubah menjadi ${newStatus}.`);
            setIsModalOpen(false);
            setSelectedHiker(null);
            setReason('');
            // Muat ulang data
            fetchAllHikers();
        } catch (err) {
            alert('Gagal mengubah status pendaki.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Blacklist Pendaki</h1>

            {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

            <Card className="shadow-lg mb-6">
                <Input
                    type="text"
                    placeholder="Cari nama atau nomor identitas pendaki..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Card>

            <Card className="shadow-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Identitas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isLoading ? (
                                <tr><td colSpan="4" className="text-center py-4">Memuat data...</td></tr>
                            ) : filteredHikers.length === 0 ? (
                                <tr><td colSpan="4" className="text-center py-4">Data pendaki tidak ditemukan.</td></tr>
                            ) : (
                                filteredHikers.map((hiker) => (
                                    <tr key={hiker.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{hiker.nama_lengkap}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono">{hiker.no_identitas}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${hiker.status === 'blacklist' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {hiker.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button onClick={() => openBlacklistModal(hiker)} className="bg-yellow-500 hover:bg-yellow-600 text-xs py-1 px-2">
                                                Ubah Status
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isModalOpen && selectedHiker && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`Ubah Status: ${selectedHiker.nama_lengkap}`}
                >
                    <div className="space-y-4">
                        <p>
                            Status saat ini: <span className="font-bold">{selectedHiker.status}</span>.
                            Anda akan mengubah status menjadi <span className="font-bold">{selectedHiker.status === 'blacklist' ? 'aktif' : 'blacklist'}</span>.
                        </p>
                        {selectedHiker.status !== 'blacklist' && (
                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Alasan Blacklist (Wajib diisi)</label>
                                <textarea
                                    id="reason"
                                    rows="3"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </div>
                        )}
                        <div className="flex justify-end space-x-2">
                            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800">Batal</Button>
                            <Button onClick={handleStatusUpdate} className="bg-blue-600 hover:bg-blue-700">Simpan Perubahan</Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

