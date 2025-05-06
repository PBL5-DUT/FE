import React, { useState } from "react";

const Donation = ({ donations }) => {
  const [activeTab, setActiveTab] = useState("Money");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Phân loại donations
  const moneyDonations = donations || [];
  const goodsDonations = [];
  
  // Tính tổng tiền đóng góp
  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);

  // Hàm xử lý phân trang
  const paginatedDonations = (donations) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return donations.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(moneyDonations.length / itemsPerPage);

  return (
    <div className="w-[28rem] bg-white p-6 rounded-lg shadow-md">
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
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">ID</th>
            <th className="text-left">NAME</th>
            <th className="text-right">
              {activeTab === "Money" ? "VND" : "SỐ LƯỢNG"}
            </th>
          </tr>
        </thead>
        <tbody>
          {(activeTab === "Money" ? moneyDonations : goodsDonations).length > 0 ? (
            paginatedDonations(activeTab === "Money" ? moneyDonations : goodsDonations).map(
              (donation, index) => (
                <tr key={index}>
                  <td className="border-b border-red-500 py-3">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="border-b border-red-500 py-3">{donation.user.userId}</td>
                  <td className="border-b border-red-500 py-3">{donation.user.fullName}</td>
                  <td className="border-b border-red-500 py-3 text-right">
                    {activeTab === "Money"
                      ? `${donation.amount.toLocaleString()} VND`
                      : donation.amount}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Chưa có đóng góp nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Total chỉ hiển thị ở tab Money */}
      {activeTab === "Money" && (
        <div className="mt-8">
          <p className="text-lg font-semibold">
            Total: {totalMoney.toLocaleString()} VND
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {activeTab === "Money" && moneyDonations.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Donation;
