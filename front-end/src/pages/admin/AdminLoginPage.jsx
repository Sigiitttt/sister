import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/api.js';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setIsLoading(true);
    setError(null);
    try {
      const response = await loginAdmin(formData);
      // Simpan token admin ke local storage untuk sesi login
      localStorage.setItem('admin_token', response.data.token);
      alert('Login Admin Berhasil!');
      navigate('/admin/dashboard'); // Arahkan ke dashboard admin
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email atau password salah.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Portal Login Admin
          </h2>
           <p className="mt-2 text-center text-sm text-gray-400">
            Akses dashboard manajemen pendakian.
          </p>
        </div>
        <Card className="bg-gray-800 border border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Input
              name="email"
              type="email"
              placeholder="Alamat Email Admin"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-700 text-white border-gray-600 placeholder-gray-400"
            />
            <div>
              <Button type="submit" disabled={isLoading} className="w-full justify-center bg-green-600 hover:bg-green-700">
                {isLoading ? 'Memproses...' : 'Login'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

