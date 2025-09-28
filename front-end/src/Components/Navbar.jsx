// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import Button from './Button.jsx';

export default function Navbar() {
  // Helper function for NavLink classes
  const getNavLinkClass = ({ isActive }) =>
    isActive 
      ? 'text-green-600 font-bold border-b-2 border-green-600' 
      : 'text-gray-700 hover:text-green-600';

  return (
    <nav className="sticky top-0 z-40 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          <span className="text-green-600">Puncak</span>Penanggungan
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/cek-kuota" className={getNavLinkClass}>Cek Kuota</NavLink>
          <NavLink to="/booking" className={getNavLinkClass}>Booking</NavLink>
          <NavLink to="/sop" className={getNavLinkClass}>SOP</NavLink>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Link to="/admin/login">
            <Button className="bg-gray-800 hover:bg-black focus:ring-gray-700">
              Admin Login
            </Button>
          </Link>
        </div>

        {/* TODO: Mobile Menu Button */}
        <div className="md:hidden">
            <button>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            </button>
        </div>
      </div>
    </nav>
  );
}

