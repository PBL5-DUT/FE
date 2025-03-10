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
  const [showMessage, setShowMessage] = useState(false);

  if (!project) return <h1 className="text-left">Project không tồn tại</h1>;

  return (
    <div className="max-w-5xl mx-auto p-2 flex flex-col gap-8 text-left" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
      <div className="flex gap-8">
        {/* Cột bên trái: Nội dung dự án */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <img src={project.image} alt={project.name} className="w-full h-120 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>

          {/* Hàng chứa nút Register và Donate */}
          <div className="flex justify-start w-full gap-4 mt-8">
            <button className="py-3 px-6 text-lg font-semibold bg-purple-200 text-purple-700 rounded-lg shadow-md hover:bg-purple-300">
              ❤️ Register
            </button>
            <button
              className="py-3 px-6 text-lg font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-900"
              onClick={() => setShowMessage(!showMessage)}
            >
              » Donate
            </button>
          </div>

          {/* Hộp thư xuất hiện khi nhấn Donate */}
          {showMessage && (
            <div className="mt-4 p-4 border border-purple-300 rounded-lg bg-purple-100 text-purple-900">
              <p>
                Ủng hộ hiện kim <br />
                903294029930 - BIDV - VU THI THU TRANG <br />
                Nội dung: "Ten nguoi gui - SDT - IDTaiKhoan"
                <br />
                <br />
                Ủng hộ hiện vật <br />
                Gửi về địa chỉ sau: <br />
                54 Nguyễn Lương Bằng - Hoà Khánh Bắc - ĐN <br />
                Hãy ghi rõ các món đồ bạn gửi để chúng mình tiện kiểm tra nhé!
              </p>
            </div>
          )}
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
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
              </tr>
              <tr>
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
                <td className="border-b border-red-500 py-3">______</td> {/* Thêm màu đỏ cho dấu gạch ngang */}
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