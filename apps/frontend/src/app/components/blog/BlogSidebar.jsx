// apps/frontend/src/app/components/blog/BlogSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaLeaf } from 'react-icons/fa';

export const BlogSidebar = ({
  categories,
  activeCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  posts
}) => {
  // Get recent posts (latest 3)
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="sticky top-24 space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-heading font-semibold mb-4">Search</h3>
        <form onSubmit={onSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-heading font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onCategoryChange('all')}
              className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary-light bg-opacity-20 text-primary'
                  : 'hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
          </li>
          {categories.map(category => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-light bg-opacity-20 text-primary'
                    : 'hover:bg-gray-50'
                }`}
              >
                {category.name} ({category.count})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-heading font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map(post => (
            <div key={post.id} className="flex items-start">
              <div className="flex-shrink-0 w-16 h-16 mr-4">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-md"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100?text=Post';
                  }}
                />
              </div>
              <div>
                <h4 className="font-medium">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary text-white rounded-lg shadow-md p-6">
        <div className="flex justify-center mb-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <FaLeaf className="text-white text-2xl" />
          </div>
        </div>
        <h3 className="text-lg font-heading font-semibold text-center mb-2">
          Landscaping Tips Newsletter
        </h3>
        <p className="text-white text-opacity-90 text-center mb-4">
          Subscribe to get seasonal tips and landscaping inspiration delivered to your inbox.
        </p>
        <form className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full py-3 px-4 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-center text-white text-opacity-70 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default BlogSidebar;