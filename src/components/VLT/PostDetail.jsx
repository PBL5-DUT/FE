import React, { useState, useContext } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CommentList from './CommentList';
import { apiConfig } from '../../config/apiConfig';
import { AuthContext } from '../../util/AuthContext';

const PostDetail = ({ post: initialPost, onClose }) => {
  const [post, setPost] = useState(initialPost);
  const { currentUser } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState('');

  const hasImages = post.postImages && post.postImages.length > 0;
  const hasMultipleImages = post.postImages && post.postImages.length > 1;

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const commentDTO = {
        content: comment.trim(),
        postId: post.postId,
        userId: currentUser.userId,
      };

      await apiConfig.post(`/comments/${post.postId}`, commentDTO);

      setComment('');
      // Bạn có thể fetch lại comments ở đây nếu cần
    } catch (err) {
      console.error('Comment submit failed', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-6xl h-[85vh] rounded-xl overflow-hidden flex relative shadow-xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 rounded-full z-50"
          aria-label="Close"
        >
          <FaTimes className="text-white text-xl" />
        </button>

        {/* Nếu có ảnh thì chia 2 cột */}
        {hasImages ? (
          <>
            {/* Left: Image gallery */}
            <div className="w-7/12 bg-black relative flex items-center justify-center">
              <img
                src={post.postImages[currentImageIndex].imageFilepath}
                alt="Post"
                className="w-full h-full object-contain"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? post.postImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === post.postImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
                    aria-label="Next image"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Right: Post content + comments (fixed width, không xê dịch) */}
            <div className="w-5/12 flex flex-col bg-white">
              {/* Post header */}
              <div className="p-5 border-b flex items-center space-x-4 sticky top-0 bg-white z-20">
                <img
                  src={post.userAvatar || '/default-avatar.png'}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Post text */}
              <div className="p-5 border-b flex-shrink-0">
                <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Comment list */}
              <div className="flex-1 overflow-y-auto p-5">
                <CommentList postId={post.postId} currentUser={currentUser} />
              </div>

              {/* New comment input */}
              <div className="p-5 border-t flex items-center space-x-3">
                <img
                  src={currentUser.avatarFilepath || '/default-avatar.png'}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-1 border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:ring focus:border-blue-500 text-sm"
                  placeholder="Viết bình luận..."
                />
                <button
                  onClick={handleCommentSubmit}
                  className="bg-blue-600 text-white text-sm px-5 py-3 rounded-full hover:bg-blue-700 transition"
                >
                  Đăng
                </button>
              </div>
            </div>
          </>
        ) : (
          // Nếu không có ảnh, phần content chiếm full chiều ngang
          <div className="flex flex-col w-full bg-white rounded-xl overflow-hidden">
            {/* Post header */}
            <div className="p-5 border-b flex items-center space-x-4 sticky top-0 bg-white z-20">
              <img
                src={post.userAvatar || '/default-avatar.png'}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Post text */}
            <div className="p-5 border-b">
              <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Comment list */}
            <div className="flex-1 overflow-y-auto p-5">
              <CommentList postId={post.postId} currentUser={currentUser} />
            </div>

            {/* New comment input */}
            <div className="p-5 border-t flex items-center space-x-3">
              <img
                src={currentUser.avatarFilepath || '/default-avatar.png'}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:ring focus:border-blue-500 text-sm"
                placeholder="Viết bình luận..."
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-600 text-white text-sm px-5 py-3 rounded-full hover:bg-blue-700 transition"
              >
                Đăng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
