import { useEffect, useState, useContext } from "react";
import { apiConfig } from "../../config/apiConfig";
import { AuthContext } from "../../util/AuthContext";

const Loop = ({ project, onClose, onCopied }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State để hiển thị thông báo
  const { currentUser } = useContext(AuthContext);

  const handleCopy = async () => {
    const projectId = project.projectId;
    setLoading(true);
    setError("");
    try {
      const response = await apiConfig.post(`http://localhost:8080/api/projects/${projectId}/copy`, {
        name: project.name,
        description: project.description,
        location: project.location,
        startTime: project.startTime,
        endTime: project.endTime,
        avatarFilepath: project.avatarFilepath,
        maxParticipants: project.maxParticipants,
        parentProjectId: projectId,
        pmId: currentUser.userId,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      onCopied?.(response.data);
      setShowSuccessMessage(true); // Hiển thị thông báo sau khi nhân bản thành công
    } catch (err) {
      setError("Có lỗi xảy ra khi nhân bản dự án.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        {showSuccessMessage ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Thông báo</h2>
            <p className="text-gray-700">
              Dự án mới đã được nhân bản ở mục <strong>Draft</strong>, hãy đến và chỉnh sửa.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={onClose}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Loop;