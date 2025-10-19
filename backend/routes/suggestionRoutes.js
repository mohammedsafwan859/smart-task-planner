const express = require('express');
const router = express.Router();
const { generateSuggestions } = require('../controllers/suggestionController');

router.route('/').post(generateSuggestions);

module.exports = router;