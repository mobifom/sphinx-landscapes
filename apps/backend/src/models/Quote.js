// apps/backend/src/models/Quote.js
const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
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
      required: [true, 'Phone number is required'],
      trim: true
    },
    address: {
      street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
      },
      state: {
        type: String,
        required: [true, 'State is required'],
        trim: true
      },
      zip: {
        type: String,
        required: [true, 'ZIP code is required'],
        trim: true
      }
    },
    propertyType: {
      type: String,
      enum: ['residential', 'commercial', 'other'],
      default: 'residential'
    },
    propertySize: {
      type: String,
      enum: ['small', 'medium', 'large', 'extra-large'],
      default: 'medium'
    },
    servicesRequested: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service'
        },
        details: String
      }
    ],
    budget: {
      type: String,
      enum: [
        'under-5000',
        '5000-10000',
        '10000-25000',
        '25000-50000',
        '50000-100000',
        'above-100000',
        'unsure'
      ]
    },
    timeframe: {
      type: String,
      enum: [
        'asap',
        'within-30-days',
        'within-3-months',
        'within-6-months',
        'flexible'
      ],
      default: 'flexible'
    },
    description: {
      type: String,
      trim: true
    },
    attachments: [
      {
        type: String // File paths
      }
    ],
    status: {
      type: String,
      enum: [
        'new',
        'reviewing',
        'site-visit-scheduled',
        'quote-prepared',
        'sent',
        'accepted',
        'declined',
        'completed'
      ],
      default: 'new'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    estimatedCost: {
      type: Number
    },
    finalQuote: {
      type: String // Path to PDF quote
    },
    notes: {
      type: String,
      trim: true
    },
    hearAboutUs: {
      type: String,
      trim: true
    },
    siteVisitDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Quote', quoteSchema);