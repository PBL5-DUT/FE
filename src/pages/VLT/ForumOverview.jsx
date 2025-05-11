import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ForumList from "../../components/VLT/ForumList";
import { apiConfig } from "../../config/apiConfig";

const ForumOverview = () => {
  const { projectId } = useParams();
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchForums = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/forums/project/${projectId}`);
      setForums(response.data.forums);
      setError(null);
    } catch (err) {
      console.error("Error fetching forums:", err);
      setError("Không thể tải danh sách diễn đàn. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, [projectId]);

  if (loading) {
    return <div>Đang tải danh sách diễn đàn...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Danh sách diễn đàn</h1>
      <ForumList forums={forums} />
    </div>
  );
};

export default ForumOverview;