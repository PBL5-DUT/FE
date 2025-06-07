import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const ChatButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChatClick = () => {
    // TODO: Implement chat functionality
    console.log("Chat button clicked!");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50"> {/* Changed positioning here */}
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          Mở cửa sổ chat
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={handleChatClick}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowTooltip(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowTooltip(false);
        }}
        className={`group flex items-center justify-center w-14 h-14 
          bg-gradient-to-r from-blue-500 to-blue-600 
          text-white rounded-full shadow-xl hover:shadow-blue-500/50 
          transition-all duration-300 ease-in-out
          ${isHovered ? 'scale-110' : 'scale-100'}
          hover:from-blue-600 hover:to-blue-700`}
        style={{
          boxShadow: isHovered 
            ? '0 10px 25px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.1)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <FaComments 
          className={`text-2xl transform transition-transform duration-300 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100'
          }`}
        />

        {/* Ripple Effect */}
        <span className="absolute w-full h-full rounded-full bg-white opacity-25 
          transform scale-0 group-hover:scale-150 transition-transform duration-500">
        </span>
      </button>

      {/* Notification Badge */}
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
        flex items-center justify-center rounded-full border-2 border-white
        animate-pulse shadow-md">
        3
      </span>
    </div>
  );
};

export default ChatButton;