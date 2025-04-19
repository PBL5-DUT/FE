import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/VLT/Header"; // Import Header

const ProjectDetail = () => {
  const { id } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get(`http://localhost:8080/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setProject(response.data); // Lưu thông tin dự án vào state
    } catch (err) {
      console.error("Error fetching project detail:", err);
      setError("Không thể tải thông tin dự án. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }

  };
  const processDonation = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
  
    if (!amount || isNaN(amount)) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
          userId: userId,
        }),
      });
  
      // Kiểm tra xem response có phải là JSON hợp lệ không
      if (response.ok) {
        const data = await response.json(); // Chỉ parse khi phản hồi hợp lệ
        window.location.href = data.paymentUrl; // Điều hướng đến URL thanh toán
      } else {
        const errorText = await response.text(); // Lấy phản hồi dưới dạng text khi có lỗi
        console.error("Lỗi từ server:", errorText);
        alert("Không thể kết nối đến hệ thống thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Không thể kết nối đến hệ thống thanh toán.");
    }
  };
  
  
  
  useEffect(() => {
    fetchProjectDetail();
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
      <Header /> {/* Thêm Header */}
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-8 text-left">
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
              <button className="py-3 px-6 text-lg font-semibold bg-purple-200 text-purple-700 rounded-lg shadow-md hover:bg-purple-300">
                ❤️ Register
              </button>
              <button className="py-3 px-6 text-lg font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-900"
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
          <div className="w-1/3 bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Thông tin bổ sung</h2>
            <p className="text-gray-700">
              <strong>Trạng thái:</strong> {project.status}
            </p>
            <p className="text-gray-700">
              <strong>Quản lý dự án:</strong> {project.pmId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;