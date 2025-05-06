import { useParams } from "react-router-dom";
import React, { useState } from "react";
import AddDonation from "./AddDonation"; 
import axios from "axios";

const Donation = ({ donations }) => {
  const [activeTab, setActiveTab] = useState("Money");
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams();
  const moneyDonations = donations || [];
  const goodsDonations = [];
  const totalMoney = moneyDonations.reduce((sum, d) => sum + d.amount, 0);


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
            <th className="text-left">USERNAME</th>
            <th className="text-right">{activeTab === "Money" ? "VND" : "SỐ LƯỢNG"}</th>
          </tr>
        </thead>
        <tbody>
          {(activeTab === "Money" ? moneyDonations : goodsDonations).length > 0 ? (
            (activeTab === "Money" ? moneyDonations : goodsDonations).map((donation, index) => (
              <tr key={index}>
                <td className="border-b border-red-500 py-3">{index + 1}</td>
                <td className="border-b border-red-500 py-3">{donation.user?.username || "Anonymous"}</td>
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
