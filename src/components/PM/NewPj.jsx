import React, { useState, useContext } from 'react';
import { apiConfig } from '../../config/apiConfig';
import { AuthContext } from "../../util/AuthContext"; 
import { uploadFileToAzure } from "../../util/azureBlobService";

const NewPj = ({ onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(10);
  const [bank, setBank] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Lấy ngày hiện tại (định dạng YYYY-MM-DD)
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Xử lý thay đổi ngày bắt đầu
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    const currentDate = getCurrentDate();
    
    // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
    if (newStartDate < currentDate) {
      setError('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
      return; // Không cập nhật state nếu ngày không hợp lệ
    }
    
    setStartDate(newStartDate);
    
    // Nếu ngày kết thúc đã được chọn và nhỏ hơn ngày bắt đầu mới
    if (endDate && newStartDate > endDate) {
      setEndDate(''); // Reset ngày kết thúc
      setError('Ngày kết thúc đã được reset vì nhỏ hơn ngày bắt đầu mới.');
    } else {
      setError(''); // Xóa lỗi nếu có
    }
  };

  // Xử lý thay đổi ngày kết thúc
  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    
    // Kiểm tra ngày kết thúc không được nhỏ hơn ngày bắt đầu
    if (startDate && newEndDate < startDate) {
      setError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu.');
      return; // Không cập nhật state nếu ngày không hợp lệ
    }
    
    setEndDate(newEndDate);
    setError(''); // Xóa lỗi nếu ngày hợp lệ
  };
  
  const handleSubmit = async (status) => {
    if (!title || !description || !location || !startDate || !endDate) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    const currentDate = getCurrentDate();
    
    // Kiểm tra ngày bắt đầu không được nhỏ hơn ngày hiện tại
    if (startDate < currentDate) {
      setError('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
      return;
    }

    // Kiểm tra lại ngày một lần nữa khi submit
    if (startDate > endDate) {
      setError('Ngày kết thúc không được nhỏ hơn ngày bắt đầu.');
      return;
    }

  

    if (!currentUser || !currentUser.userId) {
      setError('Bạn cần đăng nhập để tạo dự án.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const currentTime = new Date().toISOString();
      const token = localStorage.getItem('token');

      const response = await apiConfig.post(
        'http://localhost:8080/api/projects',
        {
          name: title,
          description,
          location,
          startTime: startDate,
          endTime: endDate,
          avatarFilepath: avatar, // Sử dụng URL ảnh đã upload
          maxParticipants: maxParticipants,
          bank,
          pmId: currentUser.userId,
          status,
          createdAt: currentTime,
          updatedAt: currentTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Dự án đã được lưu:', response.data);
      onClose();
    } catch (error) {
      if (error.response) {
        setError(`Lỗi: ${error.response.data.message || 'Không thể lưu dự án'}`);
      } else {
        setError('Lỗi: Không nhận được phản hồi từ server.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Vui lòng chọn một file ảnh.');
      return;
    }

    try {
      setAvatarUploading(true);
      const uniqueFileName = `${currentUser.userId}-${Date.now()}-${file.name}`;
      const url = await uploadFileToAzure("project", uniqueFileName, file); // Tải ảnh lên Azure
      setAvatar(url); // Lưu URL ảnh vào trạng thái avatar
    } catch (error) {
      setError('Không thể tải ảnh lên Azure.');
      console.error('Lỗi khi tải ảnh:', error);
    } finally {
      setAvatarUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-start pt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-4">Tạo dự án mới</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <label className="block font-semibold">Tên dự án</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block font-semibold">Mô tả</label>
        <textarea
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="block font-semibold">Địa điểm</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label className="block font-semibold">Ngày bắt đầu</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={startDate}
          onChange={handleStartDateChange}
          min={getCurrentDate()} // Thiết lập ngày tối thiểu là ngày hiện tại
        />

        <label className="block font-semibold">Ngày kết thúc</label>
        <input
          type="date"
          className="w-full p-2 border rounded mb-3"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate} // Thiết lập ngày tối thiểu là ngày bắt đầu
        />
        
        <label className="block font-semibold">Ngân hàng</label>
        <span className="block text-gray-400 text-sm mb-1">
          Nhập đúng định dạng sau: &lt;Số Tài Khoản&gt; - &lt;Tên thụ hưởng&gt; - &lt;Tên ngân hàng&gt;
        </span>
        <input
          type="text"
          className="w-full p-2 border rounded mb-3"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
        />

        <label className="block font-semibold">Số người tham gia tối đa</label>
        <input
          type="number"
          className="w-full p-2 border rounded mb-3"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
        />

        <label className="block font-semibold">Hình ảnh dự án</label>
        {avatar && (
          <img
            src={avatar}
            alt="Project Avatar"
            className="w-40 h-24 rounded-lg object-cover mb-3"
          />
        )}
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          className="hidden"
          disabled={avatarUploading}
        />
        <button
          type="button"
          className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${avatarUploading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => document.getElementById('avatar-upload').click()}
          disabled={avatarUploading}
        >
          {avatarUploading ? 'Đang tải...' : 'Tải lên ảnh'}
        </button>

        {avatarUploading && <p className="text-blue-500">Đang tải ảnh lên...</p>}

        <div className="flex justify-between mt-4">
          <div>
            <button
              className="bg-gray-300 px-4 py-2 rounded mr-2"
              onClick={() => handleSubmit('draft')}
              disabled={loading || avatarUploading}
            >
              {loading ? 'Đang lưu...' : 'Lưu nháp'}
            </button>
            <button
              className={`px-4 py-2 rounded ${
                loading || avatarUploading ? 'bg-gray-400' : 'bg-orange-400 text-white'
              }`}
              onClick={() => handleSubmit('pending')}
              disabled={loading || avatarUploading}
            >
              {loading ? 'Đang gửi...' : 'Gửi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPj;