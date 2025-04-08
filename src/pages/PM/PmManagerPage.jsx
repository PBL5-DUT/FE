import React from "react";
import PjManager from "../../components/PM/PjManager";
import Header from "../../components/PM/Header";

const PmManager = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <div className="w-full p-6">
          <PjManager />
        </div>
      </div>
    </div>
  );
};

export default PmManager;