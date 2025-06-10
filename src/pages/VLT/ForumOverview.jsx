import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ForumList from "../../components/VLT/ForumList";
import { apiConfig } from "../../config/apiConfig";

const ForumOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId, projectName } = location.state || {};
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/forums/project/${projectId}`);
      console.log("API Response:", response.data);
      setForums(response.data);
      setError(null);
      
      // Tự động điều hướng đến forum đầu tiên nếu có dữ liệu
      if (response.data && response.data.length > 0) {
        const firstForumId = response.data[0].id || response.data[0].forumId;
        // Điều hướng đến trang forum với forum đầu tiên
        navigate(`/forum/${firstForumId}`, {
          state: { 
            projectId, 
            projectName,
            forumData: response.data[0] 
          }
        });
      }
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("Không thể tải danh sách diễn đàn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchForums();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-blue-500 font-semibold">
          Đang tải danh sách diễn đàn...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchForums}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // Nếu không có forum nào
  if (forums.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Danh sách diễn đàn
          </h1>
          <div className="text-center mt-10 text-gray-500">
            <p>Không có diễn đàn nào trong dự án này.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Danh sách diễn đàn
        </h1>
        <ForumList forums={forums} projectId={projectId} projectName={projectName}/>       
      </div>
    </div>
  );
};

export default ForumOverview;