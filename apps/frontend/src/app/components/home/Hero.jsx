// apps/frontend/src/app/components/home/Hero.jsx
import React from 'react';
import { Button } from '../common';
import { FaAngleDown } from 'react-icons/fa';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <img
          src="/assets/images/hero-background.jpg"
          alt="Beautiful landscaping project"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4">
            Transform Your Outdoor Space
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 text-gray-100">
            Expert landscaping services to create the garden of your dreams
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              as="link"
              to="/services"
              variant="primary"
              size="large"
              className="min-w-[180px]"
            >
              Our Services
            </Button>
            <Button
              as="link"
              to="/quote"
              variant="white"
              size="large"
              className="min-w-[180px]"
            >
              Get a Free Quote
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={() => scrollToSection('featured-services')}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll Down</span>
            <FaAngleDown size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;