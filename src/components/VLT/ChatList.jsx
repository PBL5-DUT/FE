import React, { useEffect, useState } from 'react';
import { apiConfig } from '../../config/apiConfig';
import Chat from './Chat';
import { AuthContext } from "../../util/AuthContext";
import { useContext } from 'react';

const ChatList = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);  

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await apiConfig.get(`/chats/${projectId}`);
        console.log('API Response:', res.data);
      setMessages(res.data);
    } catch (err) {
      console.error('Lỗi tải tin nhắn', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [projectId]);

  return (
    <div className="space-y-2 overflow-y-auto max-h-[400px] px-2">
      {loading && <p>Đang tải tin nhắn...</p>}
      {!loading && messages.length === 0 && <p>Chưa có tin nhắn nào.</p>}
      {!loading && messages.map(msg => (
        <Chat key={msg.chatId} message={msg} currentUser={currentUser} onUpdate={fetchMessages} />
      ))}
    </div>
  );
};

export default ChatList;
