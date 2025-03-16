// apps/backend/src/utils/validation.js
/**
 * Validator for email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

/**
 * Validator for phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.isValidPhone = (phone) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};

/**
 * Validator for password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result
 */
exports.validatePassword = (password) => {
  const result = {
    isValid: true,
    errors: []
  };

  if (!password || password.length < 8) {
    result.isValid = false;
    result.errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    result.isValid = false;
    result.errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    result.isValid = false;
    result.errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    result.isValid = false;
    result.errors.push('Password must contain at least one number');
  }

  return result;
};

/**
 * Validator for ZIP code format
 * @param {string} zipCode - ZIP code to validate
 * @returns {boolean} - True if valid, false otherwise
 */
exports.isValidZipCode = (zipCode) => {
  const zipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  return zipRegex.test(zipCode);
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate form inputs
 * @param {object} inputs - Form inputs to validate
 * @param {object} rules - Validation rules
 * @returns {object} - Validation result
 */
exports.validateForm = (inputs, rules) => {
  const result = {
    isValid: true,
    errors: {}
  };

  // Loop through each rule
  Object.keys(rules).forEach(field => {
    const fieldRules = rules[field];
    const value = inputs[field];

    // Check required
    if (fieldRules.required && (!value || value.trim() === '')) {
      result.isValid = false;
      result.errors[field] = `${field} is required`;
      return; // Skip other validations if required fails
    }

    // Skip validations if field is not required and empty
    if (!fieldRules.required && (!value || value.trim() === '')) {
      return;
    }

    // Check min length
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      result.isValid = false;
      result.errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    }

    // Check max length
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      result.isValid = false;
      result.errors[field] = `${field} cannot be more than ${fieldRules.maxLength} characters`;
    }

    // Check email format
    if (fieldRules.isEmail && !exports.isValidEmail(value)) {
      result.isValid = false;
      result.errors[field] = `${field} must be a valid email address`;
    }

    // Check phone format
    if (fieldRules.isPhone && !exports.isValidPhone(value)) {
      result.isValid = false;
      result.errors[field] = `${field} must be a valid phone number`;
    }

    // Check zip code format
    if (fieldRules.isZipCode && !exports.isValidZipCode(value)) {
      result.isValid = false;
      result.errors[field] = `${field} must be a valid ZIP code`;
    }

    // Check custom validator
    if (fieldRules.validator && typeof fieldRules.validator === 'function') {
      const validatorResult = fieldRules.validator(value);
      if (!validatorResult.isValid) {
        result.isValid = false;
        result.errors[field] = validatorResult.message || `${field} is invalid`;
      }
    }
  });

  return result;
};