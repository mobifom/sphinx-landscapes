// apps/frontend/src/app/pages/NotFoundPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Page Not Found | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="text-center max-w-md mx-auto mt-16">
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex justify-center">
          <Button
            as="link"
            to="/"
            variant="primary"
            size="large"
            icon={<FaHome />}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;