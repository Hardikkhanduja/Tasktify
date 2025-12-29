import React, { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { TodoForm, TodoItem, TodoStats, SearchFilter } from "./components";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos && storedTodos !== "undefined") {
      return JSON.parse(storedTodos);
    }
    return [];
  });

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "dark";
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) => {
      return todo.todo.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };
      return priorityOrder[a.priority || "none"] - priorityOrder[b.priority || "none"];
    });

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className={`min-h-screen py-10 px-4 ${theme === "dark" ? "bg-[#0f0f0f]" : "bg-[#f5f5f5]"}`}>
        <div className="w-full max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className={`text-3xl font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Tasktify
              </h1>
              <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                Stay organized, stay productive
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                theme === "dark"
                  ? "bg-[#1a1a1a] hover:bg-[#222] text-gray-400"
                  : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Statistics Dashboard */}
          <TodoStats todos={todos} theme={theme} />

          {/* Search and Filter */}
          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filter={filter}
            setFilter={setFilter}
            theme={theme}
          />

          {/* Todo Form */}
          <div className="mb-6">
            <TodoForm theme={theme} />
          </div>

          {/* Todos List */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredTodos.map((todo) => todo.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                  <div className={`text-center py-20 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                    <div className="text-5xl mb-4">📝</div>
                    <p className="text-lg font-medium mb-1">
                      {searchQuery ? "No tasks found" : "No tasks yet"}
                    </p>
                    <p className="text-sm">
                      {searchQuery ? "Try adjusting your search" : "Add your first task to get started"}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} theme={theme} />
                  ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;