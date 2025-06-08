import React, { useState, useRef } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaEllipsisV, FaTimes } from 'react-icons/fa';
import PostDetail from './PostDetail';
import { apiConfig } from '../../config/apiConfig';

const REPORT_REASONS = [
  "Vấn đề liên quan đến người dưới 18 tuổi",
  "Bắt nạt, quấy rối hoặc lăng mạ/lạm dụng/ngược đãi",
  "Tự tử hoặc tự gây thương tích",
  "Nội dung mang tính bạo lực, thù ghét hoặc gây phiền toái",
  "Bán hoặc quảng cáo mặt hàng bị hạn chế",
  "Nội dung người lớn",
  "Thông tin sai sự thật, lừa đảo hoặc gian lận",
  "Quyền sở hữu trí tuệ",
  "Tôi không muốn xem nội dung này"
];

const Post = ({ post, currentUserId, onPostUpdate }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const debounceRef = useRef(null);

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
    e.preventDefault();
    if (likeLoading) return;

    setLikeLoading(true);
    const willLike = !liked;

    try {
      setLiked(willLike);
      setLikeCount(prev => willLike ? prev + 1 : prev - 1);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(async () => {
        const response = await apiConfig.post(`/posts/${post.postId}/like`, {
          like: willLike
        });

        if (!response.data) throw new Error('Failed to update like status');
      }, 300);
    } catch (error) {
      console.error('Error toggling like:', error);
      setLiked(!willLike);
      setLikeCount(prev => willLike ? prev - 1 : prev + 1);
    } finally {
      setLikeLoading(false);
    }
  };

  const openReportMenu = () => {
    setShowMenu(false);
    setReporting(true);
  };

  const closeReportMenu = () => {
    setReporting(false);
    setSelectedReason('');
  };

  const submitReport = async () => {
    if (!selectedReason) {
      alert('Vui lòng chọn lý do báo cáo.');
      return;
    }

    setReportLoading(true);
    try {
      const payload = {
        reportType: 'post',
        reportItemId: post.postId,
        userId: currentUserId,
        reason: selectedReason
      };

      const response = await apiConfig.post('/reports', payload);
      if (response.status === 200) {
        alert('Báo cáo của bạn đã được gửi.');
        closeReportMenu();
      } else {
        throw new Error('Gửi báo cáo thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi gửi báo cáo. Vui lòng thử lại.');
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="p-2 flex items-center justify-between border-b">
          <div className="flex items-center space-x-3">
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <h3 className="font-semibold text-gray-800">{post.userName}</h3>
              <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
          {/* Options */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMenu(false);
                setReporting(true);
              }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisV className="text-gray-500" />
            </button>

          </div>
        </div>

        {/* Content */}
        <div className="p-2">
          <p className="text-gray-800 whitespace-pre-wrap mb-4">{post.content}</p>

          {/* Images */}
          {post.postImages?.length > 0 && (
            <div className={`grid gap-2 mb-4 ${
              post.postImages.length === 1 ? 'grid-cols-1' :
              post.postImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {post.postImages.map(image => (
                <div key={image.imageId} className="w-full aspect-w-16 aspect-h-9">
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
          <div className="flex items-center justify-between pt-6 ">
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

            <button
              onClick={() => setShowPostDetail(true)}
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

      {/* Report Menu */}
      {reporting && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg relative">
            {/* Close button */}
            <button
              onClick={closeReportMenu}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Đóng"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-3">Báo cáo</h2>
            <p className="text-sm mb-4 text-gray-700">
              Tại sao bạn báo cáo bài viết này?
              <br />
            </p>

            <div className="max-h-60 overflow-y-auto mb-4 border rounded p-2">
              {REPORT_REASONS.map((reason, idx) => (
                <label
                  key={idx}
                  className={`block p-2 cursor-pointer rounded ${
                    selectedReason === reason ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="mr-2"
                  />
                  {reason}
                </label>
              ))}
            </div>

            <button
              onClick={submitReport}
              disabled={reportLoading}
              className={`w-full py-2 rounded text-white font-semibold ${
                selectedReason ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {reportLoading ? 'Đang gửi...' : 'Gửi báo cáo'}
            </button>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
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
