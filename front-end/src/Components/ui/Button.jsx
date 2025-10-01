// src/components/ui/Button.jsx

import React from 'react';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary'
  disabled = false,
  className = '',
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;