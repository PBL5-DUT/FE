import { useParams } from "react-router-dom";
import React, { useState } from "react";
import AddDonation from "./AddDonation";

const Donation = ({ donations }) => {
  const [activeTab, setActiveTab] = useState("Money");
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();

  const moneyDonations = (donations || []).filter(d => d.type === "money");
  const goodsDonations = (donations || []).filter(d => d.type === "goods");

  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="w-full table-auto">
      <h2 className="text-2xl font-bold mb-4 text-red-500">DONATIONS</h2>

      {/* Dropdown Tab */}
      <div className="mb-4">
        <label htmlFor="tab-select" className="mr-2 font-semibold">Select Type:</label>
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

      {/* Content */}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">Username</th>
            <th className="text-center">{activeTab === "Money" ? "" : "Description"}</th>
            <th className="text-right">{activeTab === "Money" ? "VND" : "Amount"}</th>
            
          </tr>
        </thead>
        <tbody>
          {(activeTab === "Money" ? moneyDonations : goodsDonations).length > 0 ? (
            (activeTab === "Money" ? moneyDonations : goodsDonations).map((donation, index) => (
              <tr key={index}>
                <td className="border-b border-red-500 py-3">{index + 1}</td>
                <td className="border-b border-red-500 py-3">
                  {donation.txnRef === "anonymous" ? "Anonymous User" : donation.user?.username}
                </td>
                <td className="border-b border-red-500 py-3 text-center">  {donation.goodDescription || "No description"}</td>
                <td className="border-b border-red-500 py-3 text-right">
                  {activeTab === "Money"
                    ? `${donation.amount.toLocaleString()} VND`
                    : donation.amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-3">
                Chưa có đóng góp nào
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {activeTab === "Money" && (
        <div className="mt-8">
          <p className="text-lg font-semibold">
            Total: {totalMoney.toLocaleString()} VND
          </p>
        </div>
      )}

      <button
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

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
