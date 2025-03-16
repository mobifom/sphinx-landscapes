// apps/backend/src/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot be more than 2000 characters']
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Inquiry'
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'completed'],
      default: 'new'
    },
    notes: {
      type: String,
      trim: true
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ipAddress: String,
    userAgent: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Contact', contactSchema);