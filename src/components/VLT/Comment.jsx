import React, { useState, useRef } from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';
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

const Comment = ({ comment, currentUser, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const menuRef = useRef(null);

  const handleUpdate = async () => {
    try {
      await apiConfig.put(`/comments/${comment.commentId}`, {
        ...comment,
        content: editedContent,
      });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    try {
      await apiConfig.delete(`/comments/${comment.commentId}`);
      onUpdate();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return;

    const newReply = {
      userId: currentUser.userId,
      userName: currentUser.userName,
      avatarFilePath: currentUser.avatarFilePath,
      postId: comment.postId,
      content: reply,
      parentCommentId: comment.commentId,
      createdAt: new Date().toISOString(),
    };

    try {
      await apiConfig.post(`/comments/${comment.postId}`, newReply);
      setReply('');
      setShowReplyInput(false);
      setShowReplies(true);
      onUpdate();
    } catch (err) {
      console.error('Reply failed', err);
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
        reportType: 'comment',
        reportItemId: comment.commentId,
        userId: currentUser.userId,
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
    <div className="flex items-start gap-3 mb-4 relative">
      <img
        src={comment.avatarFilePath || '/default-avatar.png'}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="bg-gray-100 rounded-xl px-4 py-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm">{comment.userName}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
            </div>

            <div className="relative">
             <button
  onClick={() => setReporting(true)}
  className="p-1 hover:bg-gray-200 rounded-full"
>
  <FaEllipsisV className="text-gray-500" />
</button>

            </div>
          </div>

          <div className="mt-1 text-sm whitespace-pre-wrap">
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm mt-1"
              />
            ) : (
              <p>{comment.content}</p>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-1 flex gap-4 ml-2">
          {comment.userId === currentUser.userId && (
            <>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="hover:underline">Sửa</button>
              ) : (
                <button onClick={handleUpdate} className="hover:underline">Lưu</button>
              )}
              <button onClick={handleDelete} className="hover:underline">Xoá</button>
            </>
          )}
          <button onClick={() => setShowReplyInput(!showReplyInput)} className="hover:underline">
            {showReplyInput ? 'Huỷ' : 'Trả lời'}
          </button>
          {comment.replies?.length > 0 && (
            <button onClick={() => setShowReplies(!showReplies)} className="hover:underline">
              {showReplies ? 'Ẩn phản hồi' : `Xem phản hồi (${comment.replies.length})`}
            </button>
          )}
        </div>

        {showReplyInput && (
          <div className="mt-2 ml-2">
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Viết phản hồi..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:ring-1 focus:ring-blue-400"
              rows={2}
            />
            <div className="text-right mt-1">
              <button
                onClick={handleReply}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
              >
                Gửi
              </button>
            </div>
          </div>
        )}

        {showReplies && comment.replies?.length > 0 && (
          <div className="mt-3 space-y-3 ml-8">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.commentId}
                comment={reply}
                currentUser={currentUser}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Report Modal */}
      {reporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg p-6 relative">
            <button onClick={closeReportMenu} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Báo cáo bình luận</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {REPORT_REASONS.map((reason, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="mr-2"
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={submitReport}
                disabled={reportLoading}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
              >
                {reportLoading ? 'Đang gửi...' : 'Gửi báo cáo'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
