// apps/frontend/src/app/pages/ServiceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheck, FaTools, FaRegLightbulb, FaRegClock, FaRegSmile, FaQuestionCircle, FaArrowRight, FaLeaf } from 'react-icons/fa';
import { Button } from '../components/common';
import { PageHeader } from '../components/common/PageHeader';
import { ServicesAPI } from '../utils/api';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch service data when component mounts or serviceId changes
    fetchServiceData();

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [serviceId]);

  const fetchServiceData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ServicesAPI.getServiceBySlug(serviceId);

      if (response && response.data) {
        // Set page title
        document.title = `${response.data.name} | Sphinx Landscapes`;

        setService(response.data);
      } else {
        // If no data is returned, handle as not found
        setError('Service not found');
      }
    } catch (err) {
      console.error(`Error fetching service with slug ${serviceId}:`, err);
      if (err.originalError && err.originalError.response && err.originalError.response.status === 404) {
        setError('Service not found');
      } else {
        setError('Unable to load service details. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
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
      <div className="py-20 container mx-auto px-4">
        <div className={error === 'Service not found' ? 'text-center' : 'bg-red-50 text-red-700 p-6 rounded-lg'}>
          <h2 className="text-2xl font-heading font-semibold mb-4">
            {error === 'Service not found' ? 'Service Not Found' : 'Error'}
          </h2>
          <p className="text-gray-600 mb-8">
            {error === 'Service not found'
              ? 'The service you're looking for does not exist or has been removed.'
              : error
            }
          </p>
          {error === 'Service not found' ? (
            <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors">
              View All Services
            </Link>
          ) : (
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              onClick={fetchServiceData}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-2xl font-heading font-semibold mb-4">Service Not Found</h2>
        <p className="text-gray-600 mb-8">The service you're looking for does not exist or has been removed.</p>
        <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors">
          View All Services
        </Link>
      </div>
    );
  }

  return (
    <main>
      <PageHeader
        title={service.name}
        description={service.shortDescription}
        bgImage={service.image}
        breadcrumbs={[
          { text: 'Services', link: '/services' },
          { text: service.name, link: `/services/${service.slug}` }
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-semibold mb-6">
                About Our {service.name} Services
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                {service.description}
              </p>

              <h3 className="text-2xl font-heading font-semibold mb-6">
                What We Offer
              </h3>

              <div className="space-y-8 mb-12">
                {service.features && service.features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="bg-primary-light bg-opacity-20 p-3 rounded-full">
                        <FaLeaf className="text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {service.benefits && service.benefits.length > 0 && (
                <>
                  <h3 className="text-2xl font-heading font-semibold mb-6">
                    Why Choose Our Services
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <FaCheck className="text-primary mt-1" />
                        </div>
                        <p>{benefit}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {service.faq && service.faq.length > 0 && (
                <>
                  <h3 className="text-2xl font-heading font-semibold mb-6">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-6 mb-8">
                    {service.faq.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6">
                        <h4 className="text-lg font-medium mb-2 flex items-start">
                          <FaQuestionCircle className="text-primary mt-1 mr-2 flex-shrink-0" />
                          {item.question}
                        </h4>
                        <p className="text-gray-600 pl-7">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-heading font-semibold mb-6 pb-4 border-b border-gray-200">
                  Service Details
                </h3>

                {service.priceRange && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Price Range</h4>
                    <p className="text-gray-700">
                      ${service.priceRange.min.toLocaleString()} - ${service.priceRange.max.toLocaleString()} {service.priceRange.unit}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-2">Category</h4>
                  <p className="text-gray-700 capitalize">
                    {service.category.replace(/-/g, ' ')}
                  </p>
                </div>

                <div className="mt-8">
                  <Button
                    as="link"
                    to="/quote"
                    variant="primary"
                    size="large"
                    fullWidth
                    className="mb-3"
                  >
                    Request a Quote
                  </Button>

                  <Button
                    as="link"
                    to="/contact"
                    variant="outline"
                    size="large"
                    fullWidth
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects Section */}
      {service.portfolioProjects && service.portfolioProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold mb-12 text-center">
              Related Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.portfolioProjects.map((project) => (
                <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/portfolio/${project.slug}`} className="block relative aspect-video overflow-hidden">
                    <img
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                      }}
                    />
                  </Link>

                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold mb-2">
                      <Link to={`/portfolio/${project.slug}`} className="hover:text-primary transition-colors">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{project.location}</p>
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      View Details <FaArrowRight className="ml-2" size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                as="link"
                to="/portfolio"
                variant="primary"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </section>
      )}

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

export default ServiceDetailPage;