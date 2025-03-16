// apps/backend/src/models/Portfolio.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    slug: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [200, 'Summary cannot be more than 200 characters']
    },
    location: {
      type: String,
      trim: true
    },
    client: {
      type: String,
      trim: true
    },
    completionDate: {
      type: Date
    },
    mainImage: {
      type: String,
      required: [true, 'Main project image is required']
    },
    images: [
      {
        type: String
      }
    ],
    beforeImages: [
      {
        type: String
      }
    ],
    afterImages: [
      {
        type: String
      }
    ],
    featured: {
      type: Boolean,
      default: false
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ],
    testimonial: {
      text: String,
      author: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    },
    highlights: [String],
    challenges: String,
    solutions: String,
    published: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      enum: [
        'residential',
        'commercial',
        'municipal',
        'garden',
        'patio',
        'water-feature',
        'other'
      ],
      default: 'residential'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from title
portfolioSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Virtual for project duration in weeks
portfolioSchema.virtual('durationWeeks').get(function() {
  if (!this.startDate || !this.completionDate) return null;

  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  const durationMs = this.completionDate - this.startDate;
  return Math.floor(durationMs / millisecondsPerWeek);
});

module.exports = mongoose.model('Portfolio', portfolioSchema);