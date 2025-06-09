import React from "react";
import ForumCard from "./ForumCard";

const ForumList = ({ forums, projectId,projectName }) => {
  console.log("Forums in ForumList:", forums); 

  if (!Array.isArray(forums) || forums.length === 0) {
    return <div className="text-center text-gray-500">Không có diễn đàn nào để hiển thị.</div>;
  }
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {forums.map((forum) => (
        <ForumCard key={forum.forumId} forum={forum} projectId={projectId} projectName={projectName}/>
      ))}
    </div>
  );
};

export default ForumList;