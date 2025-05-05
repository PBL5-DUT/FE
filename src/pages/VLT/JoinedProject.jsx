import React, { useState, useEffect, useCallback } from "react";
import ProjectList from "../../components/VLT/ProjectList";
import { apiConfig } from "../../config/apiConfig";

const JoinedProject = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoinedProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get("/projects/joined");
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching joined projects:", err);
      setError("Không thể tải danh sách dự án đã tham gia. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoinedProjects();
  }, [fetchJoinedProjects]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
        <p className="mt-4 text-blue-500 font-semibold">Đang tải danh sách dự án...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
        <button
          onClick={fetchJoinedProjects}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dự án đã tham gia</h1>
        {projects.length > 0 ? (
          <ProjectList projects={projects} />
        ) : (
          <p className="text-center text-gray-500">Bạn chưa tham gia dự án nào.</p>
        )}
      </div>
    </div>
  );
};

export default JoinedProject;