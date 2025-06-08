import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Expense = ({ expenses = [] }) => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const paginatedExpenses = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return expenses.slice(startIndex, endIndex);
  };

  const totalMoney = expenses.reduce(
    (sum, expense) =>
      sum + (Number.isFinite(expense.amount) ? expense.amount : 0),
    0
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg fixed right-0 top-[64px] w-[300px] h-[calc(100vh-64px)] overflow-hidden">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">Purpose</th>
            <th className="text-right">Receiver</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            paginatedExpenses().map((expense, index) => (
              <tr key={index}>
                <td className="border-b border-red-500 py-3">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </td>
                <td className="border-b border-red-500 py-3">
                  {expense.purpose}
                </td>
                <td className="border-b border-red-500 py-3 text-right">
                  {expense.receiver?.username || "Ẩn danh"}
                </td>
                <td className="border-b border-red-500 py-3 text-right">
                  {Number.isFinite(expense.amount)
                    ? expense.amount.toLocaleString()
                    : "0"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Chưa có khoản chi nào
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-left font-semibold py-3">
              Total:
            </td>
            <td className="text-right font-semibold py-3">
              {totalMoney.toLocaleString()} VND
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Pagination Controls */}
      {expenses.length > itemsPerPage && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            className="px-4 py-2 bg-gray-300 rounded-full hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Expense;
