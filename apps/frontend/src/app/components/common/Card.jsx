// apps/frontend/src/app/components/common/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  title,
  subtitle,
  children,
  image,
  imageAlt = 'Card image',
  footer,
  className = '',
  linkTo = '',
  elevation = 'medium',
  hoverEffect = true,
  aspectRatio = 'auto',
  darkOverlay = false,
  onClick,
}) => {
  // Elevation classes
  const elevationClasses = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg',
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    auto: 'aspect-auto',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  // Base card classes
  const baseClasses = `
    bg-white rounded-lg overflow-hidden
    ${elevationClasses[elevation] || elevationClasses.medium}
    ${hoverEffect ? 'transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : ''}
    ${className}
  `;

  // Card content component
  const CardContent = () => (
    <>
      {image && (
        <div className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]}`}>
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          {darkOverlay && (
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          )}
          {title && darkOverlay && (
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white text-xl font-heading font-semibold">{title}</h3>
              {subtitle && <p className="text-white text-sm mt-1 opacity-90">{subtitle}</p>}
            </div>
          )}
        </div>
      )}

      {(title || subtitle) && !darkOverlay && (
        <div className="p-4 pb-2">
          {title && <h3 className="text-lg font-heading font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="p-4 pt-2">
        {children}
      </div>

      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          {footer}
        </div>
      )}
    </>
  );

  // Render card as a link if linkTo is provided
  if (linkTo) {
    return (
      <Link to={linkTo} className={baseClasses}>
        <CardContent />
      </Link>
    );
  }

  // Render clickable card
  if (onClick) {
    return (
      <div className={`${baseClasses} cursor-pointer`} onClick={onClick}>
        <CardContent />
      </div>
    );
  }

  // Render regular card
  return (
    <div className={baseClasses}>
      <CardContent />
    </div>
  );
};

export default Card;