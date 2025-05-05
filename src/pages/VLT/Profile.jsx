import React, { useState, useEffect, useContext } from "react";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";
import { uploadFileToAzure } from "../../util/azureBlobService";

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
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      const payload = { ...profile, password: undefined, confirmPassword: undefined };
      const response = await apiConfig.put(`/users/${profile.userId}`, payload);
      localStorage.setItem("user", JSON.stringify(response.data));
      setProfile((prev) => ({ ...prev, ...response.data }));
      setSuccessMessage("Cập nhật thông tin thành công!");
    } catch (err) {
      setError("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setAvatarUploading(true);
      const uploadedUrl = await uploadFileToAzure("user", `${profile.userId}.png`, file);
      const payload = { ...profile, avatarFilepath: uploadedUrl };
      const response = await apiConfig.put(`/users/${profile.userId}`, payload);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(response.data);
      setProfile((prev) => ({ ...prev, avatarFilepath: uploadedUrl }));
      setSuccessMessage("Avatar đã được cập nhật thành công!");
    } catch (error) {
      setError("Không thể cập nhật avatar. Vui lòng thử lại.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const renderProfileFields = () => {
    const fields = [
      { label: "Tên người dùng", key: "username", readOnly: true },
      { label: "Họ tên", key: "fullName", readOnly: false },
      { label: "Địa chỉ", key: "address", readOnly: false },
      { label: "Điện thoại", key: "phone", readOnly: false },
      { label: "Email", key: "email", readOnly: true },
    ];

    return fields.map((field, index) => (
      <div key={index} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
        <input
          type="text"
          value={profile[field.key]}
          readOnly={field.readOnly}
          onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
          className={`w-full border ${
            field.readOnly ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
          } rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
    ));
  };

  const AvatarSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-full md:w-1/3">
      <img
        src={profile.avatarFilepath || "https://via.placeholder.com/150"}
        alt="User Avatar"
        className="h-32 w-32 rounded-full mb-4"
      />
      <span className="text-lg font-semibold">@{profile.username}</span>
      <label
        htmlFor="avatar-upload"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition cursor-pointer"
      >
        {avatarUploading ? "Uploading..." : "Change Avatar"}
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
      />
    </div>
  );

  if (loading) return <div className="text-center mt-10">Đang tải thông tin...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 p-8">
        <AvatarSection />
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
          {renderProfileFields()}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              value={profile.password}
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nhập lại mật khẩu</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={profile.confirmPassword}
              onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })}
              className={`w-full border ${
                profile.confirmPassword
                  ? profile.password === profile.confirmPassword
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              } rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ${
                profile.confirmPassword
                  ? profile.password === profile.confirmPassword
                    ? "focus:ring-green-500"
                    : "focus:ring-red-500"
                  : "focus:ring-blue-500"
              }`}
            />
          </div>
          <button
            onClick={profile.password === profile.confirmPassword ? handleSave : null}
            disabled={loading || profile.password !== profile.confirmPassword}
            className={`bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition ${
              loading || profile.password !== profile.confirmPassword
                ? "opacity-50 cursor-not-allowed"
                : ""
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