// apps/frontend/src/app/pages/ServiceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaLeaf, FaCheck, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import { Button } from '../components/common';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Mock services data (would normally come from an API)
  const mockServices = {
    'landscape-design': {
      id: 'landscape-design',
      name: 'Landscape Design',
      slug: 'landscape-design',
      description: 'Our landscape design services bring your vision to life with detailed plans that combine beauty and functionality. We take into account your style preferences, property characteristics, and lifestyle needs to create outdoor spaces that exceed your expectations.',
      shortDescription: 'Custom landscape designs tailored to your style and space.',
      icon: 'FaLeaf',
      image: '/assets/images/services/landscape-design.jpg',
      features: [
        {
          title: 'Consultation & Site Analysis',
          description: 'We begin with a thorough assessment of your property and discuss your goals, preferences, and budget to establish the foundation for your design.'
        },
        {
          title: 'Conceptual Design',
          description: 'Our designers create initial sketches and concepts that outline the proposed landscape elements and spatial arrangements.'
        },
        {
          title: 'Detailed Plans',
          description: 'Once the concept is approved, we develop comprehensive design plans including plant selections, hardscape materials, and construction details.'
        },
        {
          title: '3D Visualization',
          description: 'See your landscape before it's built with 3D renderings that provide a realistic preview of the finished project.'
        },
        {
          title: 'Implementation Planning',
          description: 'We create a phased implementation plan that allows for budget-friendly execution over time if desired.'
        }
      ],
      benefits: [
        'Increases property value',
        'Creates outdoor living spaces that extend your home',
        'Ensures cohesive design that complements your architecture',
        'Addresses practical concerns like drainage and maintenance',
        'Provides a detailed roadmap for implementation'
      ],
      faq: [
        {
          question: 'How long does the design process take?',
          answer: 'The design process typically takes 3-6 weeks depending on the complexity of the project and the number of revisions needed.'
        },
        {
          question: 'Do I need a design for a small project?',
          answer: 'Even small projects benefit from proper planning. We offer scaled design services appropriate for projects of all sizes.'
        },
        {
          question: 'Can you work with existing landscape elements?',
          answer: 'Absolutely. Our designs can incorporate existing trees, structures, and other elements you wish to keep.'
        },
        {
          question: 'Will you help me select plants that are right for my property?',
          answer: 'Yes. We carefully select plants based on your soil conditions, sun exposure, maintenance preferences, and aesthetic goals.'
        }
      ],
      priceRange: {
        min: 1500,
        max: 5000,
        unit: 'per design'
      },
      category: 'design'
    },
    'hardscaping': {
      id: 'hardscaping',
      name: 'Hardscaping',
      slug: 'hardscaping',
      description: 'Our hardscaping services transform your outdoor space with durable, beautiful structural elements. From patios and walkways to retaining walls and outdoor kitchens, we create the foundation for your landscape that provides both function and aesthetic appeal.',
      shortDescription: 'Create beautiful, functional outdoor living spaces with custom hardscape features.',
      icon: 'FaHome',
      image: '/assets/images/services/hardscaping.jpg',
      features: [
        {
          title: 'Patios & Walkways',
          description: 'Custom designed outdoor living spaces using pavers, natural stone, concrete, or brick.'
        },
        {
          title: 'Retaining Walls',
          description: 'Functional and decorative walls that manage elevation changes and create planting opportunities.'
        },
        {
          title: 'Outdoor Kitchens',
          description: 'Complete outdoor cooking areas with countertops, appliances, and storage solutions.'
        },
        {
          title: 'Fire Features',
          description: 'Custom fire pits and fireplaces that extend the usability of your outdoor space.'
        },
        {
          title: 'Pergolas & Structures',
          description: 'Shade structures, arbors, and pergolas that define spaces and provide comfort.'
        }
      ],
      benefits: [
        'Creates usable outdoor living space',
        'Reduces maintenance needs compared to lawns',
        'Solves drainage and erosion issues',
        'Increases property value',
        'Provides year-round enjoyment of your property'
      ],
      faq: [
        {
          question: 'What materials do you use for hardscaping?',
          answer: 'We work with a variety of materials including concrete pavers, natural stone, brick, concrete, and wood, selecting the best option for your style, budget, and application.'
        },
        {
          question: 'How long do hardscape projects take to complete?',
          answer: 'Project timelines vary based on size and complexity. A simple patio might take 1-2 weeks, while a complete outdoor living space with multiple features could take 4-8 weeks.'
        },
        {
          question: 'Do you handle permits for hardscape projects?',
          answer: 'Yes, we manage the permit process for projects that require local approvals, ensuring all work meets building codes and regulations.'
        },
        {
          question: 'How durable are your hardscape installations?',
          answer: 'Our hardscape features are built to last, with proper foundations and drainage that prevent settling and damage. Many installations can last decades with minimal maintenance.'
        }
      ],
      priceRange: {
        min: 5000,
        max: 50000,
        unit: 'per project'
      },
      category: 'hardscaping'
    }
  };

  // Mock projects data for related projects
  const mockProjects = [
    {
      id: 1,
      title: 'Modern Patio Transformation',
      slug: 'modern-patio-transformation',
      category: 'residential',
      tags: ['hardscaping', 'patio'],
      image: '/assets/images/portfolio/project-2.jpg',
      location: 'Metropolis, NY',
      services: ['hardscaping']
    },
    {
      id: 2,
      title: 'Garden Design for Colonial Home',
      slug: 'garden-design-colonial-home',
      category: 'residential',
      tags: ['landscape-design', 'garden'],
      image: '/assets/images/portfolio/project-3.jpg',
      location: 'Metropolis, NY',
      services: ['landscape-design']
    },
    {
      id: 3,
      title: 'Corporate Headquarters Landscaping',
      slug: 'corporate-headquarters-landscaping',
      category: 'commercial',
      tags: ['landscape-design', 'planting'],
      image: '/assets/images/portfolio/project-4.jpg',
      location: 'Metropolis, NY',
      services: ['landscape-design']
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const serviceData = mockServices[serviceId];
      setService(serviceData);

      if (serviceData) {
        // Find related projects
        const related = mockProjects.filter(
          project => project.services.includes(serviceId)
        ).slice(0, 3);

        setRelatedProjects(related);
      }

      setLoading(false);
    }, 800);

    // Set page title and scroll to top
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="py-20 container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for does not exist or has been removed.</p>
          <Link to="/services" className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-16 pb-20">
      {/* Hero Section */}
      <section
        className="pt-20 pb-16 bg-primary bg-opacity-5 relative"
        style={{
          backgroundImage: `url(${service.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-white text-opacity-90 mb-8">
              {service.shortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="link"
                to="/quote"
                variant="white"
                size="large"
              >
                Request a Quote
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
        </div>
      </section>

      {/* Service Description */}
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
                {service.features.map((feature, index) => (
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

              {/* FAQ Section */}
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
                    {service.category}
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

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-semibold mb-12 text-center">
              Related Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/portfolio/${project.slug}`} className="block relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
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