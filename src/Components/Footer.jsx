// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container px-4 py-8 mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Booking Pendakian Gunung Penanggungan.</p>
        <p className="mt-2 text-sm text-gray-400">
          Dikembangkan oleh [Nama Kelompok Anda] untuk Mata Kuliah Sistem Terdistribusi.
        </p>
      </div>
    </footer>
  );
}
