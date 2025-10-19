const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // 1. Import the security middleware
const { getAnalyticsData } = require('../controllers/analyticsController');

// 2. Add 'protect' to the route definition.
// This ensures the user must be logged in to access this endpoint.
router.route('/').get(protect, getAnalyticsData);

module.exports = router;

