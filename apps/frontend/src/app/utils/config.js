// apps/frontend/src/app/utils/config.js

/**
 * API configuration with environment-specific settings
 */
const config = {
  // Base API URL based on environment
  apiUrl:
  // Try to access env variables that Nx/webpack would inject
  (typeof window !== 'undefined' && window.ENV && window.ENV.API_URL) ||
  // Or fall back to default
  '/api',
  // Default timeout for API requests (milliseconds)
  requestTimeout: 30000,

  // Default headers for API requests
  defaultHeaders: {
    'Content-Type': 'application/json',
  },

  // Authentication settings
  auth: {
    // Local storage key for storing JWT token
    tokenKey: 'sphinx_auth_token',

    // Token expiration handling
    refreshBeforeExpiry: 5 * 60 * 1000, // Refresh token 5 minutes before expiry
  },

  // Error handling settings
  errorHandling: {
    // Whether to show generic error messages for API failures
    useGenericMessages: false,

    // Generic error message text
    genericErrorMessage: 'An unexpected error occurred. Please try again later.',
  },
};

export default config;