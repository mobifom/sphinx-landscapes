// apps/frontend/src/app/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common';
import { BlogCard } from '../components/blog/BlogCard';
import { BlogSidebar } from '../components/blog/BlogSidebar';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock blog data (would normally come from an API)
  const mockPosts = [
    {
      id: 1,
      title: '10 Low-Maintenance Plants for Your Garden',
      slug: 'low-maintenance-plants',
      excerpt: 'Discover beautiful plants that thrive with minimal care, perfect for busy homeowners who want an attractive garden without the constant upkeep.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/low-maintenance-plants.jpg',
      category: 'landscaping-tips',
      author: 'Sarah Johnson',
      authorImage: '/assets/images/team/sarah-johnson.jpg',
      date: '2023-06-15',
      tags: ['plants', 'low-maintenance', 'gardening'],
      readTime: 5
    },
    {
      id: 2,
      title: 'How to Design the Perfect Outdoor Living Space',
      slug: 'perfect-outdoor-living-space',
      excerpt: 'Learn the key elements to consider when designing an outdoor living space that's both functional and beautiful for your family to enjoy year-round.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/outdoor-living-space.jpg',
      category: 'design',
      author: 'John Davis',
      authorImage: '/assets/images/team/john-davis.jpg',
      date: '2023-05-28',
      tags: ['design', 'outdoor-living', 'patios'],
      readTime: 7
    },
    {
      id: 3,
      title: 'Seasonal Lawn Care: Spring Maintenance Guide',
      slug: 'spring-lawn-maintenance',
      excerpt: 'Our comprehensive spring maintenance guide to help your lawn recover from winter and prepare for the growing season ahead.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/spring-lawn-care.jpg',
      category: 'maintenance',
      author: 'Emily Rodriguez',
      authorImage: '/assets/images/team/emily-rodriguez.jpg',
      date: '2023-04-10',
      tags: ['lawn-care', 'spring', 'maintenance'],
      readTime: 6
    },
    {
      id: 4,
      title: 'Water Conservation in Your Landscape',
      slug: 'water-conservation-landscape',
      excerpt: 'Smart strategies to create a water-efficient landscape that stays beautiful while reducing your water consumption and utility bills.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/water-conservation.jpg',
      category: 'sustainability',
      author: 'Michael Chen',
      authorImage: '/assets/images/team/michael-chen.jpg',
      date: '2023-03-22',
      tags: ['water-conservation', 'sustainability', 'irrigation'],
      readTime: 8
    },
    {
      id: 5,
      title: 'Before & After: A Stunning Backyard Transformation',
      slug: 'backyard-transformation',
      excerpt: 'See how we transformed a neglected backyard into a beautiful outdoor retreat with custom hardscaping, native plants, and strategic lighting.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/backyard-transformation.jpg',
      category: 'projects',
      author: 'John Davis',
      authorImage: '/assets/images/team/john-davis.jpg',
      date: '2023-02-15',
      tags: ['before-after', 'transformation', 'design'],
      readTime: 5
    },
    {
      id: 6,
      title: 'How to Choose the Right Trees for Your Property',
      slug: 'choosing-right-trees',
      excerpt: 'A guide to selecting trees that will thrive in your specific climate, soil conditions, and landscape design for decades to come.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl vel nisl.',
      featuredImage: '/assets/images/blog/choosing-trees.jpg',
      category: 'landscaping-tips',
      author: 'Sarah Johnson',
      authorImage: '/assets/images/team/sarah-johnson.jpg',
      date: '2023-01-30',
      tags: ['trees', 'planting', 'selection'],
      readTime: 7
    }
  ];

  // Mock categories (would normally come from an API)
  const mockCategories = [
    { id: 'landscaping-tips', name: 'Landscaping Tips', count: 2 },
    { id: 'design', name: 'Design Ideas', count: 1 },
    { id: 'maintenance', name: 'Maintenance', count: 1 },
    { id: 'sustainability', name: 'Sustainability', count: 1 },
    { id: 'projects', name: 'Project Showcases', count: 1 }
  ];

  useEffect(() => {
    // Set page title
    document.title = 'Landscaping Blog | Sphinx Landscapes';

    // Simulate API fetch
    setTimeout(() => {
      setPosts(mockPosts);
      setFilteredPosts(mockPosts);
      setCategories(mockCategories);
      setLoading(false);
    }, 800);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Filter posts when category or search term changes
  useEffect(() => {
    let results = [...posts];

    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(post => post.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        post =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredPosts(results);
  }, [activeCategory, searchTerm, posts]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // No need to do anything else as the useEffect will handle filtering
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main>
      <PageHeader
        title="Landscaping Blog"
        description="Expert tips, ideas, and inspiration to help you create and maintain a beautiful landscape."
        bgImage="/assets/images/blog/blog-header.jpg"
        breadcrumbs={[{ text: 'Blog', link: '/blog' }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Mobile Search and Filter */}
              <div className="mb-8 lg:hidden">
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={handleSearchChange}
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

                <div className="mb-6">
                  <label htmlFor="mobile-category" className="block text-gray-700 font-medium mb-2">
                    Filter by Category
                  </label>
                  <select
                    id="mobile-category"
                    value={activeCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Blog Posts */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-10">
                  {filteredPosts.map(post => (
                    <BlogCard
                      key={post.id}
                      title={post.title}
                      excerpt={post.excerpt}
                      slug={post.slug}
                      featuredImage={post.featuredImage}
                      category={post.category}
                      categoryName={categories.find(cat => cat.id === post.category)?.name}
                      author={post.author}
                      authorImage={post.authorImage}
                      date={post.date}
                      readTime={post.readTime}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchTerm('');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Pagination would go here */}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
                posts={posts}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPage;