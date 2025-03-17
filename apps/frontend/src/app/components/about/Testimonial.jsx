// apps/frontend/src/app/components/about/Testimonial.jsx
import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export const Testimonial = ({
  text,
  author,
  location,
  rating = 5,
  image = '',
}) => {
  // Generate array of stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FaStar
      key={index}
      className={index < rating ? 'text-accent' : 'text-gray-300'}
    />
  ));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <FaQuoteLeft className="text-primary text-opacity-20 text-4xl" />
      </div>

      {/* Rating Stars */}
      <div className="flex mb-4">
        {stars}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-600 mb-6 flex-grow italic">"{text}"</p>

      {/* Author Info */}
      <div className="flex items-center mt-auto">
        {image && (
          <div className="mr-4">
            <img
              src={image}
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48x48?text=A';
              }}
            />
          </div>
        )}
        <div>
          <p className="font-heading font-semibold">{author}</p>
          {location && <p className="text-sm text-gray-500">{location}</p>}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;