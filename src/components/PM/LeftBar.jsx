import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const LeftBar = () => {
  return (
    <div className="bg-gray-100 w-64 h-full p-4 shadow-md rounded-lg">
      <NavLink
        to="/forum"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 p-3 mb-2 text-blue-600 bg-blue-100 rounded-lg font-semibold"
            : "flex items-center gap-2 p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
        }
      >
        <span role="img" aria-label="home">
          🏠
        </span>
        Main
      </NavLink>
      <NavLink
        to="/projectchild"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 p-3 mb-2 text-blue-600 bg-blue-100 rounded-lg font-semibold"
            : "flex items-center gap-2 p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
        }
      >
        <span role="img" aria-label="projects">
          ↗️
        </span>
        Child Projects
      </NavLink>
      <NavLink
        to="/projectmember"
        className={({ isActive }) =>
          isActive
            ? "flex items-center gap-2 p-3 mb-2 text-blue-600 bg-blue-100 rounded-lg font-semibold"
            : "flex items-center gap-2 p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
        }
      >
        <span role="img" aria-label="members">
          👥
        </span>
        Members
      </NavLink>
      <div className="mt-4">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 p-3 mb-2 text-blue-600 bg-blue-100 rounded-lg font-semibold"
              : "flex items-center gap-2 p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
          }
        >
          <span role="img" aria-label="chat">
            💬
          </span>
          Chat
        </NavLink>
      </div>
    </div>
  );
};

export default LeftBar;