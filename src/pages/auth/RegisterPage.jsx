import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api.js';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        telepon: '',
        password: '',
        password_confirmation: '',
        nama_lengkap: '',
        no_identitas: '',
        alamat: '',
        tanggal_lahir: '',
        jenis_kelamin: 'Laki-laki',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            setError('Konfirmasi password tidak cocok.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await registerUser(formData);
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Terjadi kesalahan saat registrasi.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Buat Akun Pendaki Baru
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sudah punya akun?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Login di sini
                        </Link>
                    </p>
                </div>
                <Card>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Informasi Akun</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input name="username" type="text" placeholder="Username" required value={formData.username} onChange={handleChange} />
                            <Input name="email" type="email" placeholder="Alamat Email" required value={formData.email} onChange={handleChange} />
                            <Input name="telepon" type="tel" placeholder="Nomor Telepon" required value={formData.telepon} onChange={handleChange} />
                            <Input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
                            <Input name="password_confirmation" type="password" placeholder="Konfirmasi Password" required value={formData.password_confirmation} onChange={handleChange} />
                        </div>

                        <h3 className="text-lg font-medium text-gray-800 border-b pb-2 pt-4">Informasi Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input name="nama_lengkap" type="text" placeholder="Nama Lengkap Sesuai KTP" required value={formData.nama_lengkap} onChange={handleChange} />
                            <Input name="no_identitas" type="text" placeholder="No. Identitas (KTP/SIM)" required value={formData.no_identitas} onChange={handleChange} />
                            <Input name="tanggal_lahir" type="date" placeholder="Tanggal Lahir" required value={formData.tanggal_lahir} onChange={handleChange} />
                            <div>
                                <label htmlFor="jenis_kelamin" className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                <select id="jenis_kelamin" name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <option>Laki-laki</option>
                                    <option>Perempuan</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <textarea name="alamat" placeholder="Alamat Lengkap" required value={formData.alamat} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300" rows="3"></textarea>
                            </div>
                        </div>

                        <div>
                            <Button type="submit" disabled={isLoading} className="w-full justify-center">
                                {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

