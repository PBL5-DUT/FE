import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiConfig } from "../../config/apiConfig";

import TabContainer from '../../components/VLT/TabContainer';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaHeart, FaClock, FaDonate, FaComments, FaLock, FaExclamationTriangle } from "react-icons/fa";
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
  const [activeTab, setActiveTab] = useState("Donation"); 


  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM, yyyy", { locale: vi });
  };

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/projects/${id}`);
      console.log("API Response:", response.data);
      setProject(response.data);
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
      console.log("Joined status response:", response.data);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Error checking joined status:", error);
    }
  };

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

  const handleGoToForum = () => {
    navigate(`/forumoverview/${id}`, {
      state: {
        projectId: id,
        projectName: project.name,
      }
    });
  };

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
        alert("Không thể kết nối đến hệ thống thanh toán.");
      }
    } catch (error) {
      alert("Không thể kết nối đến hệ thống thanh toán.");
    }
  };

  // Function to render status notification for locked projects
  const renderLockedStatusNotification = () => {
    if (project.status === 'locked') {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-red-700 mb-2">
            <FaLock className="mr-2" />
            <span className="font-semibold">Dự án đã bị khóa</span>
          </div>
          <p className="text-red-600 text-sm">
            Dự án này hiện đang bị khóa và không thể tham gia hoặc ủng hộ. 
            Vui lòng liên hệ quản trị viên để biết thêm thông tin.
          </p>
        </div>
      );
    }

    if (project.status === 'lockedpending') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-yellow-700 mb-2">
            <FaExclamationTriangle className="mr-2" />
            <span className="font-semibold">Dự án đang chờ xem xét</span>
          </div>
          <p className="text-yellow-600 text-sm">
            Dự án này đang trong quá trình xem xét và tạm thời không thể tham gia hoặc ủng hộ. 
            Vui lòng kiểm tra lại sau.
          </p>
        </div>
      );
    }
    if (project.status === 'finished') {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center text-yellow-700 mb-2">
            <FaExclamationTriangle className="mr-2" />
            <span className="font-semibold">Dự án đã kết thúc</span>
          </div>
          <p className="text-yellow-600 text-sm">
            Dự án này đã kết thúc. Bạn không thể tham gia hoặc ủng hộ nữa.
          </p>
        </div>
      );
    }

    return null;
  };

  // Function to check if project actions should be disabled
  const isProjectLocked = () => {
    return project.status === 'locked' || project.status === 'lockedpending' || project.status === 'finished';
  };

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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Column - Project Details - Reduced width */}
          <div className="w-[800px]"> {/* Changed from flex-1 to fixed width */}
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

              {/* Status Notification for Locked Projects */}
              {renderLockedStatusNotification()}

              {/* Action Buttons - Only show if project is not locked */}
              {!isProjectLocked() && (
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
              )}
   
              {/* Donation Section - Only show if project is not locked */}
              {!isProjectLocked() && showDonate && (
                <div className="mt-6 p-6 border border-purple-200 rounded-2xl bg-purple-50 text-purple-900 shadow-md space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cách 1: Ủng hộ gián tiếp qua chủ dự án</h3>
                    <div className="bg-white p-4 rounded-lg border text-sm">
                      <p className="font-medium text-gray-700">Thông tin chuyển khoản:</p>
                      <p className="mt-1 text-gray-900">{project.bank}</p>
                    </div>
                  </div>

                  <div className="border-t border-purple-300 my-4"></div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cách 2: Ủng hộ trực tiếp qua VNPay</h3>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nhập số tiền muốn ủng hộ (VND):
                    </label>
                    <input
                      type="number"
                      className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="VD: 500000"
                    />
                    <button
                      className="mt-4 w-full py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-all"
                      onClick={processDonation}
                    >
                      Xác nhận ủng hộ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Fixed position */}
          <div className="fixed right-0 top-[64px] w-[300px] h-[calc(100vh-64px)] bg-white shadow-lg overflow-hidden">
            <TabContainer projectId={id} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;