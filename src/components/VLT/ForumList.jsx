import React from "react";
import ForumCard from "./ForumCard";

const ForumList = ({ forums }) => {
  console.log("Forums in ForumList:", forums); // Log để kiểm tra dữ liệu được truyền vào

  if (!Array.isArray(forums) || forums.length === 0) {
    return <div className="text-center text-gray-500">Không có diễn đàn nào để hiển thị.</div>;
  }
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {forums.map((forum) => (
        <ForumCard key={forum.forumId} forum={forum} />
      ))}
    </div>
  );
};

export default ForumList;