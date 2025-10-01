// src/services/api.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Request Interceptor
// Fungsi ini akan dijalankan SEBELUM setiap request dikirim
apiClient.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');
    // Jika request menuju endpoint admin dan token ada, tambahkan header Authorization
    if (token && config.url.startsWith('/admin')) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// --- API PUBLIK UNTUK PENDAKI ---
// (Fungsi-fungsi yang sudah ada sebelumnya tetap di sini)
export const getSop = () => apiClient.get('/info/sop');
export const getWeather = () => apiClient.get('/info/weather');
export const checkQuota = (tanggal) => apiClient.get(`/quotas?tanggal=${tanggal}`);
export const createBooking = (bookingData) => apiClient.post('/bookings', bookingData);
export const checkBookingStatus = (kodeBooking) => apiClient.get(`/bookings/${kodeBooking}`);
export const uploadPaymentProof = (kodeBooking, formData) => {
  return apiClient.post(`/bookings/${kodeBooking}/payment`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// GET /admin/bookings/today
export const getTodayBookings = () => apiClient.get('/admin/bookings/today');

// POST /admin/checkin
export const checkinBooking = (kodeBooking) => apiClient.post('/admin/checkin', { kode_booking: kodeBooking });

// PATCH /admin/checkout
export const checkoutBooking = (kodeBooking) => apiClient.patch('/admin/checkout', { kode_booking: kodeBooking });

// GET /admin/history
export const getHistory = () => apiClient.get('/admin/history');


// --- API ADMIN ---

// POST /admin/login
export const loginAdmin = (credentials) => apiClient.post('/admin/login', credentials);

// GET /admin/payments
export const getPendingPayments = () => apiClient.get('/admin/payments');

// PATCH /admin/payments/{id}/verify
export const verifyPayment = (paymentId) => apiClient.patch(`/admin/payments/${paymentId}/verify`);

// GET /admin/hikers
export const getAllHikers = () => apiClient.get('/admin/hikers');

// PATCH /admin/hikers/{id}/blacklist
export const updateHikerStatus = (hikerId, data) => apiClient.patch(`/admin/hikers/${hikerId}/blacklist`, data);

export default apiClient;