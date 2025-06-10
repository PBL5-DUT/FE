import { useState } from "react";
import { apiConfig } from "../../config/apiConfig";

const Lock = ({ project, onClose, onLocked }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reason, setReason] = useState(""); 
  const [customReason, setCustomReason] = useState(""); 
  const [lockedSuccess, setLockedSuccess] = useState(false); // ✅ New state

  const handleLock = async () => {
    const projectId = project.projectId; 
    setError("");
    setLoading(true);
    try {
      const currentTime = new Date().toISOString();
      await apiConfig.put(`http://localhost:8080/api/projects/${projectId}/lock`, {
        status: "lockedpending",
        updatedAt: currentTime,
      });
      setLockedSuccess(true); // ✅ Show success message
      onLocked?.();
    } catch (err) {
      setError("Có lỗi khi khoá dự án.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-160 shadow-lg">
        {!lockedSuccess ? (
          <>
            <h1 className="text-xl font-bold mb-4">Khoá dự án</h1>
            <label className="block font-semibold mb-2">Lý do khoá dự án:</label>
            <select
              name="type"
              className="w-full p-2 border rounded"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option value="1">Không đủ kinh phí</option>
              <option value="2">Không đủ thành viên</option>
              <option value="3">Không được chấp thuận địa điểm</option>
              <option value="4">Cần thảo luận lại kế hoạch</option>
              <option value="5">Lý do khác</option>
            </select>
            {reason === "5" && (
              <div className="mt-4">
                <label className="block font-semibold mb-2">Nhập lý do khác:</label>
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Nhập lý do của bạn..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
            )}
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
          </>
        ) : (
          // ✅ Success confirmation message
          <div className="text-center">
            <h1 className="text-xl font-bold mb-4 text-green-600">Yêu cầu đã được gửi!</h1>
            <p className="mb-6 text-gray-700">
              Yêu cầu khoá dự án đã được gửi đến quản trị viên. Vui lòng chờ xét duyệt.
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lock;
