import { useEffect, useState } from "react";
import axios from "axios";

const Loop = ({ projectId, onClose, onCopied }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCopy = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`http://localhost:8080/api/projects/${projectId}/copy`);
      onCopied?.(response.data); // Nếu có callback để cập nhật lại giao diện
      onClose(); 
    } catch (err) {
      setError("Có lỗi xảy ra khi nhân bản dự án.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Nhân bản dự án</h2>
        <p>Bạn có chắc chắn muốn nhân bản dự án này không?</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleCopy}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Nhân bản"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loop;
