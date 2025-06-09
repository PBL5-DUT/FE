import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/apiConfig';
import ProjectCard from './ProjectCard';
import { FaSpinner } from 'react-icons/fa';

const ProjectChild = ({ projectId }) => {
  const [childProjects, setChildProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
  const fetchChildProjects = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/projects/child-projects/${projectId}`);

      // Nếu là mảng rỗng hoặc không có dữ liệu, vẫn là hợp lệ
      if (Array.isArray(response.data)) {
        setChildProjects(response.data);
        setError(null);
      } else {
        // Nếu response không phải mảng, coi là lỗi dữ liệu
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching child projects:', err);

      // Chỉ setError nếu là lỗi thật sự, không phải "không có dự án con"
      setError('Không thể tải danh sách dự án con. Vui lòng thử lại sau.');
      setChildProjects([]); // reset để không hiện dữ liệu cũ nếu có
    } finally {
      setLoading(false);
    }
  };

  if (projectId) {
    fetchChildProjects();
  }
}, [projectId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-gray-600">Đang tải dự án con...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-xl max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Đã có lỗi xảy ra</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Dự án con ({childProjects.length})
        </h2>
      </div>

      {childProjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-400 text-5xl mb-4">📂</div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            Chưa có dự án con nào
          </h3>
          <p className="text-gray-500">
            Hiện tại chưa có dự án con nào được tạo trong dự án này.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {childProjects.map((project) => (
            <ProjectCard
              key={project.projectId}
              project={project}
              className="h-full"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectChild;