import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/apiConfig';
import MemberCard from './MemberCard';
import { FaSpinner } from 'react-icons/fa';

const MemberList = ({ projectId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/requests/${projectId}/approved`);
        setMembers(response.data);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Không thể tải danh sách thành viên');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <FaSpinner className="animate-spin text-blue-500 text-3xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Thành viên ({members.length})
      </h2>

      {/* Change from grid to flex column layout */}
      <div className="flex flex-col space-y-4">
        {members.map((member) => (
          <MemberCard
            userId={member.userId}
            name={member.fullName}
            username={member.username}
            avatar={member.avatarFilepath}
          />
        ))}
      </div>

      {members.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Chưa có thành viên nào</p>
        </div>
      )}
    </div>
  );
};

export default MemberList;