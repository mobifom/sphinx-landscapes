// apps/backend/src/routes/services.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { ApiError } = require('../middleware/errorHandler');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, featured } = req.query;

    // Build query
    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Only return active services
    query.active = true;

    // Get services
    const services = await Service.find(query)
      .sort({ order: 1, name: 1 })
      .populate('relatedServices', 'name slug');

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get single service by slug
 * @route   GET /api/services/:slug
 * @access  Public
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, active: true })
      .populate('relatedServices', 'name slug image')
      .populate({
        path: 'portfolioProjects',
        select: 'title slug description mainImage category location',
        match: { published: true },
        options: { limit: 3 }
      });

    if (!service) {
      return next(new ApiError(`Service not found with slug ${req.params.slug}`, 404));
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get service categories
 * @route   GET /api/services/categories
 * @access  Public
 */
router.get('/categories/all', async (req, res, next) => {
  try {
    const categories = await Service.distinct('category');

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Private (Admin)
 */
router.post('/', protect, restrictTo('admin'), uploadSingle('image'), async (req, res, next) => {
  try {
    // Add image URL if uploaded
    if (req.fileUrl) {
      req.body.image = req.fileUrl;
    }

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Update service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
router.put('/:id', protect, restrictTo('admin'), uploadSingle('image'), async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return next(new ApiError(`Service not found with id ${req.params.id}`, 404));
    }

    // Add image URL if uploaded
    if (req.fileUrl) {
      req.body.image = req.fileUrl;
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Delete service
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
router.delete('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(new ApiError(`Service not found with id ${req.params.id}`, 404));
    }

    await service.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;