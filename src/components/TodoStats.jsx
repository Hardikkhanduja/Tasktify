import React from "react";

function TodoStats({ todos, theme }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const overdueTodos = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;
    const today = new Date();
    const due = new Date(todo.dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  if (totalTodos === 0) return null;

  return (
    <div className={`rounded-xl p-6 mb-6 border shadow-sm ${
      theme === "dark" 
        ? "bg-[#1a1a1a] border-[#2a2a2a]" 
        : "bg-white border-gray-200"
    }`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className={`text-center p-4 rounded-lg ${
          theme === "dark" ? "bg-[#151515]" : "bg-gray-50"
        }`}>
          <div className={`text-3xl font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {totalTodos}
          </div>
          <div className={`text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}>
            Total Tasks
          </div>
        </div>

        <div className={`text-center p-4 rounded-lg ${
          theme === "dark" ? "bg-green-950/20" : "bg-green-50"
        }`}>
          <div className={`text-3xl font-semibold mb-1 ${
            theme === "dark" ? "text-green-400" : "text-green-600"
          }`}>
            {completedTodos}
          </div>
          <div className={`text-sm ${
            theme === "dark" ? "text-green-600" : "text-green-700"
          }`}>
            Completed
          </div>
        </div>

        <div className={`text-center p-4 rounded-lg ${
          theme === "dark" ? "bg-blue-950/20" : "bg-blue-50"
        }`}>
          <div className={`text-3xl font-semibold mb-1 ${
            theme === "dark" ? "text-blue-400" : "text-blue-600"
          }`}>
            {activeTodos}
          </div>
          <div className={`text-sm ${
            theme === "dark" ? "text-blue-600" : "text-blue-700"
          }`}>
            Active
          </div>
        </div>

        <div className={`text-center p-4 rounded-lg ${
          theme === "dark" ? "bg-red-950/20" : "bg-red-50"
        }`}>
          <div className={`text-3xl font-semibold mb-1 ${
            overdueTodos > 0
              ? "text-red-500"
              : theme === "dark"
              ? "text-gray-600"
              : "text-gray-400"
          }`}>
            {overdueTodos}
          </div>
          <div className={`text-sm ${
            overdueTodos > 0
              ? "text-red-600"
              : theme === "dark"
              ? "text-gray-600"
              : "text-gray-500"
          }`}>
            Overdue
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className={`text-sm font-medium ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Overall Progress
          </span>
          <span className={`text-sm font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            {completionRate}%
          </span>
        </div>
        <div className={`w-full rounded-full h-2.5 ${
          theme === "dark" ? "bg-[#252525]" : "bg-gray-200"
        }`}>
          <div
            className="h-2.5 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;