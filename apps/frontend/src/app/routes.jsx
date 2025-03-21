// apps/frontend/src/app/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuotePage from './pages/QuotePage';
import NotFoundPage from './pages/NotFoundPage';

// These pages would be implemented next
import PortfolioPage from './pages/PortfolioPage';
 import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/quote" element={<QuotePage />} />

      {/* These routes would be added as the corresponding pages are implemented */}
      <Route path="/portfolio" element={<PortfolioPage />} />
      {<Route path="/portfolio/:projectId" element={<ProjectDetailPage />} /> }
      { <Route path="/blog" element={<BlogPage />} /> }
      {<Route path="/blog/:postId" element={<BlogPostPage />} /> }
      {<Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> }
      {<Route path="/terms-of-service" element={<TermsOfServicePage />} /> }

      {/* 404 Route - Always keep this last */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;