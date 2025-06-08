import React, { useState } from 'react';
import { FaTimes, FaRobot, FaPaperPlane } from 'react-icons/fa';

const AIChatBox = () => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-24 left-6 z-50">
      {/* AI Chat Box */}
      {isOpen && (
        <div className="mb-4 w-[310px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-white text-xl" />
              <span className="font-semibold text-white">AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-4">
            {/* AI Message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FaRobot className="text-blue-500" />
              </div>
              <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm text-gray-800">
                  Xin chào! Tôi có thể giúp gì cho bạn?
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-colors shadow-lg">
                <FaPaperPlane className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Button */}
      {showTooltip && !isOpen && (
        <div className="absolute bottom-1/2 left-full transform translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
          Mở AI Assistant
          <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
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
        <FaRobot className={`text-2xl transform transition-transform duration-300 ${
          isHovered ? 'scale-110 rotate-12' : 'scale-100'
        }`} />
      </button>
    </div>
  );
};

export default AIChatBox;