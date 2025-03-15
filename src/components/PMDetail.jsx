import { useParams } from "react-router-dom";
import { useState } from "react";
import p1 from "../assets/p1_img.jpg";
import p2 from "../assets/p2_img.png";

const projects = [
  {
    id: 1,
    name: "Trung thu cho em",
    description:
      "Dự án hỗ trợ trẻ em vùng cao luôn mang lại những xúc cảm hạnh phúc và bình an của gia đình cho những đứa trẻ.\n" +
      "Tuy nhiên, không phải bạn nhỏ nào cũng được may mắn khi có gia đình bao bọc và che chở.\n" +
      "Có những em bé không có gia đình hoặc gia đình cũng không có điều kiện để lo cho các em một trung thu ấm áp.\n\n" +
      "Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên.\n\n" +
      "📅 **Thời gian dự kiến:** 18h30 ngày 13/09/2024 (Thứ 6)\n" +
      "📞 **Mọi thông tin chi tiết xin vui lòng liên hệ:**\n" +
      "**Trưởng Ban Đối ngoại:** Vũ Thị Thu Trang\n" +
      "📱 **Số điện thoại:** 0393 211 004",
    image: p1,
  },
  { id: 2, name: "Chung tay mùa đông", description: "Hỗ trợ trẻ em nghèo có áo ấm", image: p2 },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) return <h1 className="text-left">Project không tồn tại</h1>;

  return (
    <div className="max-w-5xl mx-auto p-2 flex flex-col gap-8 text-left" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
      <div className="flex gap-8">
        {/* Cột bên trái: Nội dung dự án */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <img src={project.image} alt={project.name} className="w-full h-120 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>

          {/* Nút Join our wishlist */}
          <div className="flex justify-start w-full mt-8">
            <button className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-full flex items-center gap-2 shadow-md hover:bg-blue-600">
              Go to forum
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>

        {/* Cột bên phải: Bảng donations */}
        <div className="w-5 bg-white p-5 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-red-500">DONATIONS</h2> {/* Thêm màu đỏ cho chữ DONATIONS */}
          <table className="w-sm">
            <thead>
              <tr>
                <th className="text-left">NAME</th>
                <th className="text-right">VND</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-red-500 py-3">______</td>
                <td className="border-b border-red-500 py-3">______</td>
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td>
                <td className="border-b border-red-500 py-3">______</td>
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td>
                <td className="border-b border-red-500 py-3">______</td>
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td>
                <td className="border-b border-red-500 py-3">______</td>
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td>
                <td className="border-b border-red-500 py-3">______</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-lg font-semibold">Total:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;