import React from "react";

const Donation = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">DONATIONS</h2>

      {/* Danh sách quyên góp */}
      <div className="border-b border-gray-300 pb-2 mb-4">
        <div className="flex justify-between font-semibold text-gray-700">
          <span>NAME</span>
          <span>VND</span>
        </div>
      </div>

      {/* Tổng số tiền */}
      <div className="flex justify-between font-semibold text-gray-800">
        <span>Total:</span>
        <span>0 VND</span>
      </div>
    </div>
  );
};

export default Donation;