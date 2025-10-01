// src/pages/admin/AdminDashboardPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ClipboardList, Ban } from "lucide-react";
import Card from "../../components/ui/Card";

const menuItems = [
  {
    title: "Verifikasi Pembayaran",
    desc: "Lihat dan verifikasi pembayaran yang masuk.",
    link: "/admin/verifikasi",
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "Operasional Harian",
    desc: "Proses check-in, check-out, dan lihat riwayat.",
    link: "/admin/operasional",
    icon: <ClipboardList className="w-8 h-8 text-indigo-400" />,
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    title: "Manajemen Blacklist",
    desc: "Kelola daftar pendaki yang di-blacklist.",
    link: "/admin/blacklist",
    icon: <Ban className="w-8 h-8 text-red-500" />,
    gradient: "from-red-600 to-pink-600",
  },
];

const AdminDashboardPage = () => {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-white">Dashboard Admin</h1>
        <p className="mt-2 text-gray-400">
          Kelola sistem operasional dan data dengan mudah.
        </p>
      </header>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item, i) => (
          <Link key={i} to={item.link}>
            <Card className="relative group bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="relative flex items-center gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient} bg-opacity-20`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </div>
              <p className="mt-3 text-gray-400">{item.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
