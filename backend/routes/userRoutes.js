const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');

// --- Validation Rules ---
const registerValidation = [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
];

const loginValidation = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

const updatePasswordValidation = [
    body('newPassword', 'New password must be 6 or more characters').isLength({ min: 6 })
];

// --- Reusable Middleware to Handle Validation Errors ---
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};


// --- Route Definitions ---

// Public routes for registration and login
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

// Protected routes for managing the user's own profile
// These routes require a valid JWT to be sent in the request header.
router.route('/profile')
  .put(protect, updatePasswordValidation, validate, updateUserProfile) // For updating the password
  .delete(protect, deleteUserProfile); // For deleting the account

module.exports = router;

