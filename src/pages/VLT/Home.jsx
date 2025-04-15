import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from '../../components/VLT/Find';
import Header from '../../components/VLT/Header';
import ProjectList from '../../components/VLT/ProjectList';

const Home = () => {
  const [projects, setProjects] = useState([]); // State để lưu danh sách dự án
  const [loading, setLoading] = useState(true); // State để hiển thị trạng thái loading
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  const [selectedSort, setSelectedSort] = useState("Newest"); // State để lưu tùy chọn sort mặc định

  const sortOptions = {
    Newest: "http://localhost:8080/api/projects/approved?sort=startTime&direction=desc",
    "Most liked": "http://localhost:8080/api/projects/approved?sort=likesCount&direction=desc",
    "Most volunteers": "http://localhost:8080/api/projects/approved?sort=participantsCount&direction=desc",
    Remaining: "http://localhost:8080/api/projects/approved?sort=remaining&direction=desc",
    Liked: "http://localhost:8080/api/projects/liked",
   
  };

  const fetchProjects = async (sortKey) => {
    try {
      setLoading(true); // Bật trạng thái loading
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      console.log("Token:", token); // In ra token để kiểm tra

      const response = await axios.get(sortOptions[sortKey], {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });

      console.log("Response data:", response.data); // In ra dữ liệu trả về từ API
      setProjects(response.data); // Lưu danh sách dự án vào state
    } catch (err) {
      console.error("Error fetching projects:", err); // In ra lỗi nếu có

      if (err.response) {        
          setError("Lỗi server! Vui lòng thử lại sau.");      
      } else {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
      }
    } finally {
      setLoading(false); // Tắt trạng thái loading
    }
  };

  useEffect(() => {
    fetchProjects(selectedSort); // Gọi API với tùy chọn mặc định "Newest"
  }, [selectedSort]); // Gọi lại API khi `selectedSort` thay đổi

  const handleSearch = (data) => {
    setProjects(data); // Cập nhật danh sách dự án khi tìm kiếm

  };

  if (loading) {
    return <div className="text-center mt-10">Đang tải danh sách dự án...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-0">Danh sách dự án</h1>
      <div className="flex justify-center mb-2"> {/* Căn giữa Find */}
        <Search onSearch={handleSearch} onSortChange={setSelectedSort} defaultSort="Newest" />
      </div>
      <ProjectList projects={projects} /> {/* Truyền danh sách dự án vào ProjectList */}
    </div>
  );
};

export default Home;