import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;