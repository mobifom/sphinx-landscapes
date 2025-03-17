// apps/backend/src/routes/quote.js
const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { ApiError } = require('../middleware/errorHandler');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Submit a quote request
 * @route   POST /api/quote
 * @access  Public
 */
router.post('/', uploadMultiple('attachments', 5), async (req, res, next) => {
  try {
    // Capture IP and user agent
    const ipAddress = req.ip ||
                      req.connection.remoteAddress ||
                      req.socket.remoteAddress ||
                      req.connection.socket.remoteAddress;

    const userAgent = req.headers['user-agent'];

    // Add attachments if uploaded
    if (req.fileUrls) {
      req.body.attachments = req.fileUrls;
    }

    // Create quote request
    const quote = await Quote.create({
      ...req.body,
      ipAddress,
      userAgent,
      status: 'new'
    });

    // Send notification email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || 'info@sphinxlandscapes.com',
        subject: 'New Quote Request',
        message: `
          New quote request from ${quote.name}

          Email: ${quote.email}
          Phone: ${quote.phone}
          Address: ${quote.address.street}, ${quote.address.city}, ${quote.address.state} ${quote.address.zip}
          Property Type: ${quote.propertyType}
          Services Requested: ${quote.servicesRequested.map(s => s.service).join(', ')}
          Budget: ${quote.budget}
          Timeframe: ${quote.timeframe}

          Project Description:
          ${quote.description}

          Submitted on: ${new Date().toLocaleString()}
        `
      });

      // Send confirmation email to customer
      await sendEmail({
        email: quote.email,
        subject: 'Quote Request Received - Sphinx Landscapes',
        message: `
          Dear ${quote.name},

          Thank you for requesting a quote from Sphinx Landscapes. We have received your request and will review it shortly.

          A member of our team will contact you within 1-2 business days to discuss your project further.

          For urgent matters, please call us at (555) 123-4567.

          Best regards,
          The Sphinx Landscapes Team
        `
      });
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
      // Continue processing - don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get all quote requests
 * @route   GET /api/quote
 * @access  Private (Admin)
 */
router.get('/', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Search by name or email
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const total = await Quote.countDocuments(query);
    const quotes = await Quote.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('assignedTo', 'name email')
      .populate('servicesRequested.service', 'name');

    // Pagination result
    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };

    res.status(200).json({
      success: true,
      pagination,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get single quote request
 * @route   GET /api/quote/:id
 * @access  Private (Admin)
 */
router.get('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('servicesRequested.service', 'name slug');

    if (!quote) {
      return next(new ApiError(`Quote request not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Update quote request
 * @route   PUT /api/quote/:id
 * @access  Private (Admin)
 */
router.put('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) {
      return next(new ApiError(`Quote request not found with id ${req.params.id}`, 404));
    }

    // Status change notification
    if (req.body.status && req.body.status !== quote.status) {
      const statusChanges = {
        'reviewing': 'We are currently reviewing your quote request.',
        'site-visit-scheduled': 'A site visit has been scheduled.',
        'quote-prepared': 'Your quote has been prepared and will be sent to you shortly.',
        'sent': 'Your quote has been sent to your email.',
        'accepted': 'Thank you for accepting our quote. We look forward to working with you!',
        'declined': 'We regret that our quote was not accepted. Please contact us if you have any questions.',
        'completed': 'Your project has been marked as completed. Thank you for choosing Sphinx Landscapes!'
      };

      if (statusChanges[req.body.status]) {
        try {
          await sendEmail({
            email: quote.email,
            subject: `Quote Request Update - Sphinx Landscapes`,
            message: `
              Dear ${quote.name},

              ${statusChanges[req.body.status]}

              If you have any questions, please call us at (555) 123-4567 or reply to this email.

              Best regards,
              The Sphinx Landscapes Team
            `
          });
        } catch (emailErr) {
          console.error('Status update email failed:', emailErr);
        }
      }
    }

    // Update quote
    quote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('assignedTo', 'name email')
    .populate('servicesRequested.service', 'name slug');

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Delete quote request
 * @route   DELETE /api/quote/:id
 * @access  Private (Admin)
 */
router.delete('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return next(new ApiError(`Quote request not found with id ${req.params.id}`, 404));
    }

    await quote.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;