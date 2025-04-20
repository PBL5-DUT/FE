import { Link } from "react-router-dom";
import { useState } from "react";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" }; // Định dạng dd/MM/yyyy
  return new Date(dateString).toLocaleDateString("vi-VN", options); // Hiển thị ngày tháng theo định dạng tiếng Việt
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..."; // Cắt chuỗi và thêm dấu "..."
  }
  return text;
};

const ProjectCard = ({ project }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State để lưu trạng thái yêu thích

  const toggleFavorite = (e) => {
    e.preventDefault(); // Ngăn chặn điều hướng khi nhấn trái tim
    setIsFavorite(!isFavorite); // Đổi trạng thái yêu thích
    console.log(`Project ${project.name} is ${!isFavorite ? "added to" : "removed from"} favorites.`);
  };

  return (
    <Link to={`/projects/${project.projectId}`} className="block relative">
      <div className="flex border rounded-lg shadow-md p-4 bg-white w-full relative">
        <img
          src={project.avatarFilepath || "/default-image.jpg"} // Hiển thị ảnh đại diện hoặc ảnh mặc định
          alt={project.name}
          className="w-48 h-48 rounded-lg object-cover"
        />
        <div className="ml-6 flex-1">
          <h2 className="text-lg font-bold">{project.name}</h2>
          <p className="text-sm text-gray-600">Địa điểm: {project.location}</p>
          <p className="text-gray-700 mt-2">
            Mô tả: {truncateText(project.description, 50)}
          </p>
          <p className="text-gray-700 mt-2">
            Số lượng tham gia tối đa: {project.maxParticipants}
          </p>
          <p className="text-gray-700 mt-2">
            Số lượng hiện tại: {project.memberCount}
          </p>
          <p className="text-gray-700 mt-2">
            Thời gian: {formatDate(project.startTime)} - {formatDate(project.endTime)}
          </p>
        </div>
        {/* Biểu tượng trái tim */}
        <button
          onClick={toggleFavorite}
          className={`absolute bottom-4 right-4 text-2xl ${
            isFavorite ? "text-red-500" : "text-gray-400"
          } hover:text-red-500 transition`}
        >
          ♥
        </button>
      </div>
    </Link>
  );
};

export default ProjectCard;