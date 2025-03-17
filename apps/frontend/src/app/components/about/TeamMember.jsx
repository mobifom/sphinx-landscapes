// apps/frontend/src/app/components/about/TeamMember.jsx
import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

export const TeamMember = ({
  name,
  title,
  bio,
  image,
  linkedin = '',
  email = '',
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg h-full">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x400?text=Team+Member';
          }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-4">{title}</p>
        <p className="text-gray-600 mb-4">{bio}</p>

        {/* Social Links */}
        {(linkedin || email) && (
          <div className="flex space-x-3 mt-4">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-300"
                aria-label={`${name}'s LinkedIn profile`}
              >
                <FaLinkedin />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="bg-gray-100 hover:bg-primary hover:text-white p-2 rounded-full transition-colors duration-300"
                aria-label={`Email ${name}`}
              >
                <FaEnvelope />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMember;