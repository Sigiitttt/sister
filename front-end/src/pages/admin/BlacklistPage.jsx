// src/pages/admin/BlacklistPage.jsx

import React, { useState, useEffect } from 'react';
import { getAllHikers, updateHikerStatus } from '../../services/api';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const BlacklistPage = () => {
    const [hikers, setHikers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedHiker, setSelectedHiker] = useState(null);
    const [newStatus, setNewStatus] = useState('aktif');
    const [reason, setReason] = useState('');

    const fetchHikers = async () => {
        try {
            setLoading(true);
            const response = await getAllHikers();
            console.log("Response getAllHikers:", response.data); // DEBUG
            const data = response.data?.data; // cek ada atau tidak
            setHikers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data pendaki.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchHikers();
    }, []);

    const openEditModal = (hiker) => {
        setSelectedHiker(hiker);
        setNewStatus(hiker.status);
        setReason(hiker.alasan_blacklist || '');
        setModalOpen(true);
    };

    const handleUpdateStatus = async (e) => {
        e.preventDefault();
        if (!selectedHiker) return;
        if (newStatus === 'blacklist' && !reason) {
            alert("Alasan blacklist harus diisi!");
            return;
        }

        const dataToUpdate = {
            status: newStatus,
            alasan_blacklist: newStatus === 'blacklist' ? reason : "",
        };

        try {
            await updateHikerStatus(selectedHiker.id, dataToUpdate);
            alert("Status pendaki berhasil diperbarui.");
            setModalOpen(false);
            fetchHikers(); // Refresh data
        } catch (err) {
            console.error(err); // <-- supaya kepake
            alert("Gagal memperbarui status.");
        }

    };

    const StatusBadge = ({ status }) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
        </span>
    );

    if (loading) return <div>Memuat data...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Manajemen Blacklist Pendaki</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No Identitas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alasan Blacklist</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {hikers.map((hiker) => (
                            <tr key={hiker.id}>
                                <td className="px-6 py-4">{hiker.nama_lengkap}</td>
                                <td className="px-6 py-4">{hiker.no_identitas}</td>
                                <td className="px-6 py-4"><StatusBadge status={hiker.status} /></td>
                                <td className="px-6 py-4">{hiker.alasan_blacklist || '-'}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openEditModal(hiker)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                                    >
                                        Ubah Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title={`Ubah Status: ${selectedHiker?.nama_lengkap}`}
            >
                <form onSubmit={handleUpdateStatus}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status Baru</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="aktif">Aktif</option>
                                <option value="blacklist">Blacklist</option>
                            </select>
                        </div>
                        {newStatus === 'blacklist' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Alasan Blacklist (Wajib diisi)</label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows="3"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                        )}
                        <div className="text-right">
                            <Button type="submit">Simpan Perubahan</Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};



export default BlacklistPage;
