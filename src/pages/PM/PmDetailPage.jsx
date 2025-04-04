import React from "react";
import PMDetail from "../../components/PM/PMDetail";
import Header from "../../components/PM/Header";

const PmDetailPage = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <div className="w-full lg:w-3/4 p-6">
          <PMDetail />
        </div>
      </div>
    </div>
  );
};

export default PmDetailPage;