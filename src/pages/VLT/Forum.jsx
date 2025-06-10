import React, { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import LeftBar from "../../components/VLT/LeftBar";
import PostNew from "../../components/VLT/PostNew";
import PostList from "../../components/VLT/PostList";
import ProjectChild from "../../components/VLT/ProjectChild";
import MemberList from "../../components/VLT/MemberList";
import TabContainer from "../../components/VLT/TabContainer";
import { AuthContext } from "../../util/AuthContext";

const Forum = () => {
  const { currentUser } = useContext(AuthContext);  
  const { forumId } = useParams();
  const location = useLocation();
  const { projectId, projectName } = location.state || {};
  const [activeTab, setActiveTab] = useState('home');

  if (!projectId) {
    return (
      <div className="text-center mt-10 text-red-500">
        Không tìm thấy projectId.
      </div>
    );
  }

  const renderMainContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <PostNew forumId={forumId} userId={currentUser?.userId} />
            <div className="mt-6">
              <PostList forumId={forumId} />
            </div>
          </>
        );
      case 'projects':
        return <ProjectChild projectId={projectId} />;
      case 'members':
        return <MemberList projectId={projectId} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">     
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-[200px] bg-white border-r border-gray-200 shadow-md h-full overflow-y-auto flex-shrink-0">
          <LeftBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            projectName={projectName}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-full overflow-y-auto p-6 bg-gray-100">
          <div className="max-w-3xl mx-auto">
            {renderMainContent()}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[290px] bg-white p-4 shadow-md border-l border-white h-full overflow-y-auto flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch sử ủng hộ</h2>
          <TabContainer projectId={projectId} />
        </aside>

        <>
  
</>
      </div>
    </div>
  );
};

export default Forum;
