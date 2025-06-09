import React, { useContext } from 'react';
import Chat from './Chat';
import { AuthContext } from "../../util/AuthContext";

const ChatList = ({ messages }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="space-y-2  max-h-[400px] px-2">
      {messages.length === 0 && <p>Chưa có tin nhắn nào.</p>}
      {messages.map(msg => (
        <Chat key={msg.messageId} message={msg} currentUser={currentUser} />
      ))}
    </div>
  );
};

export default ChatList;
