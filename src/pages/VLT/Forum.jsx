import { useParams, useLocation } from "react-router-dom";
import LeftBar from "../../components/VLT/LeftBar";
import ChatButton from "../../components/VLT/ChatButton";
import PostNew from "../../components/VLT/PostNew";
import PostList from "../../components/VLT/PostList";
import Donation from "../../components/VLT/Donation";
import { AuthContext } from "../../util/AuthContext";
import { useContext } from "react";




const Forum = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);  
  const { forumId } = useParams();
  const location = useLocation();
  const { projectId, userId } = location.state || {};

  if (!projectId) {
    return (
      <div className="text-center mt-10 text-red-500">
        Không tìm thấy projectId.
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">     
      {/* Layout 3 cột */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar trái */}
        <aside className="w-[220px] bg-white border-r border-gray-200 shadow-md h-full overflow-y-auto flex-shrink-0">
          <LeftBar />
          <ChatButton />
        </aside>

        {/* Nội dung chính */}
        <main className="flex-1 h-full overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
             {/* Đăng bài mới */}
            <div className="mb-6">
              <PostNew forumId={forumId} userId={currentUser.userId} />
            </div>

            {/* Danh sách bài viết */}
            <div>
              <PostList forumId={forumId} />
            </div>
          </div>
        </main>

        {/* Sidebar phải */}
        <aside className="w-[300px] bg-white p-4 shadow-md border-l border-gray-200 h-full overflow-y-auto flex-shrink-0">
          <Donation projectId={projectId} />
        </aside>
      </div>
    </div>
  );
};

export default Forum;
