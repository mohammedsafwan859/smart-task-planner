import React from 'react';

const priorityColorMap = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
  default: 'bg-slate-400'
};

const TaskList = ({ tasks, onDeleteTask, onToggleTaskStatus, onOpenEditModal }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-slate-700">No tasks found!</h2>
        <p className="text-slate-500 mt-2">Try adjusting your filters or add a new task above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">My Tasks ({tasks.length})</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task._id} className="p-4 border rounded-lg flex items-center justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-center flex-1 min-w-0">
              <span className={`w-3 h-3 rounded-full mr-4 shrink-0 ${priorityColorMap[task.priority] || priorityColorMap.default}`}></span>
              <div className="min-w-0">
                <p className={`font-semibold truncate ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                  {task.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {task.category || 'General'} &bull; Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 shrink-0 ml-4">
               <button 
                onClick={() => onOpenEditModal(task)}
                className="px-3 py-1 text-sm font-medium text-sky-600 rounded hover:bg-sky-100">
                Edit
              </button>
              <button
                onClick={() => onToggleTaskStatus(task._id)}
                className={`px-3 py-1 text-sm font-medium rounded ${
                  task.status === 'Completed'
                    ? 'text-gray-500 hover:bg-gray-100'
                    : 'text-green-600 hover:bg-green-100'
                }`}
              >
                {task.status === 'Completed' ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => onDeleteTask(task._id)}
                className="px-3 py-1 text-sm font-medium text-red-600 rounded hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

