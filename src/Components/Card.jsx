// src/components/Card.jsx

/**
 * A reusable card component for wrapping content.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the card.
 * @param {string} [props.className] - Additional classes for custom styling.
 * @returns {JSX.Element}
 */
export default function Card({ children, className = '' }) {
  const baseClasses = "bg-white rounded-xl shadow-lg overflow-hidden p-6";

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
}
