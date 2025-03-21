// apps/backend/src/routes/blog.js
const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');

// Blog routes will be implemented here
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Blog API endpoint' });
});

module.exports = router;