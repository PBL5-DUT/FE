import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConfig } from "../../config/apiConfig";
import Donation from "../../components/VLT/Donation";
import Expense from "../../components/VLT/Expense";
import TabContainer from '../../components/VLT/TabContainer';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHeart, FaClock, FaDonate, FaComments } from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

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

  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM, yyyy", { locale: vi });
  };

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
    navigate(`/forumoverview/${id}`, {
      state: {
        projectId: id,
        projectName: project.name,
      }
    });
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
    checkJoinedStatus();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-purple-500 font-medium text-lg animate-pulse">
            Đang tải thông tin dự án...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đã có lỗi xảy ra</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProjectDetail}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-black">
        <img
          src={project.avatarFilepath}
          alt={project.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">{project.name}</h1>
            <div className="flex items-center space-x-6 text-gray-200">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {project.location}
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {formatDate(project.startTime)}
              </div>
              <div className="flex items-center">
                <FaHeart className="mr-2" />
                {project.likesCount} lượt thích
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column - Project Details */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Thông tin dự án</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center text-purple-700 mb-2">
                    <FaClock className="mr-2" />
                    <span className="font-semibold">Thời gian</span>
                  </div>
                  <p className="text-gray-700">
                    {formatDate(project.startTime)} → {formatDate(project.endTime)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center text-purple-700 mb-2">
                    <FaUsers className="mr-2" />
                    <span className="font-semibold">Số lượng tham gia</span>
                  </div>
                  <p className="text-gray-700">
                    {project.participantsCount}/{project.maxParticipants} người
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {status === "pending" ? (
                  <button className="flex-1 py-3 px-6 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed">
                    <FaClock className="inline mr-2" />
                    Đang chờ duyệt
                  </button>
                ) : status === "approved" ? (
                  <button
                    onClick={handleGoToForum}
                    className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <FaComments className="inline mr-2" />
                    Tham gia diễn đàn
                  </button>
                ) : (
                  <button
                    onClick={handleRegister}
                    disabled={isWaiting}
                    className="flex-1 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:bg-gray-300"
                  >
                    <FaUsers className="inline mr-2" />
                    Đăng ký tham gia
                  </button>
                )}
                <button
                  onClick={() => setShowDonate(!showDonate)}
                  className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  <FaDonate className="inline mr-2" />
                  Ủng hộ dự án
                </button>
              </div>

              {/* Donation Form */}
              {showDonate && (
                <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">Ủng hộ dự án</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Số tiền ủng hộ (VNĐ)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nhập số tiền..."
                      />
                    </div>
                    <button
                      onClick={processDonation}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
                    >
                      Xác nhận ủng hộ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Donation/Expense History */}
          <div className="w-80">
            <TabContainer projectId={id} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
