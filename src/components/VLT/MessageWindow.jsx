import React, { useEffect, useState, useRef, useContext } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { apiConfig } from "../../config/apiConfig";
import ChatList from "./ChatList";
import { AuthContext } from "../../util/AuthContext";

const MessageWindow = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);
  const stompClientRef = useRef(null);
  const { currentUser } = useContext(AuthContext);

  // Hàm scroll xuống dưới cùng
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  // Lấy lịch sử tin nhắn
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiConfig.get(`/chats/${projectId}`);
        setMessages(response.data);
        // Scroll xuống sau khi load tin nhắn
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("❌ Lỗi tải tin nhắn:", err);
      }
    };
    fetchMessages();
  }, [projectId]);

  // Tự động scroll xuống tin nhắn mới với delay
  useEffect(() => {
    // Sử dụng setTimeout để đảm bảo DOM đã được render
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 50);

    return () => clearTimeout(timer);
  }, [messages]);

  // Kết nối WebSocket khi projectId thay đổi
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws-chat");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ WebSocket connected");

        client.subscribe(`/topic/chat/project/${projectId}`, (message) => {
          const body = JSON.parse(message.body);
          console.log("Received message:", body);
          
          setMessages((prev) => {
            console.log("Previous messages:", prev);
            const updated = [...prev, body];
            console.log("Updated messages:", updated);
            return updated;
          });
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame);
      },
    });

    client.activate();
    stompClientRef.current = client;

    // Cleanup khi component unmount hoặc projectId đổi
    return () => {
      client.deactivate();
      console.log("🔌 WebSocket disconnected");
    };
  }, [projectId]);

  // Gửi tin nhắn
  const sendMessage = () => {
    const client = stompClientRef.current;
    if (!newMsg.trim() || !client || !client.connected) return;

    const message = {
      projectId,
      userId: currentUser?.userId,
      message: newMsg,
    };

    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(message),
    });

    setNewMsg("");
    // Scroll xuống ngay sau khi gửi tin nhắn
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 font-semibold text-lg text-gray-800">
        Nhóm dự án #{projectId}
      </div>

      {/* Message list */}
      <div 
        className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2"
        id="messages-container"
      >
        <ChatList messages={messages} projectId={projectId} />
        {/* Div để scroll xuống */}
        <div 
          ref={messagesEndRef} 
          style={{ height: '1px' }}
        />
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