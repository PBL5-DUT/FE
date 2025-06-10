import React, { useState, useContext } from "react";
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

  const [error, setError] = useState("");

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const unformatNumber = (formatted) => {
    return formatted.replace(/,/g, "");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "amount") {
      // Chỉ cho phép nhập số
      const rawValue = unformatNumber(value);
      if (!/^\d*$/.test(rawValue)) return;

      const formattedValue = rawValue ? formatNumber(rawValue) : "";
      setFormData((prev) => ({
        ...prev,
        amount: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const numericAmount = parseInt(unformatNumber(formData.amount), 10);

    if (formData.type === "money" && (isNaN(numericAmount) || numericAmount <= 0)) {
      setError("Vui lòng nhập số tiền hợp lệ (lớn hơn 0)");
      return;
    }

    const payload = {
      amount: numericAmount,
      projectId: parseInt(projectId, 10),
      txnRef: formData.anonymous ? "anonymous" : "",
      type: formData.type,
      status: "success",
      goodDescription: formData.goodDescription || "",
      userId: formData.anonymous
        ? currentUser.userId
        : parseInt(formData.userId, 10),
    };

    try {
      await apiConfig.post("http://localhost:8080/api/donations", payload);
      onSuccess();
      onRequestClose();
    } catch (err) {
      console.error("Lỗi khi gửi donation:", err);
      setError("Đã xảy ra lỗi khi gửi donate.");
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
      <h2 className="text-xl font-bold mb-4">Thêm donate mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-2">Phân loại</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="money">Tiền</option>
            <option value="goods">Vật tư</option>
          </select>
        </div>

        {formData.type === "money" && (
          <div>
            <input
              type="text"
              name="amount"
              placeholder="Số tiền"
              className="w-full p-2 border rounded"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="anonymous"
            checked={formData.anonymous}
            onChange={handleChange}
          />
          <label>Ẩn danh</label>
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
          placeholder="Mô tả"
          className="w-full p-2 border rounded"
          value={formData.goodDescription}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

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
