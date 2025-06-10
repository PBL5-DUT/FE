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

  const itemsPerPage = 10; // Giảm số item để phù hợp với layout

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/donations/project/${projectId}`);
        
        // Debug log to see the actual response structure
        console.log("API Response:", response.data);
        console.log("Response type:", typeof response.data);
        console.log("Is array:", Array.isArray(response.data));
        
        // Safe handling of different response structures
        let donationsData = [];
        
        if (Array.isArray(response.data)) {
          donationsData = response.data;
        } else if (response.data && Array.isArray(response.data.donations)) {
          donationsData = response.data.donations;
        } else if (response.data && Array.isArray(response.data.data)) {
          donationsData = response.data.data;
        } else if (response.data && Array.isArray(response.data.results)) {
          donationsData = response.data.results;
        } else {
          console.warn("Unexpected API response structure:", response.data);
          donationsData = [];
        }
        
        setDonations(donationsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Không thể tải danh sách ủng hộ.");
        setDonations([]); // Ensure donations is always an array
      } finally {
        setLoading(false);
      }
    };
    
    if (projectId) {
      fetchDonations();
    }
  }, [projectId]);


  const moneyDonations = Array.isArray(donations) 
    ? donations.filter((donation) => donation.type === "money") 
    : [];
    
  const goodsDonations = Array.isArray(donations) 
    ? donations.filter((donation) => donation.type === "goods") 
    : [];
    

  const totalMoney = moneyDonations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const paginatedDonations = () => {
    const currentData = activeTab === "Money" ? moneyDonations : goodsDonations;
    if (!Array.isArray(currentData)) return [];
    
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
                  <th className="text-left py-2 w-10">STT</th>
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
                      key={donation.id || index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2 text-gray-500">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="py-2">
                        <div className="truncate max-w-[80px]" title={donation.userName || "Ẩn danh"}>
                          {donation.txnRef === "anonymous" ? "Ẩn danh" : donation.userName || "Ẩn danh"}
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
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="text-xs text-gray-500">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}

            {/* Add Button */}
            <button
              className="w-full py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition disabled:opacity-50"
              onClick={() => setShowForm(true)}
              disabled={loading}
            >
              + Thêm ủng hộ
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
            // Instead of window.location.reload(), refetch the data
            const refetchData = async () => {
              try {
                const response = await apiConfig.get(`/donations/project/${projectId}`);
                let donationsData = [];
                
                if (Array.isArray(response.data)) {
                  donationsData = response.data;
                } else if (response.data && Array.isArray(response.data.donations)) {
                  donationsData = response.data.donations;
                } else if (response.data && Array.isArray(response.data.data)) {
                  donationsData = response.data.data;
                } else if (response.data && Array.isArray(response.data.results)) {
                  donationsData = response.data.results;
                } else {
                  donationsData = [];
                }
                
                setDonations(donationsData);
              } catch (err) {
                console.error("Error refetching donations:", err);
              }
            };
            refetchData();
          }}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Donation;