// AddDonation.jsx
import React, { useState } from "react";
import Modal from "react-modal";
import { apiConfig } from "../../config/apiConfig";

Modal.setAppElement("#root");

const AddDonation = ({ isOpen, onRequestClose, projectId, onSuccess }) => {
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "money",
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      amount: parseInt(formData.amount, 10),
      projectId: parseInt(projectId),
      txnRef: formData.anonymous ? "anonymous" : "",
      type: formData.type,
      status: "success",
      user: formData.anonymous ? null : { userId: parseInt(formData.userId, 10) },
    };

    try {
      await apiConfig.post("http://localhost:8080/api/donations", payload);
      onSuccess();
      onRequestClose();
    } catch (error) {
      console.error("Lỗi khi gửi donation:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Donation"
      className="bg-white p-6 rounded-lg w-[32rem] mx-auto mt-24 shadow-lg relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Add Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          <label>Anonymous</label>
        </div>
        {!formData.anonymous && (
          <input
            type="number"
            name="userId"
            placeholder="User ID"
            className="w-full p-2 border rounded"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="number"
          name="amount"
          placeholder="Amount (VND)"
          className="w-full p-2 border rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <div>
          <label className="mr-4">
            <input
              type="radio"
              name="type"
              value="money"
              checked={formData.type === "money"}
              onChange={handleChange}
            />
            Money
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="goods"
              checked={formData.type === "goods"}
              onChange={handleChange}
            />
            Goods
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Gửi
          </button>
          <button onClick={onRequestClose} className="bg-gray-300 px-4 py-2 rounded">
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDonation;
