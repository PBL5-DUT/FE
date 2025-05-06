import { Link } from "react-router-dom";
import { useState } from "react";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const ProjectCard = ({ project }) => {
  const [isLiked, setIsLiked] = useState(project.isLiked || false);
  const [likeCount, setLikeCount] = useState(project.likesCount || 0);

  const toggleLike = (e) => {
    e.preventDefault();
    const updatedCount = isLiked ? likeCount - 1 : likeCount + 1;
    setIsLiked(!isLiked);
    setLikeCount(updatedCount);
    console.log(
      `Project ${project.name} is ${!isLiked ? "liked" : "unliked"} (${updatedCount} likes)`
    );
  };

  const statusText = project.hasJoined ? "Đã tham gia" : "Chưa tham gia";
  const statusColor = project.hasJoined
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  return (
    <Link
      to={`/projects/${project.projectId}`}
      className="block relative group hover:shadow-lg transition-all"
    >
      <div className="flex border rounded-2xl shadow-md p-4 bg-white w-full relative overflow-hidden">
        {/* Image */}
        <img
          src={project.avatarFilepath || "/default-image.jpg"}
          alt={project.name}
          className="w-44 h-44 rounded-xl object-cover border"
        />

        {/* Info */}
        <div className="ml-6 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {project.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1">
              Location: {project.location}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              Description: {truncateText(project.description, 70)}
            </p>

            <div className="text-sm space-y-1">
              <p>
                Participants:{" "}
                <span className="font-medium">
                  {project.participantsCount} /{" "}
                  {project.maxParticipants || "∞"}
                </span>
              </p>
              <p>
                Time: {formatDate(project.startTime)} →{" "}
                {formatDate(project.endTime)}
              </p>
            </div>
          </div>

          {/* Status + Like */}
          <div className="flex justify-between items-center mt-4">
            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
            >
              {statusText}
            </span>

            {/* Like + Count */}
            <button
              onClick={toggleLike}
              className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition text-sm"
            >
              <span className={`text-2xl ${isLiked ? "text-red-500" : ""}`}>
                ♥
              </span>
              <span className="font-medium">{likeCount}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;