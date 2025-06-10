import React, { useState, useEffect } from 'react';
import { apiConfig } from '../../config/apiConfig';

const ReportRequest = ({ forumId }) => {
  const [activeTab, setActiveTab] = useState('post');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    fetchPendingReports();
  }, [forumId, activeTab]);

  const fetchPendingReports = async () => {
    try {
      setLoading(true);
      const response = await apiConfig.get(`/reports/pending?type=${activeTab}`);
      setReports(response.data);
    } catch (err) {
      console.error('Error fetching pending reports:', err);
      setError('Không thể tải danh sách báo cáo chờ duyệt');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
  };

  const handleResolve = async (reportId) => {
    try {
      setProcessingIds(prev => new Set(prev).add(reportId));
      await apiConfig.put(`/reports/resolve/${reportId}`);
      setReports(prev => prev.filter(report => report.reportId !== reportId));
    } catch (err) {
      console.error('Error resolving report:', err);
      setError('Không thể xử lý báo cáo');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  };

  const handleDismiss = async (reportId) => {
    try {
      setProcessingIds(prev => new Set(prev).add(reportId));
      await apiConfig.put(`/reports/dismiss/${reportId}`);
      setReports(prev => prev.filter(report => report.reportId !== reportId));
    } catch (err) {
      console.error('Error dismissing report:', err);
      setError('Không thể bỏ qua báo cáo');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(reportId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-blue-500">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => {
            setError(null);
            fetchPendingReports();
          }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab('post')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'post'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Báo cáo Bài viết ({reports.filter(r => r.reportType === 'post').length})
        </button>
        <button
          onClick={() => setActiveTab('comment')}
          className={`px-4 py-2 font-medium ml-4 ${
            activeTab === 'comment'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Báo cáo Bình luận ({reports.filter(r => r.reportType === 'comment').length})
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Báo cáo {activeTab === 'post' ? 'Bài viết' : 'Bình luận'} chờ duyệt
      </h2>

      {reports.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Không có báo cáo nào đang chờ duyệt</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.reportId} className="border rounded-lg p-4">
              {/* Report Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">
                    Người báo cáo: {report.user?.username || 'Ẩn danh'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(report.createdAt)}
                  </p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  {activeTab === 'post' ? 'Bài viết' : 'Bình luận'}
                </span>
              </div>

              {/* Report Reason */}
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600">Lý do:</p>
                <p className="text-gray-800">{report.reason || 'Không có lý do cụ thể'}</p>
              </div>

              {/* Reported Content Preview */}
              {report.reportedContent && (
                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="text-sm font-medium text-gray-600 mb-1">Nội dung bị báo cáo:</p>
                  <p className="text-gray-800 line-clamp-3">
                    {report.reportedContent.content || report.reportedContent.text}
                  </p>
                  {report.reportType === 'post' && report.reportedContent.postImages?.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Có {report.reportedContent.postImages.length} hình ảnh
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleDismiss(report.reportId)}
                  disabled={processingIds.has(report.reportId)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                  {processingIds.has(report.reportId) ? 'Đang xử lý...' : 'Bỏ qua'}
                </button>
                <button
                  onClick={() => handleResolve(report.reportId)}
                  disabled={processingIds.has(report.reportId)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {processingIds.has(report.reportId) ? 'Đang xử lý...' : 'Xử lý'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportRequest;