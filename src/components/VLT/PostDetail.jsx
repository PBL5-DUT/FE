import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaHeart, FaRegHeart, FaComment, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { apiConfig } from '../../config/apiConfig';

const PostDetail = ({ post: initialPost, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [post, setPost] = useState(initialPost);
  const [liked, setLiked] = useState(initialPost.isLiked);
  const [likeCount, setLikeCount] = useState(initialPost.likeCount);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const hasMultipleImages = post.postImages && post.postImages.length > 1;
  const debounceRef = useRef(null);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    if (isLikeLoading) return;

    setIsLikeLoading(true);
    const willLike = !liked;

    try {
      // Update UI immediately
      setLiked(willLike);
      setLikeCount(prev => willLike ? prev + 1 : prev - 1);

      // Clear previous debounce
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        try {
          const response = await apiConfig.post(`/posts/${post.postId}/like`, {
            like: willLike
          });

          if (!response.data) {
            throw new Error('Failed to update like status');
          }
        } catch (error) {
          console.error('Error inside debounce API call:', error);
        }
      }, 300);
    } catch (error) {
      console.error('Error toggling like:', error);
      setLiked(!willLike);
      setLikeCount(prev => willLike ? prev - 1 : prev + 1);
    } finally {
      setIsLikeLoading(false);
    }
  };

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => prev === post.postImages.length - 1 ? 0 : prev + 1);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => prev === 0 ? post.postImages.length - 1 : prev - 1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden flex relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full z-50 transition-all"
        >
          <FaTimes className="text-white text-xl" />
        </button>

        {/* Left side - Images */}
        <div className="w-7/12 bg-black relative flex items-center justify-center">
          {post.postImages && post.postImages.length > 0 ? (
            <>
              <img
                src={post.postImages[currentImageIndex].imageFilepath}
                alt={`Post ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-all transform hover:scale-110"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full text-white transition-all transform hover:scale-110"
                  >
                    <FaChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full text-white text-sm">
                      {currentImageIndex + 1} / {post.postImages.length}
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center text-gray-500">
              No images available
            </div>
          )}
        </div>

        {/* Right side - Content */}
        <div className="w-5/12 flex flex-col bg-gray-50">
          <div className="p-4 bg-white border-b flex items-center space-x-3">
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{post.userName}</h3>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>

          <div className="p-4 bg-white border-b">
            <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 p-4">
              <p className="text-gray-500 text-center italic">
                Chưa có bình luận nào
              </p>
            </div>
          </div>

          <div className="border-t bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleLikeClick}
                disabled={isLikeLoading}
                className={`flex items-center space-x-2 ${
                  liked ? 'text-red-500' : 'text-gray-600'
                } hover:text-red-600 transition-colors ${
                  isLikeLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                <span className="font-medium">{likeCount} lượt thích</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Viết bình luận..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
                Đăng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
