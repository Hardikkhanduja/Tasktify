import React, { useState } from "react";
import { useTodo } from "../contexts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ todo, theme }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [priority, setPriority] = useState(todo.priority || "none");
  const [dueDate, setDueDate] = useState(todo.dueDate || "");
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const editTodo = () => {
    updateTodo(todo.id, {
      ...todo,
      todo: todoMsg,
      priority,
      dueDate: dueDate || null,
    });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    const today = new Date();
    const due = new Date(todo.dueDate);
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  };

  const getPriorityBadge = () => {
    const badges = {
      high: { emoji: "🔴", text: "High", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
      medium: { emoji: "🟡", text: "Medium", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
      low: { emoji: "🟢", text: "Low", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
    };
    return badges[priority];
  };

  const priorityBadge = getPriorityBadge();
  const overdue = isOverdue();

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-start gap-4 px-5 py-4 rounded-xl border shadow-sm transition-all hover:shadow-md ${
        todo.completed
          ? theme === "dark"
            ? "bg-[#151515] border-[#252525]"
            : "bg-gray-50 border-gray-200"
          : overdue
          ? theme === "dark"
            ? "bg-red-950/20 border-red-900/30"
            : "bg-red-50 border-red-200"
          : theme === "dark"
          ? "bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#3a3a3a]"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className={`mt-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity ${
          theme === "dark" ? "text-gray-600 hover:text-gray-400" : "text-gray-400 hover:text-gray-600"
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        </svg>
      </button>

      {/* Checkbox */}
      <input
        type="checkbox"
        className={`mt-1 w-5 h-5 rounded-md border-2 cursor-pointer transition-all ${
          theme === "dark"
            ? "border-gray-600 bg-transparent checked:bg-white checked:border-white"
            : "border-gray-300 bg-white checked:bg-gray-900 checked:border-gray-900"
        }`}
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Todo Text */}
        <input
          type="text"
          className={`w-full bg-transparent border-none outline-none text-base ${
            isTodoEditable
              ? theme === "dark"
                ? "text-white"
                : "text-gray-900"
              : todo.completed
              ? theme === "dark"
                ? "text-gray-600 line-through"
                : "text-gray-400 line-through"
              : theme === "dark"
              ? "text-gray-200"
              : "text-gray-800"
          }`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />

        {/* Metadata */}
        {(isTodoEditable || priority !== "none" || todo.dueDate) && (
          <div className="flex gap-2 mt-2.5 flex-wrap">
            {isTodoEditable ? (
              <>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`text-sm px-3 py-1.5 rounded-lg border ${
                    theme === "dark"
                      ? "bg-[#0f0f0f] text-gray-300 border-[#2a2a2a]"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  <option value="none">No Priority</option>
                  <option value="high">🔴 High</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="low">🟢 Low</option>
                </select>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`text-sm px-3 py-1.5 rounded-lg border ${
                    theme === "dark"
                      ? "bg-[#0f0f0f] text-gray-300 border-[#2a2a2a]"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                />
              </>
            ) : (
              <>
                {priorityBadge && (
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityBadge.color}`}>
                    {priorityBadge.emoji} {priorityBadge.text}
                  </span>
                )}
                {todo.dueDate && (
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      overdue
                        ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        : theme === "dark"
                        ? "bg-blue-950 text-blue-300"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {overdue && "⚠️ "}📅 {new Date(todo.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
            theme === "dark"
              ? "hover:bg-[#252525] text-gray-500 hover:text-gray-300"
              : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable(true);
            }
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          )}
        </button>

        <button
          className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
            theme === "dark"
              ? "hover:bg-red-950/50 text-gray-500 hover:text-red-400"
              : "hover:bg-red-50 text-gray-400 hover:text-red-600"
          }`}
          onClick={() => deleteTodo(todo.id)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TodoItem;