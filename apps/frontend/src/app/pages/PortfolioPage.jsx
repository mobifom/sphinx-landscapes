// apps/frontend/src/app/pages/PortfolioPage.jsx
import React, { useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { PortfolioGrid } from '../components/portfolio/PortfolioGrid';

const PortfolioPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Our Portfolio | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHeader
        title="Our Portfolio"
        description="Browse our collection of completed projects and see how we transform outdoor spaces."
        bgImage="/assets/images/portfolio/portfolio-header.jpg"
        breadcrumbs={[{ text: 'Portfolio', link: '/portfolio' }]}
      />

      <PortfolioGrid />
    </main>
  );
};

export default PortfolioPage;