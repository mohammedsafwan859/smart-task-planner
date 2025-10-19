const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getAnalyticsData = async (req, res) => {
  try {
    const userFilter = { user: new mongoose.Types.ObjectId(req.user._id) };

    const totalTasks = await Task.countDocuments(userFilter);
    const completedTasks = await Task.countDocuments({ ...userFilter, status: 'Completed' });
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const priorityData = await Task.aggregate([
      { $match: userFilter },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // --- THIS IS THE FIX FOR THE BAR CHART ---
    // This ensures that all priority levels are always present in the data,
    // even if their count is 0.
    const priorities = ['Low', 'Medium', 'High'];
    const priorityBreakdown = priorities.map(p => {
        const found = priorityData.find(item => item._id === p);
        return { _id: p, count: found ? found.count : 0 };
    }).sort((a,b) => priorities.indexOf(a._id) - priorities.indexOf(b._id)); // Keep a consistent order
    // --- END FIX ---
    
    const statusBreakdown = [
        { name: 'Completed', value: completedTasks, color: '#10B981' },
        { name: 'Pending', value: pendingTasks, color: '#F59E0B' },
    ];

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      priorityBreakdown,
      statusBreakdown
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
};

module.exports = { getAnalyticsData };

