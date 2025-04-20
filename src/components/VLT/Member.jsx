import React from "react";

const Member = ({ name, username, avatar }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Avatar */}
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="h-12 w-12 rounded-full mr-4"
      />
      {/* Member Info */}
      <div>
        <span className="block font-semibold text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">@{username}</span>
      </div>
    </div>
  );
};

export default Member;