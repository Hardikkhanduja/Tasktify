import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm({ theme }) {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("none");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    addTodo({
      todo,
      completed: false,
      priority,
      dueDate: dueDate || null,
    });

    setTodo("");
    setPriority("none");
    setDueDate("");
  };

  return (
    <form onSubmit={add} className="space-y-3">
      {/* Main input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="What needs to be done?"
          className={`flex-1 px-4 py-3.5 rounded-xl text-base border shadow-sm transition-all ${
            theme === "dark"
              ? "bg-[#1a1a1a] text-white border-[#2a2a2a] placeholder-gray-600 focus:border-[#3a3a3a] focus:shadow-md"
              : "bg-white text-gray-900 border-gray-200 placeholder-gray-400 focus:border-gray-300 focus:shadow-md"
          }`}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          className={`px-8 py-3.5 rounded-xl text-base font-medium shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${
            theme === "dark"
              ? "bg-white text-black hover:bg-gray-100"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          Add Task
        </button>
      </div>

      {/* Priority and Due Date */}
      <div className="flex gap-3">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-xl text-base border shadow-sm transition-all ${
            theme === "dark"
              ? "bg-[#1a1a1a] text-gray-300 border-[#2a2a2a] focus:border-[#3a3a3a]"
              : "bg-white text-gray-700 border-gray-200 focus:border-gray-300"
          }`}
        >
          <option value="none">No Priority</option>
          <option value="high">🔴 High Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="low">🟢 Low Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-xl text-base border shadow-sm transition-all ${
            theme === "dark"
              ? "bg-[#1a1a1a] text-gray-300 border-[#2a2a2a] focus:border-[#3a3a3a]"
              : "bg-white text-gray-700 border-gray-200 focus:border-gray-300"
          }`}
        />
      </div>
    </form>
  );
}

export default TodoForm;