import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";
import PMUpdate from "./PMUpdate";
import TabContainer from "./TabContainer";
import Loop from "./Loop";
import Lock from "./Lock";


const PMDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [activeTab, setActiveTab] = useState("Donation"); 



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
  const [isCopied, setIsLoop] = useState(false);
  const handleCopy = async () => {
    try {
      const response = await apiConfig.get(`http://localhost:8080/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật lại dữ liệu dự án:", error);
    }
  };
  const [isLocked, setIsLocked] = useState(false);
  const handleLock = async () => {
    try {
      const response = await apiConfig.get(`http://localhost:8080/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật lại dữ liệu dự án:", error);
    }
  }
  
  

  

  if (loading) return <h1 className="text-left">Đang tải dữ liệu...</h1>;
  if (!project) return <h1 className="text-left">Project không tồn tại</h1>;
  
  return (
    
    <div className="max-w-6xl mx-auto p-2 flex flex-col gap-6 text-left relative">
      {/* Button hamburger */}
      <button
        className="fixed top-90 left-4 w-12 h-12 bg-gray-200 rounded-md flex flex-col justify-center items-center gap-1.5 z-20"
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
                console.log("Nhân bản dự án");
                setIsLoop(true);
                setIsMenuOpen(false);
              }}
            >
              Nhân bản dự án
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setIsLocked(true);
                console.log("Khoá dự án");
                setIsMenuOpen(false);
              }}
            >
              Khoá dự án
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate(`/project/${id}/statistics`);
                setIsMenuOpen(false);
              }}
            >
              Xem thống kê
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-between gap-">
        <div className="flex-1 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <h2 className="text-sm font-medium text-gray-500 mb-4">
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
          <div className="flex justify-start w-full gap-4 mt-8">
            - Ngân hàng: {project.bank}
          </div>
          <div className="flex justify-start w-full gap-4 mt-8">
            - Số người tham gia tối đa: {project.maxParticipants}
          </div>
          <div className="flex justify-start w-full gap-4 mt-8">
            - Số người tham gia hiện tại: {project.participantsCount}
          </div>
          
          <div className="flex justify-start w-full mt-8">
            <button
              className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-full flex items-center gap-2 shadow-md hover:bg-blue-600"
              onClick={() => navigate(`/PMforumoverview/${id}`, {
              state: {
              projectId: id,
              projectName: project.name,
            }
            })
          }
            >
              Đi đến forum
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
        
        {/* Cột bên phải: Bảng donations */}
        <div className="w-[1rem] bg-white p-1 rounded-lg shadow-md">
        

        <div className="w-80">
            <TabContainer projectId={id} />
          </div>
      </div>
      </div>
      {isEditOpen && (
      <PMUpdate
        project={project}
        onClose={() => setIsEditOpen(false)}
        onUpdated={handleProjectUpdated}
      />
      )}
      {isCopied && (
      <Loop
        project={project}
        onClose={() => setIsLoop(false)}
        onCopied={handleCopy}
      />
      )}
      {isLocked && (
        <Lock
        project={project}
        onClose={() => setIsLocked(false)}
        onLocked={handleLock}
        />
      )}
    </div>
  );
};

export default PMDetail;