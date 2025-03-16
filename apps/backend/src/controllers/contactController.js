// apps/backend/src/controllers/contactController.js
const Contact = require('../models/Contact');
const { ApiError } = require('../middleware/errorHandler');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc   Create new contact submission
 * @route  POST /api/contact
 * @access Public
 */
exports.createContact = async (req, res, next) => {
  try {
    // Capture IP and user agent
    const ipAddress = req.ip ||
                      req.connection.remoteAddress ||
                      req.socket.remoteAddress ||
                      req.connection.socket.remoteAddress;

    const userAgent = req.headers['user-agent'];

    // Create contact submission
    const contact = await Contact.create({
      ...req.body,
      ipAddress,
      userAgent
    });

    // Send notification email to admin
    try {
      await sendEmail({
        email: process.env.ADMIN_EMAIL || 'info@sphinxlandscapes.com',
        subject: 'New Contact Submission',
        message: `
          New contact form submission from ${contact.name}

          Email: ${contact.email}
          Phone: ${contact.phone || 'Not provided'}
          Subject: ${contact.subject}

          Message:
          ${contact.message}

          Submitted on: ${new Date().toLocaleString()}
        `
      });

      // Send confirmation email to user
      await sendEmail({
        email: contact.email,
        subject: 'We received your message - Sphinx Landscapes',
        message: `
          Dear ${contact.name},

          Thank you for contacting Sphinx Landscapes. We have received your message and will get back to you within 24-48 business hours.

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
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get all contact submissions
 * @route  GET /api/contact
 * @access Private (Admin)
 */
exports.getContacts = async (req, res, next) => {
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
        { message: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('assignedTo', 'name email');

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
      data: contacts
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Get single contact
 * @route  GET /api/contact/:id
 * @access Private (Admin)
 */
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id).populate('assignedTo', 'name email');

    if (!contact) {
      return next(new ApiError(`Contact not found with id ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Update contact
 * @route  PUT /api/contact/:id
 * @access Private (Admin)
 */
exports.updateContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ApiError(`Contact not found with id ${req.params.id}`, 404));
    }

    // Update contact
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc   Delete contact
 * @route  DELETE /api/contact/:id
 * @access Private (Admin)
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ApiError(`Contact not found with id ${req.params.id}`, 404));
    }

    await contact.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};