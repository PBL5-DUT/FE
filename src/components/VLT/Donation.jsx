import React, { useEffect, useState } from "react";
import { apiConfig } from "../../config/apiConfig";

const Donation = ({ projectId, isFixed = true }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Money");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/donations/project/${projectId}`);
        console.log("Fetched donations:", response.data);
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

  const moneyDonations = donations.filter((d) => d.type === "money");
  const goodsDonations = donations.filter((d) => d.type === "goods");
  const totalMoney = moneyDonations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const paginatedDonations = (list) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return list.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(
    (activeTab === "Money" ? moneyDonations : goodsDonations).length / itemsPerPage
  );

  const currentDonations =
    activeTab === "Money"
      ? paginatedDonations(moneyDonations)
      : paginatedDonations(goodsDonations);

  return (
    <div
      className={`bg-white p-4 ${
        isFixed ? "fixed right-0 top-[64px] w-[300px] h-[calc(100vh-64px)]" : "h-full"
      } overflow-hidden`}
    >
      {/* Dropdown Tab */}
      <div className="mb-4">
        <select
          value={activeTab}
          onChange={(e) => {
            setActiveTab(e.target.value);
            setCurrentPage(1);
          }}
          className="w-100px px-2 py-1 rounded-lg border border-gray-300 text-xs"
        >
          <option value="Money">Money</option>
          <option value="Goods">Goods</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-xs text-gray-500">Đang tải danh sách ủng hộ...</div>
      ) : error ? (
        <div className="text-xs text-red-500">{error}</div>
      ) : (
        <div className="h-[calc(100%-160px)] overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-1 py-1 text-left">STT</th>
                <th className="border border-gray-300 px-1 py-1 text-left">Username</th>
                <th className="border border-gray-300 px-1 py-1 text-right">
                  {activeTab === "Money" ? "VND" : "Quantity"}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.length > 0 ? (
                currentDonations.map((donation, index) => (
                  <tr
                    key={donation.id || `${donation.userName}-${index}`}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="border border-gray-300 px-1 py-1">
                      {index + 1 + (currentPage - 1) * itemsPerPage}
                    </td>
                    <td className="border border-gray-300 px-1 py-1">
                      {donation.userName || "Unknown"}
                    </td>
                    <td className="border border-gray-300 px-1 py-1 text-right">
                      {activeTab === "Money"
                        ? (donation.amount || 0).toLocaleString()
                        : donation.amount || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-2 text-gray-500">
                    No donations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Total Money */}
      {activeTab === "Money" && !loading && !error && (
        <div className="absolute bottom-16 right-4 left-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs font-medium text-gray-700 text-right">
              Total:{" "}
              <span className="font-bold text-red-500">
                {totalMoney.toLocaleString()} VND
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="absolute bottom-4 right-4 left-4">
          <div className="flex justify-between items-center text-xs">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;