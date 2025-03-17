// apps/frontend/src/app/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common';
import { BeforeAfterSlider } from '../components/portfolio/BeforeAfterSlider';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock project data (would normally come from an API)
  const mockProjects = [
    {
      id: 1,
      title: 'Modern Backyard Transformation',
      slug: 'modern-backyard-transformation',
      description: 'A complete backyard redesign featuring a contemporary patio, fire pit area, and native plantings that create a perfect outdoor living space for entertaining and relaxation.',
      summary: 'Contemporary backyard redesign with entertainment features and sustainable elements.',
      location: 'Metropolis, NY',
      client: 'The Thompson Family',
      completionDate: '2023-04-15',
      mainImage: '/assets/images/portfolio/project-1.jpg',
      images: [
        '/assets/images/portfolio/project-1.jpg',
        '/assets/images/portfolio/project-1-2.jpg',
        '/assets/images/portfolio/project-1-3.jpg',
        '/assets/images/portfolio/project-1-4.jpg'
      ],
      beforeImages: [
        '/assets/images/portfolio/project-1-before-1.jpg',
        '/assets/images/portfolio/project-1-before-2.jpg'
      ],
      afterImages: [
        '/assets/images/portfolio/project-1-after-1.jpg',
        '/assets/images/portfolio/project-1-after-2.jpg'
      ],
      featured: true,
      services: [
        {
          id: 'landscape-design',
          name: 'Landscape Design'
        },
        {
          id: 'hardscaping',
          name: 'Hardscaping'
        },
        {
          id: 'planting-gardens',
          name: 'Planting & Gardens'
        }
      ],
      testimonial: {
        text: 'Sphinx Landscapes transformed our ordinary backyard into an extraordinary outdoor living space that has become the heart of our home during the warm months. Their design perfectly captured our modern aesthetic while incorporating low-maintenance plants that thrive in our environment. The team was professional, detail-oriented, and a pleasure to work with throughout the entire process.',
        author: 'Jennifer Thompson',
        rating: 5
      },
      highlights: [
        'Custom concrete patio with modern pavers',
        'Stainless steel gas fire pit with glass surround',
        'Native plant garden with drip irrigation system',
        'LED landscape lighting for evening enjoyment',
        'Natural stone pathways connecting different areas'
      ],
      challenges: 'The property presented drainage challenges due to its sloped terrain. Additionally, the clients wanted a modern design that would still complement their traditional home architecture and incorporate existing mature trees.',
      solutions: 'We implemented a comprehensive drainage solution including a dry creek bed that doubles as a landscape feature. The design bridges modern and traditional elements through material selection and layout. Existing trees were preserved and integrated into the new design with careful protection during construction and incorporating them as focal points.',
      category: 'residential'
    },
    {
      id: 2,
      title: 'Commercial Plaza Renovation',
      slug: 'commercial-plaza-renovation',
      description: 'A comprehensive renovation of a tired commercial plaza, transforming it into an inviting space with sustainable landscaping, improved traffic flow, and appealing gathering areas for visitors and employees.',
      summary: 'Sustainable commercial landscape renovation with improved functionality and aesthetic appeal.',
      location: 'Metropolis, NY',
      client: 'Metropolis Business Park',
      completionDate: '2022-11-10',
      mainImage: '/assets/images/portfolio/project-2.jpg',
      images: [
        '/assets/images/portfolio/project-2.jpg',
        '/assets/images/portfolio/project-2-2.jpg',
        '/assets/images/portfolio/project-2-3.jpg',
        '/assets/images/portfolio/project-2-4.jpg'
      ],
      beforeImages: [
        '/assets/images/portfolio/project-2-before-1.jpg',
        '/assets/images/portfolio/project-2-before-2.jpg'
      ],
      afterImages: [
        '/assets/images/portfolio/project-2-after-1.jpg',
        '/assets/images/portfolio/project-2-after-2.jpg'
      ],
      featured: true,
      services: [
        {
          id: 'landscape-design',
          name: 'Landscape Design'
        },
        {
          id: 'hardscaping',
          name: 'Hardscaping'
        },
        {
          id: 'irrigation-systems',
          name: 'Irrigation Systems'
        }
      ],
      testimonial: {
        text: 'The transformation of our business park exceeded all expectations. Sphinx Landscapes delivered a beautiful, functional design that has received countless compliments from tenants and visitors. The new outdoor seating areas are constantly in use, and the drought-tolerant landscaping has significantly reduced our water consumption and maintenance costs.',
        author: 'Robert Wilson, Property Manager',
        rating: 5
      },
      highlights: [
        'Water-efficient irrigation system with smart controllers',
        'Native and drought-tolerant plantings throughout the property',
        'Permeable paver walkways to reduce runoff',
        'Custom seating areas with shade structures',
        'Improved wayfinding and landscape lighting'
      ],
      challenges: 'The plaza had outdated infrastructure, significant water runoff issues, and lacked identity. The renovation needed to be completed in phases to minimize disruption to businesses, and had to accommodate heavy foot traffic and various access points.',
      solutions: 'We developed a phased implementation plan that allowed businesses to remain operational. The design incorporated sustainable water management practices including bioswales, permeable pavers, and a water-efficient irrigation system. The new landscape creates distinct zones for different uses while maintaining a cohesive identity through consistent material and plant palette.',
      category: 'commercial'
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const currentProject = mockProjects.find(p => p.slug === projectId);

      if (currentProject) {
        // Set page title
        document.title = `${currentProject.title} | Sphinx Landscapes`;

        setProject(currentProject);

        // Find related projects (projects with same category, excluding current project)
        const related = mockProjects
          .filter(p => p.id !== currentProject.id)
          .filter(p => p.category === currentProject.category)
          .slice(0, 3);

        setRelatedProjects(related);
      }

      setLoading(false);
    }, 800);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [projectId]);

  // Handle gallery navigation
  const nextImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex(prevIndex =>
        prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.images && project.images.length > 0) {
      setCurrentImageIndex(prevIndex =>
        prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <main>
        <PageHeader
          title="Project Not Found"
          description="The project you're looking for may have been moved or deleted."
          bgImage="/assets/images/portfolio/portfolio-header.jpg"
        />

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn't find the project you were looking for.
            </p>
            <Button
              as="link"
              to="/portfolio"
              variant="primary"
            >
              View All Projects
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title={project.title}
        description={project.summary}
        bgImage={project.mainImage}
        breadcrumbs={[
          { text: 'Portfolio', link: '/portfolio' },
          { text: project.title, link: `/portfolio/${project.slug}` }
        ]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Back to Portfolio Link */}
          <div className="mb-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Details */}
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-semibold mb-6">Project Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <FaMapMarkerAlt className="text-primary mr-2" />
                      <h3 className="font-medium">Location</h3>
                    </div>
                    <p>{project.location}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <FaCalendarAlt className="text-primary mr-2" />
                      <h3 className="font-medium">Completed</h3>
                    </div>
                    <p>{formatDate(project.completionDate)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <svg className="text-primary mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <h3 className="font-medium">Client</h3>
                    </div>
                    <p>{project.client}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-8">{project.description}</p>

                {/* Services Used */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-medium mb-4">Services Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map(service => (
                      <Link
                        key={service.id}
                        to={`/services/${service.id}`}
                        className="bg-gray-100 hover:bg-primary hover:text-white px-4 py-2 rounded-full text-sm transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Project Highlights */}
                <div className="mb-8">
                  <h3 className="text-xl font-heading font-medium mb-4">Project Highlights</h3>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="text-primary mt-1 mr-3 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project Challenges and Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h3 className="text-xl font-heading font-medium mb-4">Challenges</h3>
                    <p className="text-gray-700">{project.challenges}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-medium mb-4">Solutions</h3>
                    <p className="text-gray-700">{project.solutions}</p>
                  </div>
                </div>

                {/* Project Images Gallery */}
                <div className="mb-12">
                  <h3 className="text-xl font-heading font-medium mb-4">Project Gallery</h3>

                  <div className="mb-4 relative">
                    <img
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-auto rounded-lg object-cover"
                      style={{ maxHeight: '600px' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x800?text=Project+Image';
                      }}
                    />

                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full shadow-md focus:outline-none"
                          aria-label="Previous image"
                        >
                          <FaArrowLeft className="text-primary" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full shadow-md focus:outline-none"
                          aria-label="Next image"
                        >
                          <FaArrowRight className="text-primary" />
                        </button>
                      </>
                    )}
                  </div>

                  {project.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`rounded-md overflow-hidden focus:outline-none ${
                            currentImageIndex === index ? 'ring-2 ring-primary' : ''
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Thumbnail ${index + 1}`}
                            className="w-full h-20 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/150x150?text=Thumbnail';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Before & After Slider */}
                {project.beforeImages && project.afterImages && project.beforeImages.length > 0 && project.afterImages.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xl font-heading font-medium mb-4">Before & After</h3>
                    <BeforeAfterSlider
                      beforeImage={project.beforeImages[0]}
                      afterImage={project.afterImages[0]}
                      beforeAlt={`${project.title} - Before`}
                      afterAlt={`${project.title} - After`}
                    />
                  </div>
                )}

                {/* Client Testimonial */}
                {project.testimonial && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-12">
                    <div className="flex items-start">
                      <FaQuoteLeft className="text-primary text-opacity-20 text-4xl mr-4 flex-shrink-0" />
                      <div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < project.testimonial.rating ? "text-accent" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 italic mb-4">{project.testimonial.text}</p>
                        <p className="font-medium">- {project.testimonial.author}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="bg-primary text-white rounded-lg p-8 text-center">
                  <h3 className="text-2xl font-heading font-semibold mb-4">Ready to transform your space?</h3>
                  <p className="text-white text-opacity-90 mb-6">
                    Contact us today to discuss your project and schedule a consultation.
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
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Similar Projects */}
                {relatedProjects.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-heading font-semibold mb-4">Similar Projects</h3>
                    <div className="space-y-4">
                      {relatedProjects.map(relatedProject => (
                        <div key={relatedProject.id} className="flex items-start">
                          <div className="flex-shrink-0 w-24 h-20 mr-4">
                            <Link to={`/portfolio/${relatedProject.slug}`}>
                              <img
                                src={relatedProject.mainImage}
                                alt={relatedProject.title}
                                className="w-full h-full object-cover rounded-md"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150x100?text=Project';
                                }}
                              />
                            </Link>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              <Link
                                to={`/portfolio/${relatedProject.slug}`}
                                className="hover:text-primary transition-colors"
                              >
                                {relatedProject.title}
                              </Link>
                            </h4>
                            <p className="text-sm text-gray-500">
                              {relatedProject.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services Sidebar */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Our Services</h3>
                  <ul className="space-y-2">
                    {project.services.map(service => (
                      <li key={service.id}>
                        <Link
                          to={`/services/${service.id}`}
                          className="flex items-center py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <svg className="text-primary mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          {service.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        to="/services"
                        className="flex items-center justify-center mt-2 text-primary hover:text-primary-dark font-medium transition-colors"
                      >
                        View All Services
                        <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Sidebar */}
                <div className="bg-primary-light bg-opacity-10 rounded-lg p-6">
                  <h3 className="text-xl font-heading font-semibold mb-4">Have Questions?</h3>
                  <p className="text-gray-700 mb-4">
                    Interested in this project or something similar for your property? Our team is here to help.
                  </p>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <svg className="text-primary mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>(555) 123-4567</span>
                    </p>
                    <p className="flex items-center">
                      <svg className="text-primary mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@sphinxlandscapes.com</span>
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button
                      as="link"
                      to="/contact"
                      variant="primary"
                      fullWidth
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetailPage;