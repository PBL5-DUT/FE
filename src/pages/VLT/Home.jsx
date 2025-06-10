import React, { useState, useEffect, useCallback } from 'react';
import Find from '../../components/VLT/Find';
import ProjectList from '../../components/VLT/ProjectList';
import { apiConfig } from '../../config/apiConfig';

const Home = () => {
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-center mb-2">
        <Find 
          onSortChange={setSelectedSort}
          onSearch={setSearchTerm}
          defaultSort="Newest"
        />
      </div>
      <div className="px-4">
        <ProjectListWrapper 
          selectedSort={selectedSort}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};

// Component riêng để load project theo sort
const ProjectListWrapper = ({ selectedSort, searchTerm }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sortOptions = {
    Newest: "/projects/approved?sort=startTime",
    "Most liked": "/projects/approved?sort=likesCount",
    "Most volunteers": "/projects/approved?sort=participantsCount",
    Remaining: "/projects/approved?sort=remaining",
    Liked: "/projects/approved?sort=liked",
  };

  const filteredProjects = projects.filter(project => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.location?.toLowerCase().includes(searchLower)
    );
  });

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(sortOptions[selectedSort]);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi fetch:", err);
      setError("Không thể tải dự án. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, [selectedSort]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return <div className="text-center mt-10">Đang tải danh sách dự án...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // Render filtered projects
  return (
    <div className>
      {filteredProjects.length === 0 ? (
        <div className="text-center mt-10 text-red-500">
          Không tìm thấy dự án phù hợp
        </div>
      ) : (
        filteredProjects.map(project => (
          <ProjectList projects={filteredProjects} />
        ))
      )}
    </div>
  );
};


export default Home;