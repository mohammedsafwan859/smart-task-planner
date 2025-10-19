import React from 'react';

const FilterBar = ({ searchTerm, setSearchTerm, setStatusFilter, setSortOption }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Search Input */}
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex items-center space-x-4">
        {/* Filter Buttons */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-slate-600">Filter:</span>
          <button onClick={() => setStatusFilter('All')} className="px-3 py-1 text-sm font-medium text-slate-700 rounded hover:bg-slate-200">All</button>
          <button onClick={() => setStatusFilter('Pending')} className="px-3 py-1 text-sm font-medium text-slate-700 rounded hover:bg-slate-200">Pending</button>
          <button onClick={() => setStatusFilter('Completed')} className="px-3 py-1 text-sm font-medium text-slate-700 rounded hover:bg-slate-200">Completed</button>
        </div>

        {/* Sort Dropdown (New) */}
        <div className="flex items-center space-x-2">
           <label htmlFor="sort" className="text-sm font-medium text-slate-600">Sort by:</label>
           <select 
             id="sort"
             onChange={(e) => setSortOption(e.target.value)}
             className="px-3 py-1.5 border border-slate-300 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
           >
             <option value="createdAt-desc">Newest First</option>
             <option value="dueDate-asc">Due Date</option>
             <option value="priority-desc">Priority</option>
           </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
