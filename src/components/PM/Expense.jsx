import React from "react";

const Expense = ({ expenses }) => {
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">DESCRIPTION</th>
            <th className="text-right">AMOUNT</th>
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
    </div>
  );
};

export default Expense;