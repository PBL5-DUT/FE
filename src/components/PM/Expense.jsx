import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddExpense from "./AddExpense";

const Expense = ({ expenses }) => {
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
    (sum, expense) => sum + (typeof expense.amount === "number" ? expense.amount : 0),
    0
  );
  return (
    <div>
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
                <td className="border-b border-red-500 py-3">{expense.purpose}</td>
                <td className="border-b border-red-500 py-3 text-right">
                  {expense.receiver?.username || "Ẩn danh"}
                </td>
                <td className="border-b border-red-500 py-3 text-right">
                  {expense.amount.toLocaleString()}
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
            <td colSpan={3} className="text-left font-semibold py-3">Total:</td>
        <td className="text-right font-semibold py-3">
          {totalMoney.toLocaleString()} VND
        </td>
            <td></td>
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

      <button
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => setShowForm(true)}
      >
        +
      </button>

      {showForm && (
        <AddExpense
          isOpen={showForm}
          onRequestClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            window.location.reload();
          }}
          projectId={id}
        />
      )}
    </div>
  );
};

export default Expense;
