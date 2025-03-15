import React, { useState } from "react";

const NewPj = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-4">New Project</h2>

        <select
          className="w-full p-2 border rounded mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose categories</option>
          <option value="Education">Education</option>
          <option value="Environment">Environment</option>
        </select>

        <input
          type="text"
          placeholder="Type catching attention title"
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Type text here"
          className="w-full p-2 border rounded mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Image</button>
          <div>
            <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>
              Save as draft
            </button>
            <button className="bg-orange-400 text-white px-4 py-2 rounded">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPj;