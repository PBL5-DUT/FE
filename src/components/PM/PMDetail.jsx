import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PMDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dự án:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <h1 className="text-left">Đang tải dữ liệu...</h1>;
  if (!project) return <h1 className="text-left">Project không tồn tại</h1>;

  return (
    <div className="max-w-5xl mx-auto p-2 flex flex-col gap-8 text-left" style={{ marginLeft: "2rem", marginRight: "2rem" }}>
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <img src={project.image} alt={project.name} className="w-full h-120 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>

          <div className="flex justify-start w-full mt-8">
            <button className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-full flex items-center gap-2 shadow-md hover:bg-blue-600"
              onClick={() => navigate(`/forum/${project.id}`)}
            >
              Go to forum
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Cột bên phải: Bảng donations */}
        <div className="w-5 bg-white p-5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-500">DONATIONS</h2>
          <table className="w-sm">
            <thead>
              <tr>
                <th className="text-left">NAME</th>
                <th className="text-right">VND</th>
              </tr>
            </thead>
            <tbody>
              {project.donations?.length > 0 ? (
                project.donations.map((donation, index) => (
                  <tr key={index}>
                    <td className="border-b border-red-500 py-3">{donation.name}</td>
                    <td className="border-b border-red-500 py-3">{donation.amount.toLocaleString()} VND</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-3">Chưa có đóng góp nào</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-8">
            <p className="text-lg font-semibold">Total: {project.donations?.reduce((sum, d) => sum + d.amount, 0).toLocaleString()} VND</p>
            <button className="mt-4 py-2 px-3 text-lg font-semibold bg-red-500 text-black rounded-full flex items-center gap-8 shadow-md">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PMDetail;
