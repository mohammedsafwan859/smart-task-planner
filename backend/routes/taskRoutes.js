const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// --- Validation Rule for Task Creation ---
const taskValidation = [
  body('title', 'Title is required').not().isEmpty(),
];

// --- Reusable Middleware to Handle Validation Errors ---
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // If there are errors, return the first one as a 400 Bad Request response
  return res.status(400).json({ message: errors.array()[0].msg });
};

// --- Routes with Validation Applied ---

// The GET, PUT, and DELETE routes remain the same.
// The POST route now has the validation middleware.
router.route('/').get(protect, getTasks).post(protect, taskValidation, validate, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;

