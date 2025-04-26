// apps/frontend/src/app/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Sphinx Landscapes</h3>
            <p className="mb-4 text-gray-300">
              Creating beautiful outdoor spaces that inspire and delight. Serving the greater metropolitan area for over 15 years.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors duration-300"
              >
                <FaPinterestP />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-accent transition-colors duration-300">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-accent transition-colors duration-300">
                  Recent Projects
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent transition-colors duration-300">
                  Landscaping Tips
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-accent transition-colors duration-300">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/landscape-design" className="hover:text-accent transition-colors duration-300">
                  Landscape Design
                </Link>
              </li>
              <li>
                <Link to="/services/hardscaping" className="hover:text-accent transition-colors duration-300">
                  Hardscaping
                </Link>
              </li>
              <li>
                <Link to="/services/lawn-care" className="hover:text-accent transition-colors duration-300">
                  Lawn Care & Maintenance
                </Link>
              </li>
              <li>
                <Link to="/services/irrigation" className="hover:text-accent transition-colors duration-300">
                  Irrigation Systems
                </Link>
              </li>
              <li>
                <Link to="/services/planting" className="hover:text-accent transition-colors duration-300">
                  Planting & Gardens
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-accent" />
                <span>123 Greenway Drive<br />Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-accent" />
                <a href="tel:+15551234567" className="hover:text-accent transition-colors duration-300">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <a href="mailto:info@sphinxlandscapes.com" className="hover:text-accent transition-colors duration-300">
                  info@sphinxlandscapes.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Sphinx Landscapes. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-accent transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-accent transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;