// apps/backend/src/routes/contact.js
const express = require('express');
const router = express.Router();
const { createContact, getContacts, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const { protect, restrictTo } = require('../middleware/auth');

// Public route for creating contact submissions
router.post('/', createContact);

// Protected routes for admin operations
router.get('/', protect, restrictTo('admin'), getContacts);
router.get('/:id', protect, restrictTo('admin'), getContact);
router.put('/:id', protect, restrictTo('admin'), updateContact);
router.delete('/:id', protect, restrictTo('admin'), deleteContact);

module.exports = router;