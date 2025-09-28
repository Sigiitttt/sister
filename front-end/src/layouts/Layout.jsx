// src/layouts/Layout.jsx
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

/**
 * A wrapper component for consistent page layout.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The page content to be displayed.
 * @returns {JSX.Element}
 */
export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        {/* The main content of each page will be rendered here */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

