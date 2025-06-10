import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { apiConfig } from '../../config/apiConfig';

const Chat = ({ message, currentUser, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.message);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUpdate = async () => {
    try {
      await apiConfig.put(`/chats/${message.messageId}`, {
        ...message,
        message: editedContent,
      });
      setIsEditing(false);
      setError(null);
      onUpdate();
    } catch (err) {
      setError('Cập nhật tin nhắn thất bại.');
      console.error('Cập nhật thất bại', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tin nhắn này?')) {
      try {
        await apiConfig.delete(`/chats/${message.messageId}`);
        setError(null);
        onUpdate();
      } catch (err) {
        setError('Xóa tin nhắn thất bại.');
        console.error('Xóa thất bại', err);
      }
    }
    setShowDropdown(false);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isOwnMessage = message.userId === currentUser.userId;

  return (
    <div className={`flex items-start gap-3 mb-4 max-w-2xl mx-auto ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
      <img
        src={message.avatarFilePath || '/default-avatar.png'}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
          <span className="font-semibold text-sm text-gray-900">{message.userName}</span>
          <span className="text-xs text-gray-500">{formatDateTime(message.createdAt)}</span>
        </div>
        
        <div className="relative">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleUpdate}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div 
              className={`relative p-3 rounded-lg group ${isOwnMessage ? 'bg-blue-100' : 'bg-gray-100'}`}
            >
              <p className="text-sm text-gray-800 pr-6">
                {message.message}
              </p>
              
              {/* Nút ba chấm nằm trong tin nhắn */}
              {isOwnMessage && (
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-opacity duration-200"
                  >
                    <FaEllipsisV className="text-gray-500 text-xs" />
                  </button>
                  
                  {/* Dropdown menu với vùng hover mở rộng */}
                  {showDropdown && (
                    <div 
                      className="absolute right-0 top-6 w-20 bg-white shadow-lg rounded-md border z-20"
                      onMouseLeave={() => setShowDropdown(false)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditing(true);
                          setShowDropdown(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 rounded-t-md"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete();
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-100 rounded-b-md"
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {error && <p className="text-xs text-red-500 mt-1 text-right">{error}</p>}
      </div>
      
      {/* Overlay để đóng dropdown khi click bên ngoài */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default Chat;