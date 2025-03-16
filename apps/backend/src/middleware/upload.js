// apps/backend/src/middleware/upload.js
const multer = require('multer');
const path = require('path');
const { ApiError } = require('./errorHandler');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    // Create unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError('Only image files are allowed!', 400), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware for single file upload
exports.uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.single(fieldName);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during upload
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new ApiError('File size too large. Maximum size is 5MB', 400));
          }
        }
        return next(err);
      }

      // If no file was uploaded
      if (!req.file) {
        return next();
      }

      // Add file URL to the request
      req.fileUrl = `/uploads/${req.file.filename}`;
      next();
    });
  };
};

// Middleware for multiple file upload
exports.uploadMultiple = (fieldName, maxCount = 5) => {
  return (req, res, next) => {
    const uploadMiddleware = upload.array(fieldName, maxCount);

    uploadMiddleware(req, res, (err) => {
      if (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during upload
          if (err.code === 'LIMIT_FILE_SIZE') {
            return next(new ApiError('File size too large. Maximum size is 5MB', 400));
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return next(new ApiError(`Too many files. Maximum is ${maxCount}`, 400));
          }
        }
        return next(err);
      }

      // If no files were uploaded
      if (!req.files || req.files.length === 0) {
        return next();
      }

      // Add file URLs to the request
      req.fileUrls = req.files.map(file => `/uploads/${file.filename}`);
      next();
    });
  };
};