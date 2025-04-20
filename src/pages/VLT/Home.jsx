import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Find from '../../components/VLT/Find';
import ProjectList from '../../components/VLT/ProjectList';
import { apiConfig } from '../../config/apiConfig'; // Import apiConfig từ config

const Home = () => {
  const [projects, setProjects] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [selectedSort, setSelectedSort] = useState("Newest"); 

  const sortOptions = {
    Newest: "/projects/approved?sort=startTime&direction=desc",
    "Most liked": "/projects/approved?sort=likesCount&direction=desc",
    "Most volunteers": "/projects/approved?sort=participantsCount&direction=desc",
    Remaining: "/projects/approved?sort=remaining&direction=desc",
    Liked: "/projects/liked",
  };

  const fetchProjects = async (sortKey) => {
    try {
      setLoading(true); 
      const token = localStorage.getItem('token'); 
      const response = await apiConfig.get(sortOptions[sortKey]);

      console.log("Response data:", response.data); 
      setProjects(response.data); 
    } catch (err) {
      console.error("Error fetching projsects:", err); 

      if (err.response) {        
          setError("Lỗi server! Vui lòng thử lại sau.");      
      } else {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
      }
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProjects(selectedSort); 
  }, [selectedSort]); 

  const handleSearch = (data) => {
    setProjects(data); 
  };

  if (loading) {
    return <div className="text-center mt-10">Đang tải danh sách dự án...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-0">Danh sách dự án</h1>
      <div className="flex justify-center mb-2"> {/* Căn giữa Find */}
        <Find onSortChange={setSelectedSort} defaultSort="Newest" />
      </div>
      <ProjectList projects={projects} /> {/* Truyền danh sách dự án vào ProjectList */}
    </div>
  );
};

export default Home;