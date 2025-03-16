// apps/frontend/src/app/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { Hero, FeaturedServices } from '../components/home';

const HomePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Sphinx Landscapes - Expert Landscaping Services';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedServices />
      {/* Additional home page sections will be added here */}
    </main>
  );
};

export default HomePage;