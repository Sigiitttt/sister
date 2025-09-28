// src/components/Input.jsx

/**
 * A reusable input component with default styling.
 * @param {object} props - The component props.
 * @param {string} [props.className] - Additional classes for custom styling.
 * @param {string} [props.type='text'] - The input type.
 * @returns {JSX.Element}
 */
export default function Input({ className = '', type = 'text', ...props }) {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500";
  
  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
}
