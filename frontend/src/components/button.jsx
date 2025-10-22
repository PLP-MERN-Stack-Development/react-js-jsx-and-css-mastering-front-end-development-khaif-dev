import React from 'react';

function Buttons({ text, onClick, type = 'button', className = '' }) {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${className}`}
    >
      {text}
    </button>
  );
}

export default Buttons;
