import React, { useState } from "react";
import { useContext } from "react";
import Modal from "react-modal";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";

Modal.setAppElement("#root");

const AddDonation = ({ isOpen, onRequestClose, projectId, onSuccess }) => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userId: "",
    amount: "",
    type: "money",
    goodDescription: "",
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
      projectId: parseInt(projectId, 10),
      txnRef: formData.anonymous ? "anonymous" : "",
      type: formData.type,
      status: "success",
      goodDescription: formData.goodDescription || "",
      user: formData.anonymous
        ? { userId: currentUser.userId }
        : { userId: parseInt(formData.userId, 10) },
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
      overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Add Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Donation Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="money">Money</option>
            <option value="goods">Goods</option>
          </select>
        </div>
        {formData.type ==="money" && (
          <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={formData.amount}
          onChange={handleChange}
          required
          />
        )}
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
          type="text"
          name="goodDescription"
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={formData.goodDescription}
          onChange={handleChange}
        />
        
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