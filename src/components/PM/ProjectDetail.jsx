import { useState } from "react";
import p1 from "../../assets/p1_img.jpg";
import p2 from "../../assets/p2_img.png";

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
  }
];
const mockToken = 'mockToken12345';
const ProjectDetail = () => {
  const project = projects[0]; // Lấy dự án đầu tiên từ mảng projects
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState('');

  const processDonation = async () => {
    if (!amount || isNaN(amount)) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`, 
        },
        body: JSON.stringify({
          amount: amount,
          userId: 123, 
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi tạo thanh toán");
      }

      const data = await response.json();
      window.location.href = data.paymentUrl; // Chuyển hướng đến VNPay
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      alert("Không thể kết nối đến hệ thống thanh toán.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-2 flex flex-col gap-8 text-left" style={{ marginLeft: '2rem', marginRight: '2rem' }}>
      <div className="flex gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8">{project.name}</h1>
          <img src={project.image} alt={project.name} className="w-full h-120 object-cover rounded-lg mb-4" />
          <p className="text-gray-700 whitespace-pre-line">{project.description}</p>

          <div className="flex justify-start w-full gap-4 mt-8">
            <button className="py-3 px-6 text-lg font-semibold bg-purple-200 text-purple-700 rounded-lg shadow-md hover:bg-purple-300">
              ❤️ Register
            </button>
            <button
              className="py-3 px-6 text-lg font-semibold bg-purple-700 text-white rounded-lg shadow-md hover:bg-purple-900"
              onClick={() => setShowDonate(!showDonate)}
            >
              » Donate
            </button>
          </div>

          {showDonate && (
            <div className="mt-4 p-4 border border-purple-300 rounded-lg bg-purple-100 text-purple-900">
              <p className="mb-2">Nhập số tiền muốn ủng hộ (VND):</p>
              <input
                type="number"
                className="p-2 border rounded w-full mb-3"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="VD: 500000"
              />
              <button
                className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-800"
                onClick={processDonation}
              >
                Xác nhận ủng hộ
              </button>
            </div>
          )}
        </div>

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
              {[...Array(5)].map((_, idx) => (
                <tr key={idx}>
                  <td className="border-b border-red-500 py-3">______</td>
                  <td className="border-b border-red-500 py-3 text-right">______</td>
                </tr>
              ))}
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
