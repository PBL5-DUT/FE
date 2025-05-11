import React, { useState } from "react";

const PostNew = ({ onPost }) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      const newPost = {
        id: Date.now(),
        author: "CurrentUser",
        date: new Date().toLocaleString(),
        content,
        details: "",
        likes: 0,
        comments: 0,
      };
      onPost(newPost);
      setContent("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Write your post or question here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
          Add media
        </button>
        <button
          onClick={handlePost}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostNew;