import React, { useState } from "react";
import CommentList from "./CommentList"; 
const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center mb-4">
        <img
          src={post.userAvatar}
          alt="User Avatar"
          className="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <span className="block font-semibold text-gray-800">{post.user}</span>
          <span className="text-sm text-gray-500">{post.time}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800">{post.content}</h3>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto rounded-lg mt-2"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-600">
        <span
          onClick={handleLikeClick}
          className={`cursor-pointer ${
            liked ? "text-red-500" : "hover:text-gray-800"
          }`}
        >
          {liked ? "❤️" : "🤍"} {post.likes} likes
        </span>
        <span
          onClick={handleCommentClick}
          className="cursor-pointer hover:text-gray-800"
        >
          💬 {post.comments.length} comments
        </span>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4">
          <CommentList comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default Post;