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

  // Lấy ngày hiện tại (định dạng YYYY-MM-DD)
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Xử lý thay đổi ngày bắt đầu
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    const currentDate = getCurrentDate();
    
    // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
    if (newStartDate < currentDate) {
      setError('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
      return; // Không cập nhật state nếu ngày không hợp lệ
    }
    
    setStartDate(newStartDate);
    
    // Nếu ngày kết thúc đã được chọn và nhỏ hơn ngày bắt đầu mới
    if (endDate && newStartDate > endDate) {
      setEndDate(''); // Reset ngày kết thúc
      setError('Ngày kết thúc đã được reset vì nhỏ hơn ngày bắt đầu mới.');
    } else {
      setError(''); // Xóa lỗi nếu có
    }
  };

  // Xử lý thay đổi ngày kết thúc
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    const currentDate = getCurrentDate();
    
    // Kiểm tra ngày kết thúc không được nhỏ hơn ngày hiện tại
    if (newEndDate < currentDate) {
      setError('Ngày kết thúc không được nhỏ hơn ngày hiện tại.');
      return;
    }
    
    // Kiểm tra ngày kết thúc không được nhỏ hơn ngày bắt đầu
    if (startDate && newEndDate < startDate) {
      setError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu.');
      return; // Không cập nhật state nếu ngày không hợp lệ
    }
    
    setEndDate(newEndDate);
    setError(''); // Xóa lỗi nếu ngày hợp lệ
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
      const currentDate = getCurrentDate();

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

      // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
      if (startDate < currentDate) {
        setError('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
        setLoading(false);
        return;
      }

      // Kiểm tra ngày kết thúc không được nhỏ hơn ngày hiện tại
      if (endDate < currentDate) {
        setError('Ngày kết thúc không được nhỏ hơn ngày hiện tại.');
        setLoading(false);
        return;
      }

      // Kiểm tra lại ngày một lần nữa khi submit
      if (startDate > endDate) {
        setError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu.');
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
          onChange={handleStartDateChange}
          min={getCurrentDate()} // Thiết lập ngày tối thiểu là ngày hiện tại
        />

        <label className="block font-semibold">Ngày kết thúc</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={endDate}
          onChange={handleEndDateChange}
          min={getCurrentDate()} // Thiết lập ngày tối thiểu là ngày hiện tại
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
        onClick={() => handleSubmit(project?.status === "draft" ? "pending" : project?.status)}
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