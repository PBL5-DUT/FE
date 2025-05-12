import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ArrowUpRight, Users } from "lucide-react"; // modern icons

const navItems = [
  { to: "/forum", label: "Main", icon: <Home size={18} /> },
  { to: "/projectchild", label: "Child Projects", icon: <ArrowUpRight size={18} /> },
  { to: "/projectmember", label: "Members", icon: <Users size={18} /> },
];

const LeftBar = () => {
  return (
    <div className="bg-white w-auto min-w-[100px] h-[60vh] p-4 border-r border-gray-200">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              } transition`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default LeftBar;
