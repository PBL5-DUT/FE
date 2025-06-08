import React, { useEffect, useState, useRef } from "react";
import { apiConfig } from "../../config/apiConfig";
import ChatList from "./ChatList"; // Sử dụng ChatList mới

const MessageWindow = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Lấy tin nhắn khi projectId thay đổi
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiConfig.get(`/chats/${projectId}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Lỗi tải tin nhắn:", err);
      }
    };

    fetchMessages();
  }, [projectId]);

  // Tự động scroll xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      const response = await apiConfig.post(`/chats/${projectId}`, {
        projectId,      
        message: newMsg,
        createdAt: new Date().toISOString(),
      });
      setMessages((prev) => [...prev, response.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Lỗi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 font-semibold text-lg text-gray-800">
        Nhóm dự án #{projectId}
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
        <ChatList messages={messages} projectId={projectId}  />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessageWindow;
