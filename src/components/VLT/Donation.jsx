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

        
        // Fix: Ensure donations is always an array
        const donationsData = response.data;
        if (Array.isArray(donationsData)) {
          setDonations(donationsData);
        } else if (donationsData && Array.isArray(donationsData.donations)) {
          // If the response is wrapped in an object with a donations property
          setDonations(donationsData.donations);
        } else if (donationsData && Array.isArray(donationsData.data)) {
          // If the response is wrapped in an object with a data property
          setDonations(donationsData.data);
        } else {
          // If response is not an array, set empty array
          console.warn("API response is not an array:", donationsData);
          setDonations([]);
        }
        

        setError(null);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Không thể tải danh sách ủng hộ.");

        setDonations([]);

      } finally {
        setLoading(false);
      }
    };
    
    if (projectId) {
      fetchDonations();
    }
  }, [projectId]);


  // Safe filtering with fallback to empty array
  const moneyDonations = Array.isArray(donations) 
    ? donations.filter((d) => d.type === "money") 
    : [];
  const goodsDonations = Array.isArray(donations) 
    ? donations.filter((d) => d.type === "goods") 
    : [];

  const totalMoney = moneyDonations.reduce((sum, d) => sum + (d.amount || 0), 0);

  const paginatedDonations = (list) => {
    if (!Array.isArray(list)) return [];
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
    <div className="w-full">
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
        <div className="text-center py-4">
          Đang tải danh sách ủng hộ...
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">
          {error}
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">STT</th>
                  <th className="border border-gray-300 px-4 py-2">Username</th>
                  <th className="border border-gray-300 px-4 py-2">
                    {activeTab === "Money" ? "VND" : "Quantity"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentDonations.length > 0 ? (
                  currentDonations.map((donation, index) => (
                    <tr key={donation.id || index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {donation.userName || "Unknown"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {activeTab === "Money"
                          ? (donation.amount || 0).toLocaleString()
                          : donation.amount || 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-300 px-4 py-8 text-center text-gray-500">
                      No donations yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Total Money */}
      {activeTab === "Money" && !loading && !error && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold">
              <span className="text-gray-700">
                Total:{" "}
                <span className="text-blue-600">
                  {totalMoney.toLocaleString()} VND
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4">
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
