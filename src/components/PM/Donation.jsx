import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddDonation from "./AddDonation";

const Donation = ({ donations }) => {
  const [activeTab, setActiveTab] = useState("Money");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { id } = useParams();

  const moneyDonations = (donations || []).filter(d => d.type === "money");
  const goodsDonations = (donations || []).filter(d => d.type === "goods");

  const totalMoney = moneyDonations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);

  const getCurrentDonations = () => {
    const currentData = activeTab === "Money" ? moneyDonations : goodsDonations;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return currentData.slice(startIndex, endIndex);
  };

  const totalPages =
    activeTab === "Money"
      ? Math.ceil(moneyDonations.length / itemsPerPage)
      : Math.ceil(goodsDonations.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page when switching tabs
  }, [activeTab]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-500">DONATIONS</h2>

      {/* Dropdown Tab */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="tab-select" className="font-semibold">Chọn loại:</label>
        <select
          id="tab-select"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="Money">Money</option>
          <option value="Goods">Goods</option>
        </select>
      </div>

      {/* Content Table */}
      <table className="w-full table-auto mb-4">
  <thead>
    <tr className="text-left border-b border-gray-300">
      <th>STT</th>
      <th>Username</th>
      <th className="text-right">{activeTab === "Money" ? "VND" : "Description"}</th>
    </tr>
  </thead>
  <tbody>
    {getCurrentDonations().length > 0 ? (
      getCurrentDonations().map((donation, index) => (
        <tr key={index} className="border-b border-red-500">
          <td className="py-3">
            {index + 1 + (currentPage - 1) * itemsPerPage}
          </td>
          <td className="py-3">
            {donation.txnRef === "anonymous" ? "Anonymous User" : donation.user?.username || "Ẩn danh"}
          </td>
          <td className="py-3 text-right">
            {activeTab === "Money"
              ? `${Number(donation.amount).toLocaleString()} VND`
              : donation.goodDescription || "N/A"}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="text-center py-4 text-gray-500">Chưa có đóng góp nào</td>
      </tr>
    )}
  </tbody>
  {activeTab === "Money" && (
    <tfoot>
      <tr>
        <td colSpan={2} className="text-left font-semibold py-3">Total:</td>
        <td className="text-right font-semibold py-3">
          {totalMoney.toLocaleString()} VND
        </td>
      </tr>
    </tfoot>
  )}
</table>
      

      {/* Pagination */}
      {(activeTab === "Money"
        ? moneyDonations.length > itemsPerPage
        : goodsDonations.length > itemsPerPage) && (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Nút mở form */}
      <button
        className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {/* Modal AddDonation */}
      {showForm && (
        <AddDonation
          isOpen={showForm}
          onRequestClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload(); 
          }}
          projectId={id}
        />
      )}
    </div>
  );
};

export default Donation;
