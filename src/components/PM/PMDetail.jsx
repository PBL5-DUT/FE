import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";
import PMUpdate from "./PMUpdate";
import Donation from "./Donation";


const PMDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await apiConfig.get(`http://localhost:8080/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dự án:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Hàm toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleProjectUpdated = async () => {
  try {
    const response = await apiConfig.get(`http://localhost:8080/api/projects/${id}`);
    setProject(response.data);
  } catch (error) {
    console.error("Lỗi khi cập nhật lại dữ liệu dự án:", error);
  }
  };
  const formatDateTime = (arr) => {
    if (!arr || arr.length < 3) return "N/A";
    const [year, month, day, hour = 0, minute = 0, second = 0] = arr;
    const date = new Date(year, month - 1, day, hour, minute, second);
    return date.toLocaleString("vi-VN");
  };
  const [donations, setDonations] = useState([]);

  useEffect(() => {
  const fetchDonations = async () => {
    try {
      const response = await apiConfig.get(`http://localhost:8080/api/donations/project/${id}`);
      setDonations(response.data);
      console.log("Donations:", response.data);
    } catch (error) {
      console.error("Lỗi khi tải donations:", error);
    }
  };

  fetchDonations();
}, [id]);

  

  if (loading) return <h1 className="text-left">Đang tải dữ liệu...</h1>;
  if (!project) return <h1 className="text-left">Project không tồn tại</h1>;
  
  return (
    
    <div className="max-w-7xl mx-auto p-2 flex flex-col gap-8 text-left relative">
      {/* Button hamburger */}
      <button
        className="fixed top-80 left-4 w-12 h-12 bg-gray-200 rounded-md flex flex-col justify-center items-center gap-1.5 z-20"
        onClick={toggleMenu}
      >
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
        <span className="w-6 h-0.5 bg-black"></span>
      </button>

      {/* Menu dropdown */}
      {isMenuOpen && (
        <div className="fixed top-50 left-4 w-48 bg-white rounded-lg shadow-lg z-20">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setIsEditOpen(true);
                setIsMenuOpen(false);
                console.log("Chỉnh sửa dự án");
              }}
            >
              Chỉnh sửa dự án
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                // Logic cho nhân bản dự án
                console.log("Nhân bản dự án");
                setIsMenuOpen(false);
              }}
            >
              Nhân bản dự án
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                // Logic cho khoá dự án
                console.log("Khoá dự án");
                setIsMenuOpen(false);
              }}
            >
              Khoá dự án
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-between gap-8">
        <div className="flex-1 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <h2 className="text-sm font-medium text-gray-500 mb-4">
          Updated at: {formatDateTime(project.updatedAt)}
          </h2>
          <img
            src={project.avatarFilepath}
            alt={project.name}
            className="w-full h-[30rem] object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
          <div className="flex justify-start w-full gap-4 mt-8">
            - Ngày bắt đầu: {new Date(project.startTime).toLocaleDateString("vi-VN")}
          </div>
          <div className="flex justify-start w-full gap-4 mt-8">
            - Ngày kết thúc: {new Date(project.endTime).toLocaleDateString("vi-VN")}
          </div>
          <div className="flex justify-start w-full gap-4 mt-8">
            - Địa điểm: {project.location}
          </div>
          <div className="flex justify-start w-full mt-8">
            <button
              className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-full flex items-center gap-2 shadow-md hover:bg-blue-600"
              onClick={() => navigate(`/forum/${project.projectId}`)}
            >
              Go to forum
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
        {/* Cột bên phải: Bảng donations */}
        <Donation donations={donations} />
      </div>
      {isEditOpen && (
      <PMUpdate
        project={project}
        onClose={() => setIsEditOpen(false)}
        onUpdated={handleProjectUpdated}
      />
      )}
    </div>
  );
};

export default PMDetail;