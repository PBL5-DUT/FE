import React from "react";

const ChatButton = () => {
  const handleChatClick = () => {
    console.log("Chat button clicked!");
  };

  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 left-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
    >
      💬
    </button>
  );
};

export default ChatButton;