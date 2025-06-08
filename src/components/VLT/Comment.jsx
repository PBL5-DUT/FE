import React, { useState } from 'react';
import { apiConfig } from '../../config/apiConfig';

const Comment = ({ comment, currentUser, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [reply, setReply] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

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

  return (
    <div className="flex items-start gap-3 mb-4">
      {/* Avatar */}
      <img
        src={comment.avatarFilePath || '/default-avatar.png'}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover"
      />

      <div className="flex-1">
        {/* Comment bubble */}
        <div className="bg-gray-100 rounded-xl px-4 py-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-sm">{comment.userName}</p>
              <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
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

        {/* Actions */}
        <div className="text-xs text-gray-500 mt-1 flex gap-4 ml-2">
          {comment.userId === currentUser.userId && (
            <>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="hover:underline">
                  Sửa
                </button>
              ) : (
                <button onClick={handleUpdate} className="hover:underline">
                  Lưu
                </button>
              )}
              <button onClick={handleDelete} className="hover:underline">
                Xoá
              </button>
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

        {/* Reply input */}
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

        {/* Replies */}
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
    </div>
  );
};

export default Comment;
