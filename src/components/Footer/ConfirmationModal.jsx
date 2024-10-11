import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2 bg-gray-300 px-4 py-2 rounded">No</button>
          <button onClick={onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
