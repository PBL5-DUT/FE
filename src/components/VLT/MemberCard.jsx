import React from "react";

const MemberCard = ({ name, username, avatar }) => {
  return (
    <div className="w-full flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      {/* Avatar */}
      <img
        src={avatar || '/default-avatar.png'}
        alt={`${name}'s avatar`}
        className="h-12 w-12 rounded-full mr-4 object-cover border-2 border-gray-200"
      />
      {/* Member Info */}
      <div className="flex-1">
        <span className="block font-semibold text-gray-800">{name}</span>
        <span className="text-sm text-gray-500">@{username}</span>
      </div>
    </div>
  );
};

export default MemberCard;