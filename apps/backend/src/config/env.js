// apps/backend/src/config/env.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on environment
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : process.env.NODE_ENV === 'test'
  ? '.env.test'
  : '.env.development';

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Default environment variables
const defaultEnvVars = {
  PORT: 4000,
  NODE_ENV: 'development',
  JWT_SECRET: 'sphinx_landscapes_secret_key',
  JWT_EXPIRES_IN: '7d',
  MONGODB_URI: 'mongodb://localhost:27017/sphinx_landscapes',
  EMAIL_SERVICE: 'gmail',
  EMAIL_USER: 'no-reply@sphinxlandscapes.com',
  EMAIL_PASS: 'your_email_password',
  CLIENT_URL: 'http://localhost:4200'
};

// Set default environment variables if not set
Object.entries(defaultEnvVars).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = value;
  }
});

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];

requiredEnvVars.forEach(variable => {
  if (!process.env[variable]) {
    console.error(`Missing required environment variable: ${variable}`);
    process.exit(1);
  }
});