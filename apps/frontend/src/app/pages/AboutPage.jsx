// apps/frontend/src/app/pages/AboutPage.jsx
import React, { useEffect } from 'react';
import { FaLeaf, FaHandshake, FaUsers, FaRecycle, FaMedal, FaThumbsUp } from 'react-icons/fa';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common';
import { TeamMember } from '../components/about/TeamMember';
import { Testimonial } from '../components/about/Testimonial';

const AboutPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'About Us | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Davis',
      title: 'Founder & Lead Designer',
      bio: 'With over 20 years of experience in landscape architecture, John has created award-winning designs for residential and commercial clients throughout the region.',
      image: '/assets/images/team/john-davis.jpg',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      title: 'Horticulture Specialist',
      bio: 'Sarah brings her extensive knowledge of native plants and sustainable gardening practices to every project, ensuring beautiful landscapes that thrive in local conditions.',
      image: '/assets/images/team/sarah-johnson.jpg',
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Hardscape Manager',
      bio: 'Michael specializes in creating stunning outdoor living spaces with custom stonework, patios, and retaining walls that perfectly complement the natural landscape.',
      image: '/assets/images/team/michael-chen.jpg',
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      title: 'Project Manager',
      bio: 'Emily ensures that every project runs smoothly from concept to completion, coordinating our team of specialists and keeping clients informed throughout the process.',
      image: '/assets/images/team/emily-rodriguez.jpg',
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: 'Sphinx Landscapes transformed our backyard into an amazing outdoor living space. The team was professional, creative, and delivered beyond our expectations.',
      author: 'Jennifer & Mark Thompson',
      location: 'Metropolis, NY',
      rating: 5,
    },
    {
      id: 2,
      text: 'We hired Sphinx for our commercial property landscaping and have been impressed with their attention to detail and ongoing maintenance. Our property has never looked better!',
      author: 'Robert Wilson',
      location: 'Wilson Properties LLC',
      rating: 5,
    },
    {
      id: 3,
      text: 'The irrigation system Sphinx installed has made such a difference in keeping our garden healthy while conserving water. Their knowledge and expertise is unmatched.',
      author: 'Patricia Miller',
      location: 'Metropolis, NY',
      rating: 5,
    }
  ];

  return (
    <main>
      <PageHeader
        title="About Sphinx Landscapes"
        description="Creating beautiful outdoor spaces since 2005. Learn about our journey, our team, and our commitment to excellence."
        bgImage="/assets/images/about/about-header.jpg"
        breadcrumbs={[{ text: 'About', link: '/about' }]}
      />

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-semibold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2005 by John Davis, Sphinx Landscapes began with a simple mission: to create exceptional outdoor spaces that connect people with nature. What started as a small residential landscaping company has grown into a full-service landscape design and installation firm serving both residential and commercial clients.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, we've assembled a team of passionate professionals who bring expertise in landscape architecture, horticulture, construction, and project management. Our holistic approach allows us to handle projects of any size, from intimate garden spaces to large commercial properties.
              </p>
              <p className="text-gray-700 mb-4">
                As we've grown, our commitment to sustainability has remained at the heart of everything we do. We believe in creating landscapes that not only look beautiful but also contribute positively to the environment through responsible water management, native plantings, and eco-friendly practices.
              </p>
              <p className="text-gray-700">
                Today, we take pride in our portfolio of award-winning projects and the lasting relationships we've built with our clients. We look forward to continuing our journey and helping more people experience the joy of a well-designed outdoor space.
              </p>
            </div>
            <div className="relative">
              <img
                src="/assets/images/about/our-story.jpg"
                alt="Sphinx Landscapes team working on a project"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=Our+Story';
                }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md">
                <p className="text-primary font-heading font-bold text-4xl">15+</p>
                <p className="text-gray-600">Years of Excellence</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-md">
                <p className="text-primary font-heading font-bold text-4xl">500+</p>
                <p className="text-gray-600">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-semibold mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our work and define our commitment to our clients and the environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaMedal className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-3">Client Satisfaction</h3>
              <p className="text-gray-600 text-center">
                We listen carefully to our clients' needs and work collaboratively to exceed their expectations.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaRecycle className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-3">Innovation</h3>
              <p className="text-gray-600 text-center">
                We continuously seek new techniques, materials, and designs to bring fresh ideas to our landscapes.
              </p>
            </div>

            {/* Teamwork */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaUsers className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-3">Teamwork</h3>
              <p className="text-gray-600 text-center">
                We value collaboration within our team and with our clients to achieve the best possible results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-semibold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Our talented professionals bring expertise, creativity, and dedication to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <TeamMember
                key={member.id}
                name={member.name}
                title={member.title}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as="link"
              to="/careers"
              variant="outline"
              size="large"
            >
              Join Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-semibold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">
              Don't just take our word for it. Here's what our clients have to say about working with Sphinx Landscapes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <Testimonial
                key={testimonial.id}
                text={testimonial.text}
                author={testimonial.author}
                location={testimonial.location}
                rating={testimonial.rating}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              as="link"
              to="/portfolio"
              variant="primary"
              size="large"
            >
              View Our Projects
            </Button>
          </div>
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

export default AboutPage;d text-center mb-3">Quality Craftsmanship</h3>
              <p className="text-gray-600 text-center">
                We take pride in our attention to detail and commitment to excellence in every aspect of our work.
              </p>
            </div>

            {/* Sustainability */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaLeaf className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-3">Environmental Stewardship</h3>
              <p className="text-gray-600 text-center">
                We design with sustainability in mind, using eco-friendly practices and materials in all our projects.
              </p>
            </div>

            {/* Integrity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaHandshake className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-center mb-3">Integrity & Honesty</h3>
              <p className="text-gray-600 text-center">
                We conduct our business with transparency, honesty, and a commitment to doing what's right.
              </p>
            </div>

            {/* Customer Focus */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-light bg-opacity-20 p-4 rounded-full">
                  <FaThumbsUp className="text-primary text-3xl" />
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibol
