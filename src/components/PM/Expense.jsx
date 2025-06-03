import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddExpense from "./AddExpense";
import Modal from "react-modal";

const Expense = ({ expenses }) => {
  const { id } = useParams();
  
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">Purpose</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Username</th>
            
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={index}>
                <td className="border-b border-red-500 py-3">{index + 1}</td>
                <td className="border-b border-red-500 py-3">{expense.purpose}</td>
                <td className="border-b border-red-500 py-3 text-right">
                  {expense.amount.toLocaleString()} 
                </td>
                <td className="border-b border-red-500 py-3 text-right">{expense.receiver.username}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-3">
                Chưa có khoản chi nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
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