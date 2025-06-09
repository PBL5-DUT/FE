import React, { useState, useEffect } from "react";
import { apiConfig } from "../../config/apiConfig";


const Expense = ({ projectId, isFixed = true }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const itemsPerPage = 14;

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
    <div className={`bg-white p-4 ${isFixed ? "fixed right-0 top-[64px] w-[300px] h-[calc(100vh-64px)]" : "h-full"} overflow-hidden`}>
      {loading ? (
        <div className="text-xs text-gray-500">Đang tải danh sách chi tiêu...</div>
      ) : error ? (
        <div className="text-xs text-red-500">{error}</div>
      ) : (
        <>
          {/* Content section - Remove nested scrollable divs */}
          <div className="h-[calc(100%-160px)]">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border border-gray-300 px-1 py-1 text-left">STT</th>
                  {/* <th className="border border-gray-300 px-1 py-1 text-left">Username</th> */}
                  <th className="border border-gray-300 px-1 py-1 text-right">Purpose</th>
                  <th className="border border-gray-300 px-1 py-1 text-right">VND</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses().length > 0 ? (
                  paginatedExpenses().map((expense, index) => (
                    <tr
                      key={expense.expenseId}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition`}
                    >
                      <td className="border border-gray-300 px-1 py-1">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      {/* <td className="border border-gray-300 px-1 py-1">
                        {expense.receiver?.userName || "Ẩn danh"}
                      </td> */}
                      <td className="border border-gray-300 px-1 py-1 text-right">
                        {expense.purpose || "Không có mục đích"}
                      </td>
                      <td className="border border-gray-300 px-1 py-1 text-right">
                        {expense.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-2 text-gray-500">
                      Chưa có khoản chi nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total Money - Position at bottom */}
          <div className="absolute bottom-16 right-4 left-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-medium text-gray-700 text-right">
                Total: <span className="font-bold text-red-500">{totalMoney.toLocaleString()} VND</span>
              </p>
            </div>
          </div>

          {/* Pagination - Position at bottom */}
          {totalPages > 1 && (
            <div className="absolute bottom-4 right-4 left-4">
              <div className="flex justify-between items-center text-xs">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Previous
                </button>
                <span className="text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
      
    </div>
  );
};

export default Expense;
