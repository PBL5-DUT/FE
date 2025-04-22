import React, { useState, useEffect } from "react";
import { apiConfig } from "../../config/apiConfig";

const Profile = () => {
  const [profile, setProfile] = useState({
    userId: "",
    username: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage: ", storedData);

    if (storedData) {
      setProfile({
        userId: storedData.userId || "",
        username: storedData.username || "",
        email: storedData.email || "",
        fullName: storedData.fullName || "",
        phone: storedData.phone || "",
        address: storedData.address || "",
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        userId: profile.userId,
        username: profile.username,
        email: profile.email,
        fullName: profile.fullName,
        phone: profile.phone,
        address: profile.address,
      };

      console.log("Payload being sent:", payload);

      const response = await apiConfig.put(`/users/${profile.userId}`, payload);

      setProfile((prev) => ({
        ...prev,
        ...response.data, 
        password: "",
        confirmPassword: "",
      }));

      // Lưu dữ liệu mới vào localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      setSuccessMessage("Cập nhật thông tin thành công!");
      console.log("Update response:", response.data);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const isPasswordMatch = profile.password === profile.confirmPassword;

  if (loading) {
    return <div className="text-center mt-10">Đang tải thông tin...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8">
        {/* Phần avatar và nút đổi ảnh */}
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

        {/* Phần thông tin cá nhân */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          {[
            {
              label: "Tên người dùng",
              value: profile.username,
              key: "username",
              readOnly: true,
            },
            {
              label: "Họ tên",
              value: profile.fullName,
              key: "fullName",
              readOnly: false,
            },
            {
              label: "Địa chỉ",
              value: profile.address,
              key: "address",
              readOnly: false,
            },
            {
              label: "Điện thoại",
              value: profile.phone,
              key: "phone",
              readOnly: false,
            },
            {
              label: "Email",
              value: profile.email,
              key: "email",
              readOnly: true,
            },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={field.value}
                  readOnly={field.readOnly}
                  onChange={(e) =>
                    setProfile({ ...profile, [field.key]: e.target.value })
                  }
                  className={`w-full border ${
                    field.readOnly
                      ? "bg-gray-100 cursor-not-allowed"
                      : "border-gray-300"
                  } rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          ))}

          {/* Mật khẩu mới */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={profile.password}
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Nhập lại mật khẩu */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nhập lại mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={profile.confirmPassword}
                onChange={(e) =>
                  setProfile({ ...profile, confirmPassword: e.target.value })
                }
                className={`w-full border ${
                  profile.confirmPassword
                    ? isPasswordMatch
                      ? "border-green-500"
                      : "border-red-500"
                    : "border-gray-300"
                } rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                  profile.confirmPassword
                    ? isPasswordMatch
                      ? "focus:ring-green-500"
                      : "focus:ring-red-500"
                    : "focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "🙈"}
              </button>
            </div>
            {!isPasswordMatch && profile.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Mật khẩu không khớp, vui lòng kiểm tra lại.
              </p>
            )}
          </div>

          <button
            onClick={isPasswordMatch ? handleSave : null}
            disabled={loading || !isPasswordMatch}
            className={`bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition ${
              loading || !isPasswordMatch ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;