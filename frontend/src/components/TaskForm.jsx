import React, { useState } from 'react';
import toast from 'react-hot-toast';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      toast.error('Task title is required.');
      return;
    }
    onAddTask({ title, description, priority, category, dueDate });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('');
    setDueDate('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Add a New Task</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
          <input 
            type="text" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g., Deploy the new feature" 
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" 
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
          <textarea 
            id="description" 
            rows="3" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Add a more detailed description..." 
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Priority</label>
          <select 
            id="priority" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700">Due Date</label>
          <input 
            type="date" 
            id="dueDate" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" 
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category</label>
          <input 
            type="text" 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="e.g., Work, Personal" 
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" 
          />
        </div>
        <div className="md:col-span-2 text-right">
          <button 
            type="submit" 
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

