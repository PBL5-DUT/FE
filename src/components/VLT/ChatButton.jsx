import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 👉 import useNavigate

const ChatButton = ({ projectId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chatpage`); 
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-1/2 left-full transform translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          Mở Cửa sổ Chat
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}

      <button
        onClick={handleClick} m
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
      >
        <FaComments className={`text-2xl transform transition-transform duration-300 ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100'
        }`} />
      </button>
    </div>
  );
};

export default ChatButton;
