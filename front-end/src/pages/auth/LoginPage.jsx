import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api.js';
import Card from '../../components/Card.jsx';
import Button from '../../components/Button.jsx';
import Input from '../../components/Input.jsx';

export default function LoginPage() {
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
      const response = await loginUser(formData);
      // Simpan token atau data user jika perlu, contoh:
      // localStorage.setItem('token', response.data.token);
      alert('Login berhasil!');
      navigate('/'); // Arahkan ke halaman utama setelah login
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Email atau password salah.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login ke Akun Anda
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Daftar di sini
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
            <Input
              name="email"
              type="email"
              placeholder="Alamat Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <div>
              <Button type="submit" disabled={isLoading} className="w-full justify-center">
                {isLoading ? 'Memproses...' : 'Login'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

