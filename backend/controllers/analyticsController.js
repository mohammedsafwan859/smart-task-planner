const Task = require('../models/taskModel');
const mongoose = require('mongoose');

const getAnalyticsData = async (req, res) => {
  try {
    const userFilter = { user: new mongoose.Types.ObjectId(req.user._id) };

    const totalTasks = await Task.countDocuments(userFilter);
    const completedTasks = await Task.countDocuments({ ...userFilter, status: 'Completed' });
    
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const priorityBreakdown = await Task.aggregate([
      { $match: userFilter },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
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

