import React, { useState } from 'react';
import ProjectJoined from '../../components/VLT/ProjectJoined';
import MessageWindow from '../../components/VLT/MessageWindow';


const ChatPage = () => {
  const [activeProjectId, setActiveProjectId] = useState(null);

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100 rounded-lg shadow overflow-hidden">
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <ProjectJoined
          activeProjectId={activeProjectId}
          setActiveProjectId={setActiveProjectId}
        />
      </div>
      <div className="w-3/4">
        {activeProjectId ? (
          <MessageWindow projectId={activeProjectId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Chọn một nhóm để bắt đầu trò chuyện
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
