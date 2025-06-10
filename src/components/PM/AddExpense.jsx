import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";

Modal.setAppElement("#root");

const AddExpense = ({ isOpen, onRequestClose, projectId, onSuccess }) => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    receiverId: "",
    amount: "",
    purpose: "",
  });

  const [error, setError] = useState("");

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (formatted) => {
    return formatted.replace(/,/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const rawValue = unformatNumber(value);
      if (!/^\d*$/.test(rawValue)) return; // Chỉ số nguyên không âm
      const formattedValue = rawValue ? formatNumber(rawValue) : "";
      setFormData((prev) => ({
        ...prev,
        amount: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numericAmount = parseInt(unformatNumber(formData.amount), 10);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError("Vui lòng nhập số tiền hợp lệ (lớn hơn 0)");
      return;
    }

    const payload = {
      amount: numericAmount,
      purpose: formData.purpose || "",
      projectId: parseInt(projectId, 10),
      receiverId: parseInt(formData.receiverId, 10),
      senderId: currentUser.userId,
    };

    try {
      await apiConfig.post("http://localhost:8080/api/expenses", payload);
      onSuccess();
      onRequestClose();
    } catch (error) {
      console.log("data", payload);
      console.error("Lỗi khi gửi expense:", error);
      setError("Đã xảy ra lỗi khi gửi khoản chi.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Expense"
      className="bg-white p-6 rounded-lg w-[32rem] mx-auto mt-24 shadow-lg relative"
      overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-xl font-bold mb-4">Thêm khoản chi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="receiverId"
            placeholder="Receiver ID"
            className="w-full p-2 border rounded"
            value={formData.receiverId}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="purpose"
          placeholder="Mục đích"
          className="w-full p-2 border rounded"
          value={formData.purpose}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Số tiền"
          className="w-full p-2 border rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Gửi
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExpense;
