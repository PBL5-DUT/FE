import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_conen.jpg";
import userAvatar from "../../assets/avatar-icon.avif";
import Menu from "./Menu";
import { AuthContext } from "../../util/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="p-2 bg-white flex items-center justify-between relative shadow-md">
      {/* Logo Section */}
     <div className="flex flex-col items-center">
             <img src={logo} alt="Volunteer Logo" className="h-8 mb-0" />
             <h1 className="text-xs font-bold text-gray-800">Volunteer</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold text-xl border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500 font-medium text-xl"
          }
        >
          Trang chủ
        </NavLink>
        <NavLink
          to="/joined"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold text-xl border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500 font-medium text-xl"
          }
        >
          Đã tham gia
        </NavLink>
        <NavLink
          to="/information"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold text-xl border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500 font-medium text-xl"
          }
        >
          Thông tin
        </NavLink>
        <NavLink
          to="/aboutus"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold text-xl border-b-2 border-blue-500 pb-1"
              : "text-gray-500 hover:text-blue-500 font-medium text-xl"
          }
        >
          Về chúng tôi
        </NavLink>
      </nav>

      {/* User Section */}
      <div className="relative flex items-center space-x-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center space-x-2"
        >
          <img
            src={currentUser.avatarFilepath || userAvatar}
            alt="User Avatar"
            className="h-10 w-10 rounded-full border cursor-pointer"
          />
          <span className="text-lg font-semibold text-gray-800">
            {currentUser.username}
          </span>
        </button>
        <Menu isOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>

      {/* Bottom Border */}
      <hr className="absolute bottom-0 left-0 w-full border-gray-300" />
    </div>
  );
};

export default Header;
