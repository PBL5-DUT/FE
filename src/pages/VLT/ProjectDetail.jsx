import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConfig } from "../../config/apiConfig"; // Import apiConfig
import Donation from "../../components/VLT/Donation"; // Import component Donation

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null); // Trạng thái tham gia dự án
  const [isWaiting, setIsWaiting] = useState(false); // Trạng thái chờ duyệt

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/projects/${id}`);
      setProject(response.data); // Lưu thông tin dự án vào state
    } catch (err) {
      console.error("Error fetching project detail:", err);
      setError("Không thể tải thông tin dự án. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const checkJoinedStatus = async () => {
    try {
      const response = await apiConfig.get(`/requests/${id}/check-join`);
      setStatus(response.data.status); // Cập nhật trạng thái tham gia
    } catch (error) {
      console.error("Error checking joined status:", error);
    }
  };

  const handleRegister = async () => {
    try {
      setIsWaiting(true); // Hiển thị trạng thái "Waiting for approving"
      await apiConfig.post(`/requests/${id}/join`); // Gửi yêu cầu tham gia
      alert("Đã gửi yêu cầu tham gia. Vui lòng chờ admin duyệt.");
      setStatus("pending"); // Cập nhật trạng thái thành "pending"
    } catch (error) {
      console.error("Error joining project:", error);
      alert("Không thể gửi yêu cầu tham gia. Vui lòng thử lại sau.");
      setIsWaiting(false); // Quay lại trạng thái ban đầu nếu lỗi
    }
  };

  const handleGoToForum = () => {
    navigate(`/forum/${id}`); // Điều hướng đến trang forum
  };

  useEffect(() => {
    fetchProjectDetail();
    checkJoinedStatus();
  }, [id]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
  const fetchDonations = async () => {
    try {
      const response = await apiConfig.get(`http://localhost:8080/api/donations/project/${id}`);
      setDonations(response.data);
      console.log("Donations:", response.data);
    } catch (error) {
      console.error("Lỗi khi tải donations:", error);
    }
  };

  fetchDonations();
}, [id]);

  if (loading) {
    return <div className="text-center mt-10">Đang tải thông tin dự án...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!project) {
    return <div className="text-center mt-10 text-red-500">Dự án không tồn tại.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-2 flex flex-col gap-10 text-left">
        <div className="flex gap-8">
          {/* Cột bên trái: Nội dung dự án */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <img
              src={project.avatarFilepath}
              alt={project.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{project.description}</p>
            <p className="text-gray-700">
              <strong>Địa điểm:</strong> {project.location}
            </p>
            <p className="text-gray-700">
              <strong>Thời gian:</strong> {`${project.startTime[2]}/${project.startTime[1]}/${project.startTime[0]}`} - {`${project.endTime[2]}/${project.endTime[1]}/${project.endTime[0]}`}
            </p>
            <p className="text-gray-700">
              <strong>Số lượng tham gia tối đa:</strong> {project.maxParticipants}
            </p>
            <p className="text-gray-700">
              <strong>Số lượng hiện tại:</strong> {project.participantsCount}
            </p>
            <p className="text-gray-700">
              <strong>Lượt thích:</strong> {project.likesCount}
            </p>

            {/* Nút hành động */}
            <div className="flex justify-start w-full gap-4 mt-8">
              {status === "pending" ? (
                <button
                  className="py-3 px-6 text-lg font-semibold bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg shadow-md"
                  disabled
                >
                  Waiting for approving
                </button>
              ) : status === "approved" ? (
                <button
                  className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
                  onClick={handleGoToForum}
                >
                  Go to Forum
                </button>
              ) : (
                <button
                  className={`py-3 px-6 text-lg font-semibold rounded-lg shadow-md ${
                    isWaiting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-purple-200 text-purple-700 hover:bg-purple-300"
                  }`}
                  onClick={isWaiting ? null : handleRegister}
                  disabled={isWaiting}
                >
                  {isWaiting ? "Waiting for approving" : "❤️ Register"}
                </button>
              )}
              <button
                className="py-3 px-6 text-lg font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-900"
                onClick={() => setShowDonate(!showDonate)}
              >
                » Donate
              </button>
            </div>
            {showDonate && (
              <div className="mt-4 p-4 border border-purple-300 rounded-lg bg-purple-100 text-purple-900">
                <p className="mb-2">Nhập số tiền muốn ủng hộ (VND):</p>
                <input
                  type="number"
                  className="p-2 border rounded w-full mb-3"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="VD: 500000"
                />
                <button
                  className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-800"
                  onClick={processDonation}
                >
                  Xác nhận ủng hộ
                </button>
              </div>
            )}
          </div>

          {/* Cột bên phải: Thông tin bổ sung */}
          <Donation donations={donations} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;