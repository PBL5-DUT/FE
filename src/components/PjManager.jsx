import React from "react";
import { useState } from "react";
import p1 from "../assets/p1_img.jpg";
import p2 from "../assets/p2_img.png";

const projects = [
  {
    id: 1,
    name: "Trung thu cho em",
    location: "Quảng Ngãi",
    description: "Là dự án thường niên nhằm giúp đỡ trẻ em vùng cao...",
    image: p1, 
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
},
    {
    id: 2,
    name: "Chung tay mùa đông",
    location: "Hà Giang",
    description: "Hỗ trợ trẻ em nghèo có áo ấm và nhu yếu phẩm vào mùa đông...",
    image: p2,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
},
];

const PjManager = () => {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-6 border-b">
        {["Active", "Finished", "Locked"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium ${
                activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Danh sách dự án */}
      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center border-b pb-4">
            <img src={project.image} alt={project.title} className="w-40 h-24 rounded-lg" />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold">{project.title}</h2>
              <p className="text-gray-600 font-medium">{project.location}</p>
              <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
              <p className="text-gray-500 text-sm">Tối đa: {project.maxPeople} người</p>
              <p className="text-gray-500 text-sm">Thời gian: {project.time}</p>
            </div>
            <button className="text-gray-500 text-2xl">⋮</button>
          </div>
        ))}
      </div>

      {/* Nút Add Project */}
      <button className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg">
        <span className="text-xl mr-2">➕</span> Add Project
      </button>
    </div>
  );
};

export default PjManager;
