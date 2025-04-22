import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userAvatar from "../../assets/avatar-icon.avif";

const Menu = ({ isOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // Đảm bảo trạng thái được cập nhật
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 p-2 z-50"
      onMouseLeave={() => setMenuOpen(false)} // 👈 Auto close menu
    >
      <div className="flex flex-col items-center py-2">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="h-14 w-14 rounded-full mb-2"
        />
        <span className="text-gray-800 font-semibold">UserName</span>
      </div>
      <hr className="my-2" />
      <Link
        to="/profile"
        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
      >
        Profile
      </Link>
      <Link
        to="/project-manager"
        className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
      >
        Project Manager
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-200 rounded"
      >
        Logout
      </button>
    </div>
  );
};


export default Menu;