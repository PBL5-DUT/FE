import React from 'react';
import Search from '../../components/VLT/Find';
import Header from '../../components/VLT/Header';
import ProjectList from '../../components/VLT/ProjectList';
import anh from '../../assets/project.jpg';

const projects = [
  { 
    id: 1,
    name: 'Trung thu cho em',
    description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên.\n Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) \nMọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang \nSố điện thoại: 0393 211 004',
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
    description: 'Ban Tổ chức Ngày hội hiến máu “Trung Thu Cho Em 2024” đã tổ chức chương trình “Đêm hội trăng rằm” nhằm mang đến một mùa Trung thu ý nghĩa, trọn vẹn cho các em. Trò chơi giao lưu, tạo sự kết nối giữa các em và Tình nguyện viên. Ngoài ra còn có các hoạt động khác như: Phá cỗ Trung thu, biểu diễn kỳ lân,... Để hoàn thành sứ mệnh cao cả đó, chúng tôi rất mong nhận được sự quan tâm và hỗ trợ từ phía Quý ông, Quý bà và Quý đơn vị với tư cách là Nhà tài trợ cho chương trình “Đêm hội trăng rằm”, đồng thời hướng đến sự hợp tác lâu dài và tích cực giữa hai bên.\n Thời gian dự kiến: 18h30 ngày 13/09/2024 (Thứ 6) \nMọi thông tin chi tiết xin vui lòng liên hệ: Trưởng Ban Đối ngoại: Vũ Thị Thu Trang Số điện thoại: 0393 211 004',
    location: 'Quảng Ngãi',
    avatar_filepath: anh, // Sử dụng đường dẫn ảnh dưới dạng chuỗi
    start_time: '10/09/2025',
    end_time: '11/09/2025',
    status: 'approved'
  },
];


const Home = () => {
    return (
      <div className=" bg-gray-100 min-h-screen">
         <Header/>
       
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Danh sách dự án</h1>
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
          <Search />
          
        </div>
        <ProjectList projects={projects} />
      </div>
    );
  };
  
  export default Home;