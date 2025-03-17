// apps/frontend/src/app/components/common/PageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const PageHeader = ({
  title,
  description,
  bgImage,
  breadcrumbs = [],
  alignment = 'center',
  textColor = 'white',
  bgOverlay = true,
  overlayOpacity = 70,
  minHeight = 'md',
}) => {
  // Set min-height based on prop
  const minHeightClass = {
    sm: 'min-h-[200px]',
    md: 'min-h-[300px]',
    lg: 'min-h-[400px]',
    xl: 'min-h-[500px]',
  }[minHeight] || 'min-h-[300px]';

  // Set text alignment
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[alignment] || 'text-center items-center';

  // Set text color with fallback
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-gray-800';

  return (
    <header className={`relative flex items-center justify-center ${minHeightClass} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {bgOverlay && (
          <div
            className={`absolute inset-0 bg-primary z-10 bg-opacity-${overlayOpacity}`}
            style={{ backgroundColor: 'rgba(74, 110, 80, 0.7)' }}
          ></div>
        )}
        <img
          src={bgImage || '/assets/images/hero-background.jpg'}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className={`relative z-20 container mx-auto px-4 py-12 flex flex-col ${alignmentClass}`}>
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className={`flex flex-wrap ${alignment === 'center' ? 'justify-center' : ''}`}>
              <li className={`${textColorClass} text-opacity-90`}>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className={`${textColorClass} text-opacity-90`}>
                  <span className="mx-2">/</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span>{crumb.text}</span>
                  ) : (
                    <Link to={crumb.link} className="hover:underline">
                      {crumb.text}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-heading font-bold mb-4 ${textColorClass}`}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className={`text-lg md:text-xl max-w-2xl ${textColorClass} ${textColorClass === 'text-white' ? 'text-opacity-90' : 'text-opacity-80'}`}>
            {description}
          </p>
        )}
      </div>
    </header>
  );
};

export default PageHeader;