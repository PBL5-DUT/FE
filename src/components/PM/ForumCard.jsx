import React from "react";
import { useNavigate } from "react-router-dom";

const ForumCard = ({ forum, projectId, projectName}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/PMforum/${forum.forumId}`, { state: { projectId: projectId, projectName:projectName } }); // Truyền projectId qua state
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{forum.title}</h3>
      
    </div>
  );
};

export default ForumCard;