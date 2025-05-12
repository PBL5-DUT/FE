import { useState } from "react";
import { apiConfig } from "../../config/apiConfig";

const Lock = ({ projectId, onClose, onLocked }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLock = async () => {
    setLoading(true);
    setError("");
    try {
      await apiConfig.post(`http://localhost:8080/api/projects/${projectId}/lock`);
      onLocked?.(); 
      onClose(); 
    } catch (err) {
      setError("Có lỗi khi khoá dự án.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Khoá dự án</h2>
        <p>Bạn có muốn khoá dự án này không? Sau khi khoá, không thể chỉnh sửa nữa.</p>
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
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleLock}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Khoá"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lock;
