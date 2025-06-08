import React, { useEffect, useState } from 'react';
import { apiConfig } from '../../config/apiConfig';
import Comment from './Comment';

// Hàm chuyển mảng comment phẳng thành cây phân cấp theo parentCommentId
const buildCommentTree = (comments) => {
  const map = {};
  const roots = [];

  // Tạo map id -> comment
  comments.forEach(comment => {
    map[comment.commentId] = { ...comment, replies: [] };
  });

  // Xây dựng cây
  comments.forEach(comment => {
    if (comment.parentCommentId) {
      const parent = map[comment.parentCommentId];
      if (parent) {
        parent.replies.push(map[comment.commentId]);
      }
    } else {
      roots.push(map[comment.commentId]);
    }
  });

  return roots;
};

const CommentList = ({ postId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await apiConfig.get(`/comments/${postId}`);
      // Giả sử API trả về mảng phẳng, ta chuyển thành cây
      const treeComments = buildCommentTree(res.data);
      setComments(treeComments);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div className="space-y-3">
      {loading && <p>Đang tải bình luận...</p>}
      {!loading && comments.length === 0 && <p>Chưa có bình luận nào.</p>}
      {!loading &&
        comments.map(comment => (
          <Comment
            key={comment.commentId}
            currentUser={currentUser}
            comment={comment}
            onUpdate={fetchComments}
          />
        ))}
    </div>
  );
};

export default CommentList;
