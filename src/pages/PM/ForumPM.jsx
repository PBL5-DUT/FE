import React from "react";
import LeftBar from "../../components/PM/LeftBar";
import PostNew from "../../components/PM/PostNewPM";
import PostList from "../../components/PM/PostList";
import Donation from "../../components/PM/Donation";

const Forum = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/4 p-4">
        <LeftBar />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-4">
        <PostNew />
        <PostList />
      </div>
      <div className="w-1/4 p-4">
        <Donation />
      </div>
    </div>
  );
};

export default Forum;