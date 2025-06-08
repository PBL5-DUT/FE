import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";

const PMUpdate = ({ project, onClose, onUpdated }) => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showImageForm, setShowImageForm] = useState(false);
  const [bank, setBank] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, "0");
      const day = `${d.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error("Error formatting date:", date, e);
      return "";
    }
  };

  useEffect(() => {
    console.log("Received project prop:", project);
    if (project) {
      setTitle(project.name || "");
      setDescription(project.description || "");
      setLocation(project.location || "");
      setStartDate(formatDate(project.startTime) || "");
      setEndDate(formatDate(project.endTime) || "");
      setAvatar(project.avatarFilepath || "");
      setBank(project.bank || "");
      setMaxParticipants(project.maxParticipants ? parseInt(project.maxParticipants, 10) : 10);
    } else {
      const fetchProject = async () => {
        setLoading(true);
        try {
          const response = await apiConfig.get(`http://localhost:8080/api/projects/${id}`);
          const projectData = response.data;
          console.log("Fetched project data:", projectData);
          setTitle(projectData.name || "");
          setDescription(projectData.description || "");
          setLocation(projectData.location || "");
          setStartDate(formatDate(projectData.startTime) || "");
          setEndDate(formatDate(projectData.endTime) || "");
          setAvatar(projectData.avatarFilepath || "");
          setBank(projectData.bank || "");
          setMaxParticipants(projectData.maxParticipants ? parseInt(projectData.maxParticipants, 10) : 10);
        } catch (error) {
          console.error("Error fetching project:", error);
          setError("Không thể tải thông tin dự án.");
        } finally {
          setLoading(false);
        }
      };
      fetchProject();
    }
  }, [id, project]);

  const handleSubmit = async (status) => {
    setError("");
    setLoading(true);

    try {
      const currentTime = new Date().toISOString();
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const maxParticipantsValue = parseInt(maxParticipants, 10);

      if (isNaN(maxParticipantsValue) || maxParticipantsValue < 1) {
        setError("Số lượng người tham gia tối đa phải lớn hơn 0.");
        setLoading(false);
        return;
      }

      if (!title || !description || !location || !formattedStartDate || !formattedEndDate) {
        setError("Vui lòng nhập đầy đủ thông tin.");
        setLoading(false);
        return;
      }

      const response = await apiConfig.put(`http://localhost:8080/api/projects/${id}`, {
        name: title,
        description,
        location,
        startTime: formattedStartDate,
        endTime: formattedEndDate,
        avatarFilepath: avatar,
        pmId: currentUser.userId,
        maxParticipants: maxParticipantsValue,
        status,
        bank,
        createdAt: project?.createdAt || new Date().toISOString(),
        updatedAt: currentTime,
      });
      console.log("Dự án đã được cập nhật:", response.data);
      if (onUpdated) onUpdated();
      onClose();
    } catch (error) {
      if (error.response) {
        setError(`Lỗi: ${error.response.data.message || "Không thể cập nhật dự án"}`);
      } else {
        setError("Lỗi: Không nhận được phản hồi từ server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa dự án</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {loading && <p className="text-blue-500 mb-3">Đang tải...</p>}

        <label className="block font-semibold">Tên dự án</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block font-semibold">Mô tả</label>
        <textarea
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="block font-semibold">Địa điểm</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="block font-semibold">Ngày bắt đầu</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="block font-semibold">Ngày kết thúc</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label className="block font-semibold">Ngân hàng</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          placeholder="Bank Account - Account Holder - Bank Name"
        />
        <label className="block font-semibold">Số người tham gia</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          value={maxParticipants}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || (!isNaN(value) && parseInt(value, 10) >= 0)) {
              setMaxParticipants(value);
            }
          }}
          placeholder="Max Participants"
          min="1"
        />

        {avatar && (
          <img
            src={avatar}
            alt="Project Avatar"
            className="w-40 h-24 rounded-lg object-cover mb-3"
          />
        )}

        {showImageForm ? (
          <div className="mb-3">
            <label className="block font-semibold">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowImageForm(false)}
            >
              OK
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
            onClick={() => setShowImageForm(true)}
          >
            Update Image
          </button>
        )}

        <div className="flex justify-between mt-4">
          <div>
          <button className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400" : "bg-orange-400 text-white"
        }`}
        onClick={() => handleSubmit(project?.status === "draft" ? "pending" : "approved")}
        disabled={loading}
        >
        {loading ? "Updating..." : "Update"}
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PMUpdate;