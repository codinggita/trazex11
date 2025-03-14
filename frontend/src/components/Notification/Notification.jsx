import React, { useState, useRef, useEffect } from 'react';

const Notification = ({ isOpen, onClose }) => {
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-md">
      <div 
        ref={notificationRef} 
        className="bg-gray-900 w-[450px] h-[500px] p-8 rounded-3xl shadow-2xl border border-gray-700 text-white relative flex flex-col"
      >
        <button 
          onClick={onClose} 
          className="absolute border-none top-5 right-5 text-gray-400 hover:text-white transition text-2xl"
        >
          ✕
        </button>
        <h3 className="text-2xl font-extrabold mb-5 border-b border-gray-700 pb-3">🔔 Notifications</h3>
        <div className="overflow-y-auto flex-grow space-y-4 scrollbar-hide">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-3">
            📩 <span>You have a new contest invitation.</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-3">
            📈 <span>Stock market update: Your selected stock has increased by 5%.</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-3">
            ⏰ <span>Reminder: Weekly contest starts tomorrow!</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-3">
            🎉 <span>Congratulations! You ranked top 10 in last week's contest.</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center gap-3">
            📢 <span>New feature alert: Check out the latest stock insights section.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
