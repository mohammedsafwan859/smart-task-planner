import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...task });

  // Update form state if the task prop changes
  useEffect(() => {
    setFormData({ ...task });
  }, [task]);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task._id, formData);
  };

  if (!task) return null;

  return (
    // Modal Backdrop
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input type="text" id="title" value={formData.title} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 w-full p-2 border rounded-md"></textarea>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
            <select id="priority" value={formData.priority} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium">Due Date</label>
            <input type="date" id="dueDate" value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md" />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;