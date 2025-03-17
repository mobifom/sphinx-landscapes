// apps/frontend/src/app/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHome, FaTree, FaWater, FaSeedling, FaSun } from 'react-icons/fa';
import { Button } from '../components/common';
import { PageHeader } from '../components/common/PageHeader';
import { ServicesAPI } from '../utils/api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map icons to service types
  const serviceIcons = {
    'landscape-design': <FaLeaf className="text-3xl text-primary mb-4" />,
    'hardscaping': <FaHome className="text-3xl text-primary mb-4" />,
    'planting-gardens': <FaTree className="text-3xl text-primary mb-4" />,
    'irrigation-systems': <FaWater className="text-3xl text-primary mb-4" />,
    'lawn-care': <FaSeedling className="text-3xl text-primary mb-4" />,
    'outdoor-lighting': <FaSun className="text-3xl text-primary mb-4" />,
  };

  // Default icon if none matches
  const defaultIcon = <FaLeaf className="text-3xl text-primary mb-4" />;

  useEffect(() => {
    // Set page title
    document.title = 'Our Services | Sphinx Landscapes';

    // Initialize data fetching
    fetchData();

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch services
      const servicesData = await ServicesAPI.getAllServices();
      setServices(servicesData.data || []);

      // Fetch service categories
      const categoriesData = await ServicesAPI.getCategories();

      // Transform categories data for UI
      const formattedCategories = [
        { id: 'all', name: 'All Services' },
        ...(categoriesData.data || []).map(category => ({
          id: category,
          name: formatCategoryName(category)
        }))
      ];

      setCategories(formattedCategories);
    } catch (err) {
      console.error('Error fetching services data:', err);
      setError('Unable to load services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format category name for display (convert slug to title case)
  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Filter services by category
  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

  // Handle category filter change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 container mx-auto px-4 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg inline-block">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            onClick={fetchData}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <PageHeader
        title="Our Landscaping Services"
        description="We offer comprehensive landscaping solutions to create and maintain beautiful outdoor spaces for homes and businesses."
        bgImage="/assets/images/services/services-header.jpg"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  <Link to={`/services/${service.slug}`} className="block relative aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=Service+Image';
                      }}
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex justify-center">
                      {serviceIcons[service.slug] || defaultIcon}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-center mb-3">
                      <Link to={`/services/${service.slug}`} className="hover:text-primary transition-colors">
                        {service.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-center mb-6">
                      {service.shortDescription}
                    </p>
                    <div className="text-center">
                      <Button
                        as="link"
                        to={`/services/${service.slug}`}
                        variant="outline"
                        size="small"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No services found</h3>
              <p className="text-gray-500">
                Try selecting a different category or check back later for new services.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
            Contact us today to schedule a consultation and take the first step toward your dream outdoor space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              as="link"
              to="/quote"
              variant="white"
              size="large"
            >
              Get a Free Quote
            </Button>
            <Button
              as="link"
              to="/contact"
              variant="outline"
              size="large"
              className="text-white border-white hover:bg-white hover:text-primary"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;