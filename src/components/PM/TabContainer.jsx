import React, { useState } from 'react';
import Donation from './Donation';
import Expense from './Expense';

const TabContainer = ({ projectId }) => {
  const [activeTab, setActiveTab] = useState("Donation");

  return (
    <div className="fixed right-0 top-[64px] w-[300px] h-[calc(100vh-64px)] bg-white shadow-lg">
      {/* Tab Buttons */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "Donation"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("Donation")}
        >
          Ủng hộ
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${
            activeTab === "Expense"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("Expense")}
        >
          Chi tiêu
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)]">
        {activeTab === "Donation" ? (
          <Donation projectId={projectId} isFixed={false} />
        ) : (
          <Expense projectId={projectId} isFixed={false} />
        )}
      </div>
    </div>
  );
};

export default TabContainer;