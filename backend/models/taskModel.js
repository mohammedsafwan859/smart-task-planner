const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // Add this user field
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates a reference to the User model
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // ... rest of the schema remains the same
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'In-Progress', 'Completed'],
    default: 'Pending',
  },
  category: {
    type: String,
    default: 'General'
  },
  dueDate: {
    type: Date,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
