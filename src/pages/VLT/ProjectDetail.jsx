import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConfig } from "../../config/apiConfig";
import Donation from "../../components/VLT/Donation";

const formatDate = (dateString) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("vi-VN", options);
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [donations, setDonations] = useState([]);

  // Fetch project detail
  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/projects/${id}`);
      setProject(response.data);
    } catch (err) {
      console.error("Error fetching project detail:", err);
      setError("Không thể tải thông tin dự án. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch donations
  const fetchDonations = async () => {
    try {
      const response = await apiConfig.get(`/donations/project/${id}`);
      setDonations(response.data);
    } catch (error) {
      console.error("Lỗi khi tải donations:", error);
    }
  };

  // Check project join status
  const checkJoinedStatus = async () => {
    try {
      const response = await apiConfig.get(`/requests/${id}/check-join`);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error checking joined status:", error);
    }
  };

  // Handle project join request
  const handleRegister = async () => {
    try {
      setIsWaiting(true);
      await apiConfig.post(`/requests/${id}/join`);
      alert("Đã gửi yêu cầu tham gia. Vui lòng chờ admin duyệt.");
      setStatus("pending");
    } catch (error) {
      console.error("Error joining project:", error);
      alert("Không thể gửi yêu cầu tham gia. Vui lòng thử lại sau.");
      setIsWaiting(false);
    }
  };

  // Handle navigation to forum
  const handleGoToForum = () => {
    navigate(`/forum/${id}`);
  };

  // Handle donation processing
  const processDonation = async () => {
    if (!amount || isNaN(amount)) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.userId) {
      alert("Bạn cần đăng nhập để ủng hộ.");
      return;
    }

    try {
      const response = await apiConfig.post('/payment/create', {
        amount,
        userId: user.userId,
        projectId: id,
      });

      if (response.status === 200) {
        window.location.href = response.data.paymentUrl;
      } else {
        console.error("Lỗi từ server:", response.data);
        alert("Không thể kết nối đến hệ thống thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Không thể kết nối đến hệ thống thanh toán.");
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProjectDetail();
    fetchDonations();
    checkJoinedStatus();
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
      <div className="max-w-7xl mx-auto p-4 flex flex-col gap-10 text-left">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
            <img
              src={project.avatarFilepath}
              alt={project.name}
              className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{project.description}</p>
            <p className="text-gray-700"><strong>Địa điểm:</strong> {project.location}</p>
            <p className="text-gray-700">
              <strong>Thời gian:</strong> {formatDate(project.startTime)} → {formatDate(project.endTime)}
            </p>
            <p className="text-gray-700"><strong>Số lượng tham gia tối đa:</strong> {project.maxParticipants}</p>
            <p className="text-gray-700"><strong>Số lượng hiện tại:</strong> {project.participantsCount}</p>
            <p className="text-gray-700"><strong>Lượt thích:</strong> {project.likesCount}</p>

            {/* Buttons */}
<div className="flex justify-start w-full gap-4 mt-8">
  {project.status === "locked" ||  project.status === "lockedpending" ? (
  <div className="py-3 px-6 text-lg font-semibold text-red-600 bg-red-100 rounded-lg shadow-md">
    {project.status === "locked" ? "This project is locked" : "This project is pending lock approval"}
  </div>
  ) : (
    <>
      {status === "pending" ? (
        <button className="py-3 px-6 text-lg font-semibold bg-gray-400 text-gray-700 cursor-not-allowed rounded-lg shadow-md" disabled>
          Waiting for approving
        </button>
      ) : status === "approved" ? (
        <button className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700" onClick={handleGoToForum}>
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
    </>
  )}
</div>

            {/* Donation Form */}
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

          {/* Right Column */}
          <Donation donations={donations} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
