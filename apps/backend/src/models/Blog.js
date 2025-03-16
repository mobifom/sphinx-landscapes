// apps/backend/src/models/Blog.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      unique: true
    },
    content: {
      type: String,
      required: [true, 'Blog content is required']
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [300, 'Excerpt cannot be more than 300 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    featuredImage: {
      type: String
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    category: {
      type: String,
      enum: [
        'landscaping-tips',
        'garden-ideas',
        'maintenance',
        'seasonal',
        'projects',
        'trends',
        'company-news',
        'other'
      ],
      default: 'landscaping-tips'
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    publishedAt: {
      type: Date
    },
    isFeature: {
      type: Boolean,
      default: false
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [70, 'Meta title cannot be more than 70 characters']
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'Meta description cannot be more than 160 characters']
    },
    relatedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }

  // Set publishedAt date when post is published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = Date.now();
  }

  next();
});

// Only return published posts by default (unless explicitly asked for drafts)
blogSchema.pre(/^find/, function(next) {
  // Check if 'getAllStatus' flag is set
  if (this.getQuery().getAllStatus) {
    delete this.getQuery().getAll