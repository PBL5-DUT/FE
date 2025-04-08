import React from 'react';

const PostNew = () => {
  return (
    <div className="post-new p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Forum</h2>
      <textarea
        placeholder="Write your post or question here"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      ></textarea>
      <div className="post-new-actions flex justify-end space-x-4">
        <button className="add-media-button bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300">
          Add media
        </button>
        <button className="post-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostNew;