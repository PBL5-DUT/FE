import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/apiConfig';
import { FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

const UserRequest = ({ projectId }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/requests/${projectId}/pending`);
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setError('Không thể tải danh sách yêu cầu');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [projectId]);

  const handleAccept = async (userId) => {
  try {
    setProcessingIds(prev => new Set(prev).add(userId));
    
    // Debug logs để kiểm tra dữ liệu
    console.log('Project ID:', projectId);
    console.log('User ID:', userId);
    console.log('API URL:', `/requests/${projectId}/accept/${userId}`);
    
    const response = await apiConfig.put(`/requests/${projectId}/accept/${userId}`);
    
    console.log('Response:', response);
    
    setRequests(prev => prev.filter(request => request.userId !== userId));
    
  } catch (err) {
    console.error('Error accepting request:', err);
    
    // Debug chi tiết lỗi
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', err.response.data);
      console.error('Response headers:', err.response.headers);
    } else if (err.request) {
      console.error('Request was made but no response:', err.request);
    } else {
      console.error('Error message:', err.message);
    }
    
    // Hiển thị lỗi cụ thể cho user
    if (err.response?.status === 404) {
      setError('Yêu cầu không tồn tại hoặc đã được xử lý');
    } else if (err.response?.status === 403) {
      setError('Bạn không có quyền thực hiện hành động này');
    } else if (err.response?.status === 400) {
      setError('Dữ liệu không hợp lệ');
    } else if (err.response?.status === 500) {
      setError('Lỗi server, vui lòng thử lại sau');
    } else {
      setError('Không thể chấp nhận yêu cầu');
    }
  } finally {
    setProcessingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(userId);
      return newSet;
    });
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Yêu cầu tham gia ({requests.length})
      </h2>

      <div className="flex flex-col space-y-4">
        {requests.map((request) => (
          <div
            key={request.userId}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {request.avatarFilepath ? (
                  <img
                    src={request.avatarFilepath}
                    alt={request.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-lg font-bold">
                    {request.fullName?.charAt(0) || request.username?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800">
                  {request.fullName || 'Chưa cập nhật tên'}
                </h3>
                <p className="text-sm text-gray-600">@{request.username}</p>
                {request.requestMessage && (
                  <p className="text-sm text-gray-500 mt-1 italic">
                    "{request.requestMessage}"
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleAccept(request.userId)}
                disabled={processingIds.has(request.userId)}
                className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {processingIds.has(request.userId) ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaCheck />
                )}
                <span>Chấp nhận</span>
              </button>
              
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Không có yêu cầu nào đang chờ duyệt</p>
        </div>
      )}
    </div>
  );
};

export default UserRequest;