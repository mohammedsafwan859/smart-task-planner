import React from 'react';

const TaskSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg flex items-center justify-between animate-pulse">
      <div className="flex items-center w-full">
        <div className="w-3 h-3 rounded-full bg-slate-200 mr-4"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-6 w-12 bg-slate-200 rounded"></div>
        <div className="h-6 w-12 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

// A component to show multiple skeletons at once
export const TaskListSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse mb-4"></div>
        <TaskSkeleton />
        <TaskSkeleton />
        <TaskSkeleton />
    </div>
);
