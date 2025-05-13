import React, { useState, useEffect, useContext } from "react";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";
import { uploadFileToAzure } from "../../util/azureBlobService";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    userId: "",
    username: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    avatarFilepath: "",
  });

  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user")) || currentUser;
    if (storedData) {
      setProfile({
        userId: storedData.userId || "",
        username: storedData.username || "",
        email: storedData.email || "",
        fullName: storedData.fullName || "",
        phone: storedData.phone || "",
        address: storedData.address || "",
        avatarFilepath: storedData.avatarFilepath || "",
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
  }, [currentUser]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const payload = { ...profile };
      delete payload.password;
      delete payload.confirmPassword;

      const res = await apiConfig.put(`/users/${profile.userId}`, payload);
      localStorage.setItem("user", JSON.stringify(res.data));
      setCurrentUser(res.data);
      setSuccessMessage("Cập nhật thành công!");
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setAvatarUploading(true);
      const uniqueFileName = `${profile.userId}-${Date.now()}.png`; // Tạo tên file duy nhất
      const url = await uploadFileToAzure("user", uniqueFileName, file);
      const updated = { ...profile, avatarFilepath: url };
      const res = await apiConfig.put(`/users/${profile.userId}`, updated);
      setProfile((prev) => ({ ...prev, avatarFilepath: url }));
      setCurrentUser(res.data);
      localStorage.setItem("user",JSON.stringify(res.data));
      setSuccessMessage("Avatar cập nhật thành công!");
    } catch {
      setError("Không thể cập nhật avatar.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition";

  const validPassword = profile.password === profile.confirmPassword;

  return (
    <div className="min-h-screen bg-[#F1F5F9] py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center text-center gap-4">
          <img
            src={profile.avatarFilepath || "https://via.placeholder.com/150"}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md"
          />
          <p className="font-semibold text-lg">@{profile.username}</p>
          <label htmlFor="avatar-upload" className="text-white bg-blue-500 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
            {avatarUploading ? "Đang tải..." : "Đổi Avatar"}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Thông tin cá nhân</h2>

          {successMessage && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded-md">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
              {error}
            </div>
          )}

          {[
            { label: "Tên người dùng", key: "username", readOnly: true },
            { label: "Họ tên", key: "fullName" },
            { label: "Email", key: "email", readOnly: true },
            { label: "Số điện thoại", key: "phone" },
            { label: "Địa chỉ", key: "address" },
          ].map(({ label, key, readOnly }) => (
            <div key={key}>
              <label className="text-sm text-gray-700 font-medium">{label}</label>
              <input
                type="text"
                value={profile[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                readOnly={readOnly}
                className={`${inputClass} ${readOnly ? "bg-gray-100 cursor-not-allowed" : "border-gray-300 focus:ring-blue-500"}`}
              />
            </div>
          ))}

          {/* Toggle change password */}
          <div>
            {!showChangePassword ? (
              <button
                onClick={() => setShowChangePassword(true)}
                className="text-blue-600 underline text-sm hover:text-blue-800 transition"
              >
                Thay đổi mật khẩu
              </button>
            ) : (
              <div className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="text-sm text-gray-700 font-medium">Mật khẩu mới</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={profile.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`${inputClass} pr-10 border-gray-300 focus:ring-blue-500`}
                      placeholder="Nhập mật khẩu mới"
                    />
                    <span
                      className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm text-gray-700 font-medium">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={profile.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`${inputClass} pr-10 ${
                        profile.confirmPassword
                          ? validPassword
                            ? "border-green-500 focus:ring-green-500"
                            : "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="Xác nhận lại mật khẩu"
                    />
                    <span
                      className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            onClick={validPassword ? handleSave : null}
            disabled={loading || !validPassword}
            className={`w-full py-3 text-white font-semibold rounded-xl shadow-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition ${
              loading || !validPassword ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
