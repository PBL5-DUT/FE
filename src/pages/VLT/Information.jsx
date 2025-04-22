import React from "react";
import Header from "../../components/VLT/Header" // Adjust the path as necessary
import logoBackground from "../../assets/logo_mo.png"; // Adjust the path as necessary

const Information = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: `url(${logoBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >
      <div className="bg-white bg-opacity-90 min-h-screen px-4 md:px-16 py-0">

        <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">
          Kết nối Tình Nguyện Viên với Cộng Đồng
        </h1>

        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          Chào mừng bạn đến với nền tảng tình nguyện trực tuyến – nơi kết nối những tấm lòng nhân ái với các tổ chức và dự án xã hội trên khắp cả nước. Chúng tôi tin rằng mỗi hành động nhỏ đều có thể tạo nên sự thay đổi lớn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-400">
            <h2 className="text-2xl font-semibold text-teal-600 mb-2">🌱 Mục tiêu của chúng tôi</h2>
            <p className="text-gray-700">
              Xây dựng một cộng đồng tình nguyện mạnh mẽ, nơi mọi người đều có thể dễ dàng tìm thấy cơ hội đóng góp cho xã hội – từ các hoạt động môi trường, giáo dục, y tế đến hỗ trợ người khó khăn.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-400">
            <h2 className="text-2xl font-semibold text-orange-600 mb-2">👥 Ai có thể tham gia?</h2>
            <p className="text-gray-700">
              Bất kỳ ai có tấm lòng thiện nguyện – học sinh, sinh viên, người đi làm hay các tổ chức xã hội. Chúng tôi hỗ trợ bạn kết nối với những dự án phù hợp nhất với thời gian, sở thích và năng lực của bạn.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-400">
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">📌 Điều khoản và pháp lý</h2>
            <p className="text-gray-700">
              Mọi hoạt động tình nguyện trên nền tảng đều tuân thủ pháp luật Việt Nam. Người tham gia cam kết chịu trách nhiệm về hành vi của mình, và các tổ chức phải minh bạch thông tin, mục tiêu và báo cáo kết quả hoạt động.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-400">
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">🧭 Hướng dẫn tham gia</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Tạo tài khoản và đăng nhập</li>
              <li>Tìm kiếm và chọn dự án phù hợp</li>
              <li>Đăng ký tham gia và chờ phê duyệt</li>
              <li>Hoàn thành nhiệm vụ và nhận giấy chứng nhận</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          © 2025 Volunteer Connect. Được vận hành bởi nhóm sinh viên vì cộng đồng. Mọi thông tin được kiểm duyệt và đảm bảo minh bạch.
        </div>
      </div>
    </div>
  );
};

export default Information;
