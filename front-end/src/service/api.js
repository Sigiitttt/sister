import axios from 'axios';

// Konfigurasi utama untuk koneksi ke API Laravel Anda.
// Pastikan URL ini sesuai dengan alamat backend Anda saat dijalankan.
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Default URL untuk Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- API UNTUK PUBLIK / PENDAKI ---

/**
 * Mendapatkan data SOP pendakian.
 */
export const getSop = () => apiClient.get('/info/sop');

/**
 * Mendapatkan data cuaca terbaru.
 */
export const getWeather = () => apiClient.get('/info/weather');

/**
 * Mengecek kuota pendakian pada tanggal tertentu.
 * @param {string} date - Tanggal dengan format 'YYYY-MM-DD'.
 */
export const getQuotaByDate = (date) => apiClient.get(`/quotas?date=${date}`);

/**
 * Membuat booking baru.
 * @param {object} bookingData - Data booking dari form.
 */
export const createBooking = (bookingData) => apiClient.post('/bookings', bookingData);

/**
 * Mengecek status booking berdasarkan kode unik.
 * @param {string} bookingCode - Kode booking.
 */
export const checkBookingStatus = (bookingCode) => apiClient.get(`/bookings/${bookingCode}`);

/**
 * Mengunggah bukti pembayaran untuk sebuah booking.
 * @param {string} bookingCode - Kode booking.
 * @param {FormData} paymentData - Data form termasuk file bukti bayar.
 */
export const uploadPaymentProof = (bookingCode, paymentData) => {
  return apiClient.post(`/bookings/${bookingCode}/payment`, paymentData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Penting untuk upload file
    },
  });
};

// --- API UNTUK AUTENTIKASI ---

/**
 * Mendaftarkan user/pendaki baru.
 * @param {object} userData - Data user dari form registrasi.
 */
export const registerUser = (userData) => apiClient.post('/register', userData);

/**
 * Login untuk admin.
 * @param {object} credentials - Berisi email dan password admin.
 */
export const loginAdmin = (credentials) => apiClient.post('/admin/login', credentials);


// --- API KHUSUS ADMIN (MEMBUTUHKAN OTENTIKASI) ---
// CATATAN: Nanti kita akan menambahkan interceptor untuk menyisipkan token auth di sini.

/**
 * Mendapatkan daftar pembayaran yang menunggu verifikasi.
 */
export const getPendingPayments = () => apiClient.get('/admin/payments');

/**
 * Memverifikasi atau menolak pembayaran.
 * @param {number} paymentId - ID dari pembayaran.
 * @param {object} verificationData - Berisi status ('verified'/'rejected').
 */
export const verifyPayment = (paymentId, verificationData) => apiClient.patch(`/admin/payments/${paymentId}/verify`, verificationData);

/**
 * Mendapatkan daftar booking untuk check-in hari ini.
 */
export const getBookingsForToday = () => apiClient.get('/admin/bookings/today');

/**
 * Melakukan proses check-in untuk pendaki.
 * @param {object} checkinData - Data check-in.
 */
export const processCheckIn = (checkinData) => apiClient.post('/admin/checkin', checkinData);

/**
 * Melakukan proses check-out untuk pendaki.
 * @param {object} checkoutData - Data check-out.
 */
export const processCheckOut = (checkoutData) => apiClient.patch('/admin/checkout', checkoutData);

/**
 * Mendapatkan riwayat semua pendakian.
 */
export const getClimbingHistory = () => apiClient.get('/admin/history');

/**
 * Mendapatkan daftar semua pendaki.
 */
export const getAllHikers = () => apiClient.get('/admin/hikers');

/**
 * Memberikan status blacklist kepada pendaki.
 * @param {number} hikerId - ID dari pendaki.
 * @param {object} blacklistData - Berisi alasan blacklist.
 */
export const blacklistHiker = (hikerId, blacklistData) => apiClient.patch(`/admin/hikers/${hikerId}/blacklist`, blacklistData);
