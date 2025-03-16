// apps/backend/src/models/Service.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    slug: {
      type: String,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description cannot be more than 200 characters']
    },
    icon: {
      type: String,
      default: 'fa-leaf'
    },
    image: {
      type: String
    },
    features: [
      {
        title: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }
    ],
    benefits: [String],
    faq: [
      {
        question: {
          type: String,
          required: true
        },
        answer: {
          type: String,
          required: true
        }
      }
    ],
    priceRange: {
      min: Number,
      max: Number,
      unit: {
        type: String,
        default: 'per project'
      }
    },
    order: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    category: {
      type: String,
      enum: [
        'design',
        'installation',
        'maintenance',
        'hardscaping',
        'softscaping',
        'irrigation',
        'lighting',
        'other'
      ],
      default: 'other'
    },
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      }
    ],
    seoKeywords: [String],
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, 'SEO description cannot be more than 160 characters']
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from name
serviceSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

// Virtual for portfolio projects using this service
serviceSchema.virtual('portfolioProjects', {
  ref: 'Portfolio',
  localField: '_id',
  foreignField: 'services',
  justOne: false
});

module.exports = mongoose.model('Service', serviceSchema);