import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in-fast">
      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">{title || 'Confirm Action'}</h2>
        <p className="text-slate-600 mb-6">{message || 'Are you sure you want to proceed?'}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Add a faster fade-in animation specifically for this modal
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in-fast {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-fast {
    animation: fade-in-fast 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default ConfirmationModal;