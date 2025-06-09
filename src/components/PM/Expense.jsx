import React, { useState, useEffect } from "react";
import { apiConfig } from "../../config/apiConfig";
import AddExpense from "./AddExpense";
import { useParams } from "react-router-dom";

const Expense = ({ projectId, isFixed = true }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 8; // Giảm số item để phù hợp với layout

  // Fetch expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const response = await apiConfig.get(`/expenses/project/${projectId}`);
        setExpenses(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching expenses:", err);
        setError("Không thể tải danh sách chi tiêu.");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [projectId]);

  // Calculate total money
  const totalMoney = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Pagination
  const paginatedExpenses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return expenses.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  return (
    <div className="h-full flex flex-col relative">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-gray-500">Đang tải...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-red-500">{error}</div>
        </div>
      ) : (
        <>
          {/* Table Container - Scrollable */}
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-white border-b">
                <tr className="text-gray-600">
                  <th className="text-left py-2 w-8">STT</th>
                  <th className="text-left py-2">Mục đích</th>
                  <th className="text-left py-2">Người nhận</th>
                  <th className="text-right py-2">Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses().length > 0 ? (
                  paginatedExpenses().map((expense, index) => (
                    <tr
                      key={expense.expenseId}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-2 text-gray-500">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="py-2">
                        <div className="truncate max-w-[100px]" title={expense.purpose}>
                          {expense.purpose}
                        </div>
                      </td>
                      <td className="py-2 text-gray-600">
                        <div className="truncate max-w-[300px] ml-4" title={expense.receiver?.username || "Ẩn danh"}>
                          {expense.receiver?.username || "Ẩn danh"}
                        </div>
                      </td>
                      <td className="py-2 text-right font-medium">
                        {expense.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      Chưa có khoản chi nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Section - Fixed */}
          <div className="border-t bg-white p-4 space-y-3">
            {/* Total Money */}
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Tổng chi:</span>
                <span className="text-sm font-bold text-red-500">
                  {totalMoney.toLocaleString()} VND
                </span>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Trước
                </button>
                <span className="text-xs text-gray-500">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Sau
                </button>
              </div>
            )}

            {/* Add Button */}
            <button
              className="w-full py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
              onClick={() => setShowForm(true)}
            >
              + 
            </button>
          </div>
        </>
      )}

      {/* Add Expense Modal */}
      {showForm && (
        <AddExpense
          isOpen={showForm}
          onRequestClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload();
          }}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Expense;