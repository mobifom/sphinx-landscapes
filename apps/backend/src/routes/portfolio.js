// apps/backend/src/routes/portfolio.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { ApiError } = require('../middleware/errorHandler');
const { protect, restrictTo } = require('../middleware/auth');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');

/**
 * @desc    Get all portfolio projects
 * @route   GET /api/portfolio
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { category, featured } = req.query;

    // Build query
    const query = { published: true };

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Filter by featured
    if (featured === 'true') {
      query.featured = true;
    }

    // Get projects
    const projects = await Portfolio.find(query)
      .sort({ createdAt: -1 })
      .populate('services', 'name slug');

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get single portfolio project by slug
 * @route   GET /api/portfolio/:slug
 * @access  Public
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const project = await Portfolio.findOne({ slug: req.params.slug, published: true })
      .populate('services', 'name slug description');

    if (!project) {
      return next(new ApiError(`Project not found with slug ${req.params.slug}`, 404));
    }

    // Get related projects based on the same category or services
    const relatedProjects = await Portfolio.find({
      _id: { $ne: project._id },
      published: true,
      $or: [
        { category: project.category },
        { services: { $in: project.services.map(s => s._id) } }
      ]
    })
    .limit(3)
    .select('title slug description mainImage category location');

    // Add related projects to the response
    const response = {
      ...project.toObject(),
      relatedProjects
    };

    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @desc    Get portfolio categories
 * @route   GET /api/portfolio/categories
 * @access  Public
 */
router.get('/categories/all', async (req, res, next) => {
  try {
    const categories = await Portfolio.distinct('category', { published: true });

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
 * @desc    Create new portfolio project
 * @route   POST /api/portfolio
 * @access  Private (Admin)
 */
router.post('/',
  protect,
  restrictTo('admin'),
  uploadSingle('mainImage'),
  uploadMultiple('images', 10),
  async (req, res, next) => {
    try {
      // Add main image URL if uploaded
      if (req.fileUrl) {
        req.body.mainImage = req.fileUrl;
      }

      // Add gallery images if uploaded
      if (req.fileUrls) {
        req.body.images = req.fileUrls;
      }

      const project = await Portfolio.create(req.body);

      res.status(201).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Update portfolio project
 * @route   PUT /api/portfolio/:id
 * @access  Private (Admin)
 */
router.put('/:id',
  protect,
  restrictTo('admin'),
  uploadSingle('mainImage'),
  uploadMultiple('images', 10),
  async (req, res, next) => {
    try {
      let project = await Portfolio.findById(req.params.id);

      if (!project) {
        return next(new ApiError(`Project not found with id ${req.params.id}`, 404));
      }

      // Add main image URL if uploaded
      if (req.fileUrl) {
        req.body.mainImage = req.fileUrl;
      }

      // Add gallery images if uploaded
      if (req.fileUrls) {
        // Append new images to existing ones
        req.body.images = [...project.images, ...req.fileUrls];
      }

      project = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @desc    Delete portfolio project
 * @route   DELETE /api/portfolio/:id
 * @access  Private (Admin)
 */
router.delete('/:id', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return next(new ApiError(`Project not found with id ${req.params.id}`, 404));
    }

    await project.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;