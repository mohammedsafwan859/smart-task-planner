import React from 'react';

const SuggestionDisplay = ({ suggestions, originalTasks, onClear }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  // Create a quick lookup map for task titles
  const taskMap = originalTasks.reduce((map, task) => {
    map[task._id] = task.title;
    return map;
  }, {});

  return (
    <div className="bg-sky-50 border border-sky-200 p-6 rounded-lg shadow-md mb-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-sky-800">✨ AI-Powered Suggestions</h2>
        <button 
            onClick={onClear}
            className="text-sm font-medium text-slate-500 hover:text-slate-800"
        >
            Clear
        </button>
      </div>
      <p className="text-slate-600 mb-4">Here is the most efficient order to tackle your pending tasks:</p>
      <ol className="space-y-3 list-decimal list-inside">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="p-3 bg-white border rounded-md">
            <strong className="text-slate-800">{taskMap[suggestion.taskId]}</strong>
            <p className="text-sm text-slate-500 italic mt-1">
              &ldquo;{suggestion.reason}&rdquo;
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

// Add a simple fade-in animation in the CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default SuggestionDisplay;