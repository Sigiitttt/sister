// src/components/Button.jsx

/**
 * A reusable button component with default styling.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {string} [props.className] - Additional classes for custom styling.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button type.
 * @returns {JSX.Element}
 */
export default function Button({ children, className = '', type = 'button', ...props }) {
  const baseClasses = "px-4 py-2 font-bold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-transform transform hover:scale-105";
  
  // Example of conditional styling based on props
  const variantClasses = props.disabled 
    ? "bg-gray-400 cursor-not-allowed"
    : "bg-green-600 hover:bg-green-700 focus:ring-green-500";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
