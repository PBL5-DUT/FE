import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { apiConfig } from '../../config/apiConfig';

const Chat = ({ message,currentUser,  onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.message);
  const [error, setError] = useState(null);

  

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
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
            <span className="font-semibold text-sm text-gray-900">{message.userName}</span>
            <span className="text-xs text-gray-500">{formatDateTime(message.createdAt)}</span>
          </div>
          {isOwnMessage && (
            <div className="relative group">
              <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
              <div className="absolute right-0 mt-1 w-24 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
                <button
                  onClick={() => setIsEditing(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sửa
                </button>
                <button
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Xóa
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-1">
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
            <p className={`text-sm text-gray-800 p-3 rounded-lg ${isOwnMessage ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.message}
            </p>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1 text-right">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;