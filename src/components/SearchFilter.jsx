import React from "react";

function SearchFilter({ searchQuery, setSearchQuery, filter, setFilter, theme }) {
  return (
    <div className={`rounded-xl p-5 mb-6 border shadow-sm ${
      theme === "dark" 
        ? "bg-[#1a1a1a] border-[#2a2a2a]" 
        : "bg-white border-gray-200"
    }`}>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <svg 
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              theme === "dark" ? "text-gray-600" : "text-gray-400"
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search your tasks..."
            className={`w-full pl-11 pr-4 py-3 rounded-xl text-base border transition-all ${
              theme === "dark"
                ? "bg-[#151515] text-white border-[#252525] placeholder-gray-600 focus:border-[#3a3a3a]"
                : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-400 focus:border-gray-300 focus:bg-white"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              filter === "all"
                ? theme === "dark"
                  ? "bg-white text-black shadow-md"
                  : "bg-gray-900 text-white shadow-md"
                : theme === "dark"
                ? "bg-[#151515] text-gray-400 hover:text-gray-200 hover:bg-[#202020]"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              filter === "active"
                ? theme === "dark"
                  ? "bg-white text-black shadow-md"
                  : "bg-gray-900 text-white shadow-md"
                : theme === "dark"
                ? "bg-[#151515] text-gray-400 hover:text-gray-200 hover:bg-[#202020]"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
              filter === "completed"
                ? theme === "dark"
                  ? "bg-white text-black shadow-md"
                  : "bg-gray-900 text-white shadow-md"
                : theme === "dark"
                ? "bg-[#151515] text-gray-400 hover:text-gray-200 hover:bg-[#202020]"
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;