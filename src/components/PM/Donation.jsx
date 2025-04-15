import React, { useState } from "react";

const Donation = ({ donations }) => {
  const [activeTab, setActiveTab] = useState("Money");

  const moneyDonations = donations || [];
  const goodsDonations = [];  

  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="w-80 bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-500">DONATIONS</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "Money" ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("Money")}
        >
          Money
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            activeTab === "Goods" ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setActiveTab("Goods")}
        >
          Goods
        </button>
      </div>

      {/* Content */}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">NAME</th>
            <th className="text-right">{activeTab === "Money" ? "VND" : "SỐ LƯỢNG"}</th>
          </tr>
        </thead>
        <tbody>
          {(activeTab === "Money" ? moneyDonations : goodsDonations).length > 0 ? (
            (activeTab === "Money" ? moneyDonations : goodsDonations).map((donation, index) => (
              <tr key={index}>
              <td className="border-b border-red-500 py-3">User #{donation.userId}</td>
              <td className="border-b border-red-500 py-3 text-right">
                  {activeTab === "Money"
                    ? `${donation.amount.toLocaleString()} VND`
                    : donation.amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-3">
                Chưa có đóng góp nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total chỉ hiện ở tab Money */}
      {activeTab === "Money" && (
        <div className="mt-8">
          <p className="text-lg font-semibold">
            Total: {totalMoney.toLocaleString()} VND
          </p>
        </div>
      )}
    </div>
  );
};

export default Donation;
