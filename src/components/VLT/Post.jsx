import React, { useState } from 'react';
import CommentList from './CommentList';

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
    <div className="post p-6 bg-gray-100 rounded-lg shadow-md mb-6">
      <div className="post-header flex items-center mb-4">
        <img
          src={post.userAvatar}
          alt="User Avatar"
          className="post-avatar w-12 h-12 rounded-full mr-4"
        />
        <div>
          <span className="post-user font-bold text-gray-800 block">{post.user}</span>
          <span className="post-time text-sm text-gray-500">{post.time}</span>
        </div>
      </div>
      <div className="post-content mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">{post.content}</h3>
        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="post-image w-full rounded-lg shadow-sm"
          />
        )}
      </div>
      <div className="post-actions flex justify-between items-center text-gray-700 text-sm">
        <span
          onClick={handleLikeClick}
          className={`cursor-pointer ${liked ? 'text-red-500' : 'text-gray-500'}`}
        >
          {liked ? '❤️' : '🤍'} {post.likes} likes
        </span>
        <span
          onClick={handleCommentClick}
          className="cursor-pointer hover:text-blue-500"
        >
          💬 {post.comments.length} comments
        </span>
      </div>
      {showComments && <CommentList comments={post.comments} />}
    </div>
  );
};

export default Post;