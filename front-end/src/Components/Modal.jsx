// src/components/Modal.jsx
import { useEffect } from 'react';

/**
 * A reusable modal component.
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls if the modal is visible.
 * @param {Function} props.onClose - Function to call when the modal should be closed.
 * @param {React.ReactNode} props.children - The content inside the modal.
 * @returns {JSX.Element | null}
 */
export default function Modal({ isOpen, onClose, children }) {
  // Effect to handle the Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-2xl font-bold text-gray-500 top-2 right-4 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
