import React from "react";
import Header from "../../components/VLT/Header" // Adjust the path as necessary
import logoBackground from "../../assets/logo_mo.png"; 

const AboutUs = () => {
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
      <div className="bg-white bg-opacity-90 min-h-screen px-4 md:px-20 py-0">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Giới thiệu về chúng tôi
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto text-justify">
          <span className="font-semibold text-teal-600">Volunteer</span> là một nền tảng kết nối
          những người có tấm lòng nhân ái với các tổ chức từ thiện và hoạt động cộng đồng. 
          Chúng tôi mong muốn tạo ra một môi trường thuận lợi giúp tình nguyện viên dễ dàng 
          tìm kiếm, đăng ký và tham gia các chương trình phù hợp với sở thích và kỹ năng của mình.
          Với Volunteer, bạn có thể chung tay đóng góp cho xã hội, lan tỏa yêu thương và tạo ra 
          những giá trị tốt đẹp.
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📌 Những câu hỏi thường gặp</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Tham gia có cần chứng nhận không?</li>
              <li>Bao nhiêu tuổi được tham gia tình nguyện?</li>
              <li>Làm sao để biết dự án còn hạn đăng ký?</li>
              <li>Tôi có thể tham gia cùng nhóm bạn không?</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Liên hệ</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Điện thoại:</span> 0123456789
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Địa chỉ:</span> 54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Email:</span> support@volunteer.vn
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          © 2025 Volunteer Connect. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
