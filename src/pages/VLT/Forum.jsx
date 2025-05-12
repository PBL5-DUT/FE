import React from "react";
import { useParams, useLocation } from "react-router-dom";
import LeftBar from "../../components/VLT/LeftBar";
import ChatButton from "../../components/VLT/ChatButton";
import PostNew from "../../components/VLT/PostNew";
import PostList from "../../components/VLT/PostList";
import Donation from "../../components/VLT/Donation";

const Forum = () => {
  const { forumId } = useParams(); // Lấy forumId từ URL
  const location = useLocation();
  const { projectId } = location.state || {}; // Lấy projectId từ state

  if (!projectId) {
    return <div className="text-center mt-10 text-red-500">Không tìm thấy projectId.</div>;
  }

  return (
    // Layout chính: Chiều cao 100vh và chỉ nội dung chính được cuộn
    <div className="bg-gray-50 h-screen flex overflow-hidden">

      {/* Left Sidebar */}
        <div className="w-[220px] bg-white border-r border-gray-200 shadow-md h-screen overflow-y-auto flex-shrink-0">
            <LeftBar />          
            <ChatButton /> 
        </div>

      {/* Main Content - Phần này sẽ cuộn */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Forum Title */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Forum</h1>
            <p className="text-sm text-gray-500">
              Forum ID: <span className="font-medium text-gray-700">{forumId}</span>
            </p>
            <p className="text-sm text-gray-500">
              Project ID: <span className="font-medium text-gray-700">{projectId}</span>
            </p>
          </div>

          {/* Post New */}
          <div className="mb-6">
            <PostNew projectId={projectId} />
          </div>

          {/* Post List */}
          <div>
            <PostList forumId={forumId} />
          </div>
        </div>
      </div>

      {/* Donation */}
        <div className="w-[300px] bg-white p-2 shadow-md border-l border-gray-200 h-screen overflow-y-auto flex-shrink-0">
            <Donation projectId={projectId} />
        </div>

      
    </div>
  );
};

export default Forum;
