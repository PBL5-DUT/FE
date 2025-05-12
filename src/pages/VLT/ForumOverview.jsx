import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ForumList from "../../components/VLT/ForumList";
import { apiConfig } from "../../config/apiConfig";

const ForumOverview = () => {
  const { projectId } = useParams();
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
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("Không thể tải danh sách diễn đàn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Danh sách diễn đàn
        </h1>
        <ForumList forums={forums} />
      </div>
    </div>
  );
};

export default ForumOverview;