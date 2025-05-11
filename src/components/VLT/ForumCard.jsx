import React from "react";

const ForumCard = ({ forum }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      <h3 className="text-lg font-semibold text-gray-800">{forum.title}</h3>
    </div>
  );
};

export default ForumCard;