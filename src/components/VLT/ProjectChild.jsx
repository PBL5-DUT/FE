import React from 'react';
import LeftBar from './components/LeftBar'; // Đường dẫn tới LeftBar
import ProjectList from './components/ProjectList'; // Đường dẫn tới PostList
import Donation from './components/Donation'; // Đường dẫn tới Donation
import anh from './assets/p1_img.jpg';
const projects = [
    { 
      id: 1,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },
    {
      id: 2,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },  {
      id: 3,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },  {
      id: 4,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },  {
      id: 5,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },
    {
      id: 6,
      name: 'Trung thu cho em',
      description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên. Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) Mọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
      location: 'Quảng Ngãi',
      avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
      start_time: '10/09/2025',
      end_time: '11/09/2025',
      status: 'approved'
    },
  ];
  
const Forum = () => {
  return (
    <div>
      <div className="forum-container">
        <LeftBar />
        <div className="forum-content">
        <ProjectList projects={projects} />
        </div>
        <Donation />
      </div>
    
    </div>
  );
};

export default Forum;