#!/bin/bash
# Sphinx Landscapes - Complete Project Setup Script

# Exit on error
set -e

echo "🌱 Starting Sphinx Landscapes project setup..."

# Create project directory
echo "Creating project directory..."
mkdir -p sphinx-landscapes
cd sphinx-landscapes

# Initialize git repository
echo "Initializing git repository..."
git init

# Create package.json
echo "Creating package.json..."
cat > package.json << 'EOL'
{
  "name": "sphinx-landscapes",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "libs/*"
  ],
  "scripts": {
    "start:frontend": "cd apps/frontend && npm start",
    "start:backend": "cd apps/backend && npm run dev",
    "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\"",
    "build:frontend": "cd apps/frontend && npm run build",
    "build:backend": "cd apps/backend && npm run build",
    "build": "npm run build:frontend && npm run build:backend",
    "test": "npm run test:frontend && npm run test:backend",
    "test:frontend": "cd apps/frontend && npm test",
    "test:backend": "cd apps/backend && npm test"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
EOL

# Create directory structure
echo "Creating directory structure..."
mkdir -p apps/frontend/src/{app/{components/{common,home,services,portfolio,about,contact,quote,blog},pages,hooks,context,utils},assets/{images,icons,fonts},styles}
mkdir -p apps/backend/src/{controllers,middleware,models,routes,utils,config}
mkdir -p libs/shared/src/{types,utils}

# Frontend setup
echo "Setting up frontend application..."
cat > apps/frontend/package.json << 'EOL'
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.4.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.10.1",
    "react-router-dom": "^6.14.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "open-props": "^1.5.10",
    "postcss": "^8.4.25",
    "tailwindcss": "^3.3.2"
  }
}
EOL

# Create .env files
cat > apps/frontend/.env.development << 'EOL'
REACT_APP_API_URL=http://localhost:4000/api
EOL

cat > apps/frontend/.env.production << 'EOL'
REACT_APP_API_URL=/api
EOL

# Create tailwind.config.js
cat > apps/frontend/tailwind.config.js << 'EOL'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6B8F71', // Light green
          DEFAULT: '#4A6E50', // Medium green
          dark: '#2F4A36', // Dark green
        },
        secondary: {
          light: '#D6C7B8', // Light stone
          DEFAULT: '#B5A79A', // Medium stone
          dark: '#8C7D6D', // Dark stone
        },
        accent: {
          light: '#F0C457', // Light gold
          DEFAULT: '#E6AB22', // Medium gold
          dark: '#C48E0E', // Dark gold
        },
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/images/hero-background.jpg')",
        'texture': "url('/assets/images/texture.png')",
      },
    },
  },
  plugins: [],
};
EOL

# Create postcss.config.js
cat > apps/frontend/postcss.config.js << 'EOL'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOL

# Create open-props-custom.css
cat > apps/frontend/src/styles/open-props-custom.css << 'EOL'
@import 'open-props/style';
@import 'open-props/normalize';

:root {
  /* Custom surface colors */
  --surface-1: var(--stone-1);
  --surface-2: var(--stone-2);
  --surface-3: var(--stone-3);
  --surface-4: var(--stone-4);

  /* Brand colors */
  --brand-light: var(--green-3);
  --brand: var(--green-6);
  --brand-dark: var(--green-8);

  /* Accent colors */
  --accent-light: var(--yellow-3);
  --accent: var(--yellow-6);
  --accent-dark: var(--yellow-8);

  /* Font settings */
  --font-heading: 'Merriweather', serif;
  --font-body: 'Open Sans', sans-serif;

  /* Custom animations */
  --animation-fade-in: fade-in 0.5s var(--ease-in-out-3);
  --animation-slide-in: slide-in 0.5s var(--ease-in-out-3);

  /* Custom shadows */
  --shadow-soft: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-elevation: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* Custom animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Utility classes */
.container {
  width: 100%;
  max-width: var(--size-xl);
  margin-inline: auto;
  padding-inline: var(--size-3);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--size-5);
  }
}
EOL

# Create main CSS file
cat > apps/frontend/src/styles/main.css << 'EOL'
@import './open-props-custom.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: var(--font-body);
    color: var(--gray-9);
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    color: var(--gray-10);
    line-height: 1.2;
  }

  h1 {
    font-size: var(--font-size-8);
    font-weight: var(--font-weight-8);
  }

  h2 {
    font-size: var(--font-size-7);
    font-weight: var(--font-weight-7);
  }

  h3 {
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-7);
  }

  p {
    line-height: 1.6;
    margin-bottom: var(--size-3);
  }

  a {
    color: var(--brand);
    text-decoration: none;
    transition: color 0.2s var(--ease-out-2);
  }

  a:hover {
    color: var(--brand-dark);
    text-decoration: underline;
  }
}

@layer components {
  /* Custom components combining Tailwind and Open Props */
  .sphinx-btn {
    @apply px-6 py-3 rounded-md font-medium transition-all duration-300;
    box-shadow: var(--shadow-2);
  }

  .sphinx-btn-primary {
    @apply bg-primary text-white;
  }

  .sphinx-btn-primary:hover {
    @apply bg-primary-dark;
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
  }

  .sphinx-btn-secondary {
    @apply bg-secondary text-gray-800;
  }

  .sphinx-btn-secondary:hover {
    @apply bg-secondary-dark;
    transform: translateY(-2px);
    box-shadow: var(--shadow-3);
  }

  .sphinx-card {
    @apply p-6 rounded-lg bg-white;
    box-shadow: var(--shadow-2);
    transition: transform 0.3s var(--ease-out-3), box-shadow 0.3s var(--ease-out-3);
  }

  .sphinx-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-4);
  }

  .section-padding {
    @apply py-16 md:py-24;
  }

  .container-padding {
    @apply px-4 md:px-8;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .animate-fade-in {
    animation: var(--animation-fade-in);
  }

  .animate-slide-in {
    animation: var(--animation-slide-in);
  }
}
EOL

# Create index.html
cat > apps/frontend/public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#4A6E50" />
    <meta
      name="description"
      content="Sphinx Landscapes - Professional landscaping services for your home and business"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <title>Sphinx Landscapes | Expert Landscaping Services</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

# Create entry point files
cat > apps/frontend/src/index.js << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

cat > apps/frontend/src/app/App.jsx << 'EOL'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar will be here */}
        <div className="flex-grow">
          <AppRoutes />
        </div>
        {/* Footer will be here */}
      </div>
    </Router>
  );
}

export default App;
EOL

cat > apps/frontend/src/app/routes.jsx << 'EOL'
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components as they are created
// import HomePage from './pages/HomePage';
// import NotFoundPage from './pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      {/* Add other routes as they are implemented */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
EOL

# Backend setup
echo "Setting up backend application..."
cat > apps/backend/package.json << 'EOL'
{
  "name": "backend",
  "version": "0.1.0",
  "private": true,
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "build": "tsc",
    "dev": "nodemon --exec ts-node src/server.ts",
    "test": "jest"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.1",
    "mongoose": "^7.3.2",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.3"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/cookie-parser": "^1.4.3",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.3",
    "@types/jsonwebtoken": "^9.0.2",
    "@types/multer": "^1.4.7",
    "@types/node": "^20.4.1",
    "@types/nodemailer": "^6.4.8",
    "jest": "^29.6.1",
    "nodemon": "^2.0.22",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.6"
  }
}
EOL

# Create TypeScript config for backend
cat > apps/backend/tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
EOL

# Create server entry point
cat > apps/backend/src/server.ts << 'EOL'
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sphinx_landscapes');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Production setup for serving React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
EOL

# Create .env files for backend
cat > apps/backend/.env.development << 'EOL'
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sphinx_landscapes
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
EOL

cat > apps/backend/.env.production << 'EOL'
PORT=4000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/sphinx_landscapes
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
EOL

# Create .gitignore
cat > .gitignore << 'EOL'
# dependencies
node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files
.env
.env.production

# Uploaded files
/uploads
EOL

# Create README.md
cat > README.md << 'EOL'
# Sphinx Landscapes

A full-stack web application for Sphinx Landscapes, a professional landscaping company.

## Project Structure

This project is organized as a monorepo with the following structure:

```
sphinx-landscapes/
├── apps/
│   ├── frontend/        # React application
│   └── backend/         # Express API
└── libs/
    └── shared/          # Shared utilities and types
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Development

To run the development servers:

```
npm start
```

This will start both the frontend and backend servers concurrently.

### Building for Production

```
npm run build
```

## Technologies

- **Frontend:** React, React Router, Tailwind CSS, Open Props
- **Backend:** Express, MongoDB, Mongoose
- **Authentication:** JWT
EOL

# Create shared library package.json
cat > libs/shared/package.json << 'EOL'
{
  "name": "@sphinx/shared",
  "version": "0.1.0",
  "private": true,
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest"
  },
  "devDependencies": {
    "@types/jest": "^29.5.3",
    "jest": "^29.6.1",
    "ts-jest": "^29.1.1",
    "typescript": "^5.1.6"
  }
}
EOL

# Create TypeScript config for shared library
cat > libs/shared/tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
EOL

# Create shared types
cat > libs/shared/src/types/index.ts << 'EOL'
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  features: Array<{
    title: string;
    description: string;
  }>;
  benefits: string[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  category: string;
  location: string;
  completionDate: Date;
  featured: boolean;
}
EOL

# Create shared utility functions
cat > libs/shared/src/utils/index.ts << 'EOL'
/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Create a slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
EOL

# Install dependencies
echo "Installing dependencies..."
npm install

echo "🎉 Sphinx Landscapes project structure created successfully!"
echo "To start development:"
echo "  cd sphinx-landscapes"
echo "  npm start"
