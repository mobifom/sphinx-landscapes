// apps/frontend/src/app/components/blog/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock } from 'react-icons/fa';

export const BlogCard = ({
  title,
  excerpt,
  slug,
  featuredImage,
  category,
  categoryName,
  author,
  authorImage,
  date,
  readTime
}) => {
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Featured Image */}
        <div className="md:w-2/5 h-64 md:h-auto">
          <Link to={`/blog/${slug}`} className="block h-full">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Blog+Post';
              }}
            />
          </Link>
        </div>

        {/* Content */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
          {/* Category */}
          <div className="mb-2">
            <Link
              to={`/blog?category=${category}`}
              className="inline-block text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              {categoryName}
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-heading font-semibold mb-3">
            <Link
              to={`/blog/${slug}`}
              className="hover:text-primary transition-colors"
            >
              {title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 flex-grow">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-auto">
            <div className="flex items-center mr-6 mb-2">
              <FaUser className="mr-2 text-primary" />
              <span>{author}</span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <FaCalendarAlt className="mr-2 text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="mr-2 text-primary" />
              <span>{readTime} min read</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-4">
            <Link
              to={`/blog/${slug}`}
              className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Read More
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;