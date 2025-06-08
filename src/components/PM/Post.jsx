import React, { useState, useRef } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaEllipsisV } from 'react-icons/fa';
import PostDetail from '../VLT/PostDetail';
import { apiConfig } from '../../config/apiConfig';

const Post = ({ post, onPostUpdate }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const debounceRef = useRef(null);
  const latestLikedRef = useRef(liked);

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

  const handleLikeClick = async (e) => {
    e.preventDefault(); // Prevent event bubbling
    if (likeLoading) return;

    setLikeLoading(true);
    const willLike = !liked;

    try {
      // Update UI immediately for better UX
      setLiked(willLike);
      setLikeCount(prev => willLike ? prev + 1 : prev - 1);
      
      // Clear existing timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Debounced API call
      debounceRef.current = setTimeout(async () => {
        const response = await apiConfig.post(`/posts/${post.postId}/like`, {
          like: willLike
        });

        if (!response.data) {
          throw new Error('Failed to update like status');
        }
      }, 300);

    } catch (error) {
      console.error('Error toggling like:', error);
      // Rollback UI changes if API fails
      setLiked(!willLike);
      setLikeCount(prev => willLike ? prev - 1 : prev + 1);
    } finally {
      setLikeLoading(false);
    }
  };

  // Update the comment button click handler
  const handleCommentClick = () => {
    setShowPostDetail(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{post.userName}</h3>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          {/* Options Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisV className="text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Report
                </button>
                
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-800 whitespace-pre-wrap mb-4">{post.content}</p>
          
          {/* Images */}
          {post.postImages && post.postImages.length > 0 && (
            <div className={`grid gap-2 mb-4 ${
              post.postImages.length === 1 ? 'grid-cols-1' : 
              post.postImages.length === 2 ? 'grid-cols-2' :
              'grid-cols-3'
            }`}>
              {post.postImages.map((image) => (
                <div key={image.imageId} className="aspect-w-16 aspect-h-9">
                  <img
                    src={image.imageFilepath}
                    alt={`Post image ${image.imageId}`}
                    className="object-cover w-full h-full rounded-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <button
              onClick={handleLikeClick}
              disabled={likeLoading}
              className={`flex items-center space-x-2 ${
                liked ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-600 transition-colors`}
            >
              {liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
              <span className="text-sm">{likeCount} lượt thích</span>
            </button>

            {/* Update the comment button */}
            <button
              onClick={handleCommentClick}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FaComment size={20} />
              <span className="text-sm">Bình luận</span>
            </button>
          </div>
        </div>

        {/* Status badge */}
        {post.status !== 'approved' && (
          <div className="px-4 py-2 bg-yellow-50 border-t">
            <span className="text-xs font-medium text-yellow-800">
              Trạng thái: {post.status}
            </span>
          </div>
        )}
      </div>

      {/* Add PostDetail Modal */}
      {showPostDetail && (
        <PostDetail
          post={post}
          onClose={() => setShowPostDetail(false)}
          liked={liked}
          onLikeClick={handleLikeClick}
        />
      )}
    </>
  );
};

export default Post;