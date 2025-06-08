import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";
import AddDonation from "./AddDonation";

const Donation = ({ projectId, isFixed = true }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Money");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // Giảm số item để phù hợp với layout

  useEffect(() => {
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
    fetchDonations();
  }, [projectId]);

  const moneyDonations = donations.filter((donation) => donation.type === "money") || [];
  const goodsDonations = donations.filter((donation) => donation.type === "goods") || [];
  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);

  const paginatedDonations = () => {
    const currentData = activeTab === "Money" ? moneyDonations : goodsDonations;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return currentData.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(
    (activeTab === "Money" ? moneyDonations : goodsDonations).length / itemsPerPage
  );

  return (
    <div className="h-full flex flex-col relative">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-500">Đang tải...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-red-500">{error}</div>
        </div>
      ) : (
        <>
          {/* Table Container - Scrollable */}
          <div className="flex-1 overflow-auto p-4">
            {/* Dropdown Tab */}
            <div className="mb-4">
              <select
                value={activeTab}
                onChange={(e) => {
                  setActiveTab(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-1 text-xs rounded border border-gray-300"
              >
                <option value="Money">Tiền mặt</option>
                <option value="Goods">Hàng hóa</option>
              </select>
            </div>

            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-white border-b">
                <tr className="text-gray-600">
                  <th className="text-left py-2 w-8">STT</th>
                  <th className="text-left py-2">Người ủng hộ</th>
                  <th className="text-right py-2">
                    {activeTab === "Money" ? "Số tiền" : "Mô tả/SL"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedDonations().length > 0 ? (
                  paginatedDonations().map((donation, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2 text-gray-500">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="py-2">
                        <div className="truncate max-w-[80px]" title={donation.user?.username || "Ẩn danh"}>
                          {donation.txnRef === "anonymous" ? "Anonymous User" : donation.user?.username || "Ẩn danh"}
                        </div>
                      </td>
                      <td className="py-2 text-right font-medium">
                        {activeTab === "Money"
                          ? donation.amount?.toLocaleString() || "0"
                          : donation.goodDescription || donation.amount || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-500">
                      Chưa có ủng hộ nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Section - Fixed */}
          <div className="border-t bg-white p-4 space-y-3">
            {/* Total Money - Only show for Money tab */}
            {activeTab === "Money" && (
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Tổng ủng hộ:</span>
                  <span className="text-sm font-bold text-red-500">
                    {totalMoney.toLocaleString()} VND
                  </span>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Trước
                </button>
                <span className="text-xs text-gray-500">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}

            {/* Add Button */}
            <button
              className="w-full py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
              onClick={() => setShowForm(true)}
            >
              + 
            </button>
          </div>
        </>
      )}

      {/* Add Donation Modal */}
      {showForm && (
        <AddDonation
          isOpen={showForm}
          onRequestClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload();
          }}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Donation;