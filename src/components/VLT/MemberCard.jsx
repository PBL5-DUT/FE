import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { apiConfig } from "../../config/apiConfig";
import PropTypes from 'prop-types';
import ProjectList from "./ProjectList"; // Assuming you have a ProjectList component to display projects

const MemberCard = ({ name, username, avatar, userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenModal = async () => {
    if (!userId) {
      setError("User ID is missing");
      return;
    }

    try {
      setLoading(true);
      setShowModal(true);
      const response = await apiConfig.get(`/projects/userprofile/${userId}`);
      setProjects(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching user projects:", err);
      setError("Không thể tải danh sách dự án.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="w-full flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
      >
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={avatar || '/default-avatar.png'}
                  alt={name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                  <p className="text-gray-500">@{username}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Đang tải danh sách dự án...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : projects.length > 0 ? (
                <ProjectList 
                  projects={projects}
                  isLoading={loading}
                  error={error}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Người dùng chưa tham gia dự án nào.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

MemberCard.propTypes = {
  userId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

export default MemberCard;