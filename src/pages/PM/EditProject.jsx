import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải thông tin dự án.");
      }
    };
    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!project.name || !project.description || !project.location || !project.startTime || !project.endTime) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/projects/${projectId}`, project);
      alert("Cập nhật thành công!");
      navigate("/PMproject"); 
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      setError("Không thể cập nhật dự án.");
    } finally {
      setLoading(false);
    }
  };

  if (!project) return <p>Đang tải...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cập nhật dự án</h2>
      {error && <p className="text-red-500">{error}</p>}

      <label className="block font-semibold">Tên dự án</label>
      <input
        type="text"
        name="name"
        value={project.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-semibold">Mô tả</label>
      <textarea
        name="description"
        value={project.description}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      ></textarea>

      <label className="block font-semibold">Địa điểm</label>
      <input
        type="text"
        name="location"
        value={project.location}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-semibold">Ngày bắt đầu</label>
      <input
        type="date"
        name="start_time"
        value={project.startTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-semibold">Ngày kết thúc</label>
      <input
        type="date"
        name="end_time"
        value={project.endTime}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-semibold">Ảnh đại diện</label>
      <input
        type="text"
        name="avatar_filepath"
        value={project.avatarFilepath}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        placeholder="Nhập URL ảnh"
      />

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          onClick={() => navigate("/PMproject")}
        >
          Hủy
        </button>
        <button
          className={`px-4 py-2 rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
};

export default EditProject;
