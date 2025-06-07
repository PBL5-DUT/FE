import React, { useState, useEffect } from 'react';
import Post from './Post';
import { apiConfig } from '../../config/apiConfig';

const PostList = ({ forumId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/posts/${forumId}`);
        setPosts(response.data.reverse());
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (forumId) {
      fetchPosts();
    }
  }, [forumId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <div className="text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có bài viết nào</h3>
          <p className="mt-1 text-sm text-gray-500">Hãy là người đầu tiên chia sẻ trong diễn đàn này.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post 
          key={post.postId} 
          post={post}
          onPostUpdate={(updatedPost) => {
            setPosts(currentPosts => 
              currentPosts.map(p => p.postId === updatedPost.postId ? updatedPost : p)
            );
          }}
        />
      ))}
    </div>
  );
};

export default PostList;