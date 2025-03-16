// apps/frontend/tailwind.config.js
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