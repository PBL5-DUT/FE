import React, { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";

const ProjectJoined = ({ activeProjectId, setActiveProjectId }) => {
  const [chatGroups, setChatGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoinedProjects = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get("/projects/joined");
        setChatGroups(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi tải dự án");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedProjects();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Đang tải...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-1 p-3">
      {/* 🧩 Tiêu đề Nhóm Chat */}
      <h2 className="text-lg font-semibold text-gray-700 px-1 mb-2">Nhóm Chat</h2>

      {/* 💬 Danh sách nhóm */}
      {chatGroups.map((group) => {
        const isActive = activeProjectId === group.projectId;
        return (
          <div
            key={group.projectId}
            onClick={() => setActiveProjectId(group.projectId)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
              isActive ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            <img
              src={group.avatarFilepath}
              alt={group.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
            <span className="text-sm font-medium text-gray-800">{group.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectJoined;
