import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/apiConfig';
import { FaSpinner, FaCheck, FaTimes, FaEye, FaUser, FaClock, FaImage } from 'react-icons/fa';

const PostRequest = ({ forumId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/posts/${forumId}/pending`);
        setPosts(response.data);
        console.log('Fetched pending posts:', response.data);
      } catch (err) {
        console.error('Error fetching pending posts:', err);
        setError('Không thể tải danh sách bài viết chờ duyệt');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPosts();
  }, [forumId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleApprove = async (postId) => {
    try {
      setProcessingIds(prev => new Set(prev).add(postId));
      
      console.log('forum ID:', forumId);
      console.log('Post ID:', postId);
      console.log('API URL:', `/posts/${forumId}/approve/${postId}`);
      
      const response = await apiConfig.put(`/posts/${forumId}/approve/${postId}`);
      
      console.log('Response:', response);
      
      setPosts(prev => prev.filter(post => post.postId !== postId));
      
    } catch (err) {
      console.error('Error approving post:', err);
      
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      }
      
      if (err.response?.status === 404) {
        setError('Bài viết không tồn tại hoặc đã được xử lý');
      } else if (err.response?.status === 403) {
        setError('Bạn không có quyền thực hiện hành động này');
      } else if (err.response?.status === 400) {
        setError('Dữ liệu không hợp lệ');
      } else if (err.response?.status === 500) {
        setError('Lỗi server, vui lòng thử lại sau');
      } else {
        setError('Không thể duyệt bài viết');
      }
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleReject = async (postId) => {
    try {
      setProcessingIds(prev => new Set(prev).add(postId));
      
      const response = await apiConfig.put(`/posts/${forumId}/reject/${postId}`);
      
      setPosts(prev => prev.filter(post => post.postId !== postId));
      
    } catch (err) {
      console.error('Error rejecting post:', err);
    
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
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
    <>
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Bài viết chờ duyệt ({posts.length})
        </h2>

        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Post Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {post.userAvatar ? (
                        <img
                          src={post.userAvatar}
                          alt={post.userName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-gray-500" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {post.userName || 'Người dùng'}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaClock className="text-xs" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      Chờ duyệt
                    </span>
                  </div>
                </div>
              </div>

              {/* Post Content Preview */}
              <div className="p-4">
                <p className="text-gray-800 mb-3 line-clamp-3">
                  {post.content}
                </p>

                {/* Images Preview */}
                {post.postImages && post.postImages.length > 0 && (
                  <div className="flex items-center space-x-2 mb-3">
                    <FaImage className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {post.postImages.length} hình ảnh
                    </span>
                  </div>
                )}

                {/* Quick Preview Images */}
                {post.postImages && post.postImages.length > 0 && (
                  <div className="flex space-x-2 mb-4 overflow-x-auto">
                    {post.postImages.slice(0, 3).map((image) => (
                      <div key={image.imageId} className="flex-shrink-0">
                        <img
                          src={image.imageFilepath}
                          alt={`Preview ${image.imageId}`}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                    {post.postImages.length > 3 && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg border flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          +{post.postImages.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                <button
                  onClick={() => handleViewPost(post)}
                  className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <FaEye />
                  <span className="text-sm">Xem chi tiết</span>
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReject(post.postId)}
                    disabled={processingIds.has(post.postId)}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {processingIds.has(post.postId) ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaTimes />
                    )}
                    <span className="text-sm">Từ chối</span>
                  </button>

                  <button
                    onClick={() => handleApprove(post.postId)}
                    disabled={processingIds.has(post.postId)}
                    className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {processingIds.has(post.postId) ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaCheck />
                    )}
                    <span className="text-sm">Duyệt bài</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">Không có bài viết nào đang chờ duyệt</p>
          </div>
        )}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Chi tiết bài viết</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Author Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {selectedPost.userAvatar ? (
                    <img
                      src={selectedPost.userAvatar}
                      alt={selectedPost.userName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-gray-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{selectedPost.userName}</h4>
                  <p className="text-sm text-gray-500">{formatDate(selectedPost.createdAt)}</p>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-800 whitespace-pre-wrap">{selectedPost.content}</p>
              </div>

              {/* Images */}
              {selectedPost.postImages && selectedPost.postImages.length > 0 && (
                <div className={`grid gap-3 mb-6 ${
                  selectedPost.postImages.length === 1 ? 'grid-cols-1' : 
                  selectedPost.postImages.length === 2 ? 'grid-cols-2' :
                  'grid-cols-3'
                }`}>
                  {selectedPost.postImages.map((image) => (
                    <div key={image.imageId} className="aspect-w-16 aspect-h-12">
                      <img
                        src={image.imageFilepath}
                        alt={`Post image ${image.imageId}`}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 justify-end pt-4 border-t">
                <button
                  onClick={() => {
                    handleReject(selectedPost.postId);
                    closeModal();
                  }}
                  disabled={processingIds.has(selectedPost.postId)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  <FaTimes />
                  <span>Từ chối</span>
                </button>

                <button
                  onClick={() => {
                    handleApprove(selectedPost.postId);
                    closeModal();
                  }}
                  disabled={processingIds.has(selectedPost.postId)}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  <FaCheck />
                  <span>Duyệt bài</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostRequest;