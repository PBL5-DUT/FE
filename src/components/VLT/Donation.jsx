import React, { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";

const Donation = ({ projectId }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Money");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Hiển thị 10 người dùng mỗi trang

  // Fetch donations
  const fetchDonations = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/donations/project/${projectId}`);
      setDonations(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setError("Không thể tải danh sách ủng hộ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [projectId]);

  // Phân loại donations
  const moneyDonations = donations.filter((donation) => donation.type === "money") || [];
  const goodsDonations = donations.filter((donation) => donation.type === "goods") || [];

  // Tính tổng tiền đóng góp
  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);

  // Hàm xử lý phân trang
  const paginatedDonations = (donations) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return donations.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    (activeTab === "Money" ? moneyDonations : goodsDonations).length / itemsPerPage
  );

  if (loading) {
    return <div className="text-xs text-gray-500">Đang tải danh sách ủng hộ...</div>;
  }

  if (error) {
    return <div className="text-xs text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-sm font-bold mb-3 text-red-500">Donations</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium ${
            activeTab === "Money" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("Money")}
        >
          Money
        </button>
        <button
          className={`px-3 py-1 rounded-lg text-xs font-medium ${
            activeTab === "Goods" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("Goods")}
        >
          Goods
        </button>
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-2 py-2 text-left">#</th>
              <th className="border border-gray-300 px-2 py-2 text-left">Username</th>
              <th className="border border-gray-300 px-2 py-2 text-right">
                {activeTab === "Money" ? "VND" : "Quantity"}
              </th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === "Money" ? moneyDonations : goodsDonations).length > 0 ? (
              paginatedDonations(activeTab === "Money" ? moneyDonations : goodsDonations).map(
                (donation, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="border border-gray-300 px-2 py-2">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">{donation.user.username}</td>
                    <td className="border border-gray-300 px-2 py-2 text-right">
                      {activeTab === "Money"
                        ? `${donation.amount.toLocaleString()}`
                        : donation.amount}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-3 text-gray-500">
                  No donations yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total chỉ hiển thị ở tab Money */}
      {activeTab === "Money" && (
        <div className="mt-4 text-right">
          <p className="text-xs font-medium text-gray-700">
            Total:{" "}
            <span className="font-bold text-red-500">{totalMoney.toLocaleString()} VND</span>
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {(activeTab === "Money" ? moneyDonations : goodsDonations).length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center text-xs">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Donation;
