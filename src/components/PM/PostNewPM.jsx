import React from "react";

const PostNew = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My name</h2>

      {/* Textarea */}
      <textarea
        placeholder="Write your post or question here"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        rows="4"
      ></textarea>

      {/* Actions */}
      <div className="flex justify-between">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">
          Add media
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostNew;