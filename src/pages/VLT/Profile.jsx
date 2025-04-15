import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/VLT/Header"; // Import Header

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: "",
    username: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.get("http://localhost:8080/api/v1/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      setProfile(response.data); // Lưu thông tin người dùng vào state
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Không thể tải thông tin người dùng. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Lấy token từ localStorage
      const response = await axios.put(
        `http://localhost:8080/api/users/${profile.userId}`,
        {
            userId: profile.userId,
          username: profile.username,
          email: profile.email,
          fullName: profile.fullName,
          phone: profile.phone,
          address: profile.address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        }
      );
      setSuccessMessage("Cập nhật thông tin thành công!");
      console.log("Update response:", response.data);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Không thể cập nhật thông tin. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Đang tải thông tin...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header /> {/* Thêm Header */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8">
        {/* Form chỉnh sửa thông tin */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          {[
            { label: "Tên người dùng", value: profile.username, key: "username" },
            { label: "Họ tên", value: profile.fullName, key: "fullName" },
            { label: "Địa chỉ", value: profile.address, key: "address" },
            { label: "Điện thoại", value: profile.phone, key: "phone" },
            { label: "Email", value: profile.email, key: "email" },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    setProfile({ ...profile, [field.key]: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Save
          </button>
        </div>

        {/* Avatar và nút đổi ảnh */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full md:w-1/3">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="h-32 w-32 rounded-full mb-4"
          />
          <span className="text-lg font-semibold">@{profile.username}</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
            Change avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;