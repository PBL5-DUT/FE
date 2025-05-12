import React from 'react';
import Post from './Post'; // Import the Post component
import anh from '../../assets/post.png';
import anh2 from '../../assets/project.jpg';
import anh1 from '../../assets/avatar.png';

const posts = [
  {
    post_id: 1,
    user: '@NgocAnhne',
    userAvatar: anh1,
    time: '2 days ago',
    content: 'Trung thu yêu thương 2024',
    image: anh2,
    likes: 60,
    comments: [
      {
        comment_id: 1,
        user: '@User1',
        userAvatar: anh1,
        time: '1 day ago',
        text: 'Great event!',
      },
      {
        comment_id: 2,
        user: '@User2',
        userAvatar: anh1,
        time: '2 days ago',
        text: 'OK phết đó NA',
      },
    ],
  },
  {
    post_id: 2,
    user: '@ThanhhangNguyen',
    userAvatar: anh1,
    time: '2 days ago',
    content: 'Trung thu yêu thương 2024',
    image: anh,
    likes: 15,
    comments: [
      {
        comment_id: 1,
        user: '@User1',
        userAvatar: anh1,
        time: '1 day ago',
        text: 'Great event!',
      },
    ],
  },
  // Add more posts as needed...
];

const PostList = () => {
  return (
    <div className="post-list space-y-6">
      {posts.map((post) => (
        <Post key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostList;