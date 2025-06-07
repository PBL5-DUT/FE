import React from 'react';
import { FaHome, FaProjectDiagram, FaUsers } from 'react-icons/fa';

const LeftBar = ({ activeTab, setActiveTab, projectName }) => {
  return (
    <div className="p-4 fixed">
      <h2
        className="text-l font-bold text-blue-700 mb-6 truncate max-w-[180px] overflow-hidden whitespace-nowrap"
        title={projectName}
      >
        {projectName}
      </h2>
      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'home'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <FaHome className="text-xl" />
          <span className="font-medium">Trang chủ</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'projects'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <FaProjectDiagram className="text-xl" />
          <span className="font-medium">Dự án con</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'members'
              ? 'bg-blue-50 text-blue-600'
              : 'hover:bg-gray-50 text-gray-700'
          }`}
        >
          <FaUsers className="text-xl" />
          <span className="font-medium">Thành viên</span>
        </button>
      </nav>
    </div>
  );
};

export default LeftBar;