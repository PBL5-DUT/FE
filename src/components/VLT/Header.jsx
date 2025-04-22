import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo_conen.jpg";
import userAvatar from "../../assets/avatar-icon.avif";
import Menu from "./Menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="p-4 bg-white flex items-center justify-between relative">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Volunteer Logo" className="h-12 mb-1" />
        <h1 className="text-xs font-bold text-gray-800">Volunteer</h1>
      </div>
      <nav className="flex space-x-8">
        <NavLink to="/home" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500 font-medium"}>Home</NavLink>
        <NavLink to="/joined" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500 font-medium"}>Joined Project</NavLink>
        <NavLink to="/information" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500 font-medium"}>Information</NavLink>
        <NavLink to="/aboutus" className={({ isActive }) => isActive ? "text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500 font-medium"}>About us</NavLink>
      </nav>
      <div className="relative">
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col items-center">
          <img src={userAvatar} alt="User Avatar" className="h-10 w-10 rounded-full border cursor-pointer" />
          <span className="text-sm font-semibold text-gray-800">UserName</span>
        </button>
        <Menu isOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <hr className="absolute bottom-0 left-0 w-full border-gray-800 border-0.7" />
    </div>
  );
};

export default Header;
