import React from "react";

const ForumCard = ({ forum }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{forum.title}</h3>
    </div>
  );
};

export default ForumCard;