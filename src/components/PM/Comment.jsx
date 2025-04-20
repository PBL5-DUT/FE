import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      {/* Header */}
      <div className="flex items-center mb-2">
        <img
          src={comment.userAvatar}
          alt="User Avatar"
          className="h-10 w-10 rounded-full mr-3"
        />
        <div>
          <span className="block font-semibold text-gray-800">
            {comment.user}
          </span>
          <span className="text-sm text-gray-500">{comment.time}</span>
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-gray-700">{comment.text}</p>
    </div>
  );
};

export default Comment;