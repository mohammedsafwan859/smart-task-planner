const Task = require('../models/taskModel');

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;

    if (!title) {
      res.status(400);
      throw new Error('Please add a title');
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      category,
      user: req.user._id, // Assign the task to the logged-in user
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all tasks for a logged-in user
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    // Find only the tasks that belong to the logged-in user
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // --- Security Check ---
    // Make sure the logged-in user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // --- Security Check ---
    if (task.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'Task removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
