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
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    setIsLikeLoading(true);
    const updatedCount = isLiked ? likeCount - 1 : likeCount + 1;
    setIsLiked(!isLiked);
    setLikeCount(updatedCount);
    console.log(
      `Project ${project.name} is ${!isLiked ? "liked" : "unliked"} (${updatedCount} likes)`
    );
    setTimeout(() => setIsLikeLoading(false), 500); // Simulate network request
  };

  const statusText = project.hasJoined ? "Đã tham gia" : "Chưa tham gia";
  const statusColor = project.hasJoined
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  return (
    <Link
      to={`/projects/${project.projectId}`}
      className="block relative group hover:shadow-lg transition-all h-[240px]"
    >
      <div className="flex border rounded-2xl shadow-md p-4 bg-white w-full h-full relative overflow-hidden">
        {/* Reduced image size */}
        <img
          src={project.avatarFilepath || "/default-image.jpg"}
          alt={project.name}
          className="w-45 h-45 rounded-xl object-cover border flex-shrink-0"
        />

        {/* Info section with adjusted spacing */}
        <div className="ml-4 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="overflow-hidden">
            <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
              {project.name}
            </h2>
            <p className="text-sm text-gray-500 mb-1 truncate">
              Location: {project.location}
            </p>
            <p className="text-gray-700 text-sm mb-2 line-clamp-2">
              Description: {project.description}
            </p>

            <div className="text-sm space-y-0.5">
              <p className="truncate">
                Participants:{" "}
                <span className="font-medium">
                  {project.participantsCount} /{" "}
                  {project.maxParticipants || "∞"}
                </span>
              </p>
              <p className="truncate">
                Time: {formatDate(project.startTime)} →{" "}
                {formatDate(project.endTime)}
              </p>
            </div>
          </div>

          {/* Status + Like - Fixed at bottom */}
          <div className="flex justify-between items-center mt-2 pt-2 border-t">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
            >
              {statusText}
            </span>

            <button
              onClick={toggleLike}
              disabled={isLikeLoading}
              className={`flex items-center space-x-1 text-gray-400 hover:text-red-500 transition text-sm ${
                isLikeLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
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