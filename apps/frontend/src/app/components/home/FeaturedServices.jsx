// apps/frontend/src/app/components/home/FeaturedServices.jsx
import React from 'react';
import { Card, Button } from '../common';
import { FaLeaf, FaWater, FaTree, FaHome } from 'react-icons/fa';

const FeaturedServices = () => {
  const services = [
    {
      id: 1,
      title: 'Landscape Design',
      description: 'Custom designs that blend beauty and functionality, tailored to your style and space.',
      icon: <FaLeaf className="text-primary text-3xl mb-4" />,
      image: '/assets/images/services/landscape-design.jpg',
      link: '/services/landscape-design'
    },
    {
      id: 2,
      title: 'Hardscaping',
      description: 'Transform your outdoor living with patios, walkways, retaining walls, and more.',
      icon: <FaHome className="text-primary text-3xl mb-4" />,
      image: '/assets/images/services/hardscaping.jpg',
      link: '/services/hardscaping'
    },
    {
      id: 3,
      title: 'Irrigation Systems',
      description: 'Water-efficient solutions that keep your landscape healthy and save you time and money.',
      icon: <FaWater className="text-primary text-3xl mb-4" />,
      image: '/assets/images/services/irrigation.jpg',
      link: '/services/irrigation'
    },
    {
      id: 4,
      title: 'Planting & Gardens',
      description: 'Thoughtfully selected plants that thrive in your environment and provide year-round beauty.',
      icon: <FaTree className="text-primary text-3xl mb-4" />,
      image: '/assets/images/services/planting.jpg',
      link: '/services/planting'
    }
  ];

  return (
    <section id="featured-services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Landscaping Services</h2>
          <p className="text-gray-700 text-lg">
            We offer comprehensive landscaping solutions to elevate your outdoor space,
            from concept to creation and ongoing care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              image={service.image}
              imageAlt={service.title}
              title={service.title}
              hoverEffect={true}
              aspectRatio="video"
              elevation="low"
              className="h-full"
            >
              <div className="flex flex-col h-full">
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                <Button
                  as="link"
                  to={service.link}
                  variant="outline"
                  size="small"
                  className="mt-auto"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            as="link"
            to="/services"
            variant="primary"
            size="large"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;