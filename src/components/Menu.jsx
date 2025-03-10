import React from "react";
import { Link } from "react-router-dom";
import userAvatar from "../assets/avatar-icon.avif";


const Menu = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 p-2">
      <div className="flex flex-col items-center py-2">
        <img src= {userAvatar} alt="User Avatar" className="h-14 w-14 rounded-full mb-2" />
        <span className="text-gray-800 font-semibold">UserName</span>
      </div>
      <hr className="my-2" />
      <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
        Profile
      </Link>
      <Link to="/project-manager" className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
        Project Manager
      </Link>
      <button className="flex items-center gap-2 p-2 w-full text-left hover:bg-gray-200 rounded">
        Logout
      </button>
    </div>
  );
};

export default Menu;
