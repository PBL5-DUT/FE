import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import NewPj from "./NewPj"; 
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext"; 

const PjManager = () => {
  const { currentUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("Active");
  const [showNewPj, setShowNewPj] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const tabMap = {
    Active: "approved",
    Pending: "pending",
    Finished: "finished",
    Locked: "locked",
    Draft: "draft",
    Rejected: "rejected"
  };

  const reverseTabMap = Object.entries(tabMap).reduce((acc, [label, value]) => {
    acc[value] = label;
    return acc;
  }, {});

  const loadProjects = async () => {
    try {
      const response = await apiConfig.get(`http://localhost:8080/api/projects/`);
      console.log("API data:", response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách dự án:", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <div className="p-6">
      {showNewPj ? (
        <NewPj onClose={() => setShowNewPj(false)} />
      ) : (
        <>
          <div className="flex space-x-6 border-b">
            {Object.keys(tabMap).map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-lg font-medium ${
                  activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-6">
            {projects.length === 0 ? (
              <p className="text-gray-500">Không có dự án nào.</p>
            ) : (
              projects
              .filter((project) => 
              project.pmId === (currentUser.userId) && project.status === tabMap[activeTab],
              console.log(currentUser.userId)
            )
              .map((project) => (
                  <div 
                    key={project.projectId}  
                    className="flex items-center border-b pb-4 cursor-pointer hover:bg-gray-100 relative"
                    onClick={() => navigate(`/PmDetail/${project.projectId}`)} 
                  >
                    <img 
                      src={project.avatarFilepath || "https://via.placeholder.com/150"} 
                      alt={project.name} 
                      className="w-40 h-24 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-semibold">{project.name}</h2>
                      <p className="text-gray-600 font-medium">{project.location}</p>
                      <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
                      <p className="text-gray-500 text-sm">📅 {new Date(project.startTime).toLocaleDateString()} - {new Date(project.endTime).toLocaleDateString()}</p>
                      <p className="text-gray-500 text-sm">🕒 Cập nhật: {new Date(project.updatedAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-400">Trạng thái: {reverseTabMap[project.status] || project.status}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
          <button 
            className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg"
            onClick={() => setShowNewPj(true)} 
          >
            <span className="text-xl mr-2">➕</span> Add Project
          </button>
        </>
      )}
    </div>
  );
};

export default PjManager;
