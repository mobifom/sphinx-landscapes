import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Filter } from 'lucide-react';

const PortfolioGallery = ({ featured = false, maxItems = 6 }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'garden', name: 'Gardens' },
    { id: 'patio', name: 'Patios & Hardscaping' },
    { id: 'water-feature', name: 'Water Features' }
  ];

  // Mock projects data (would normally come from an API)
  const mockProjects = [
    {
      id: 1,
      title: 'Tranquil Garden Retreat',
      slug: 'tranquil-garden-retreat',
      category: 'residential',
      tags: ['garden', 'planting'],
      image: '/assets/images/portfolio/project-1.jpg',
      location: 'Metropolis, NY',
      featured: true
    },
    {
      id: 2,
      title: 'Modern Patio Transformation',
      slug: 'modern-patio-transformation',
      category: 'residential',
      tags: ['patio', 'hardscaping'],
      image: '/assets/images/portfolio/project-2.jpg',
      location: 'Metropolis, NY',
      featured: true
    },
    {
      id: 3,
      title: 'Corporate Plaza Landscaping',
      slug: 'corporate-plaza-landscaping',
      category: 'commercial',
      tags: ['planting', 'maintenance'],
      image: '/assets/images/portfolio/project-3.jpg',
      location: 'Metropolis, NY',
      featured: true
    },
    {
      id: 4,
      title: 'Backyard Waterfall and Pond',
      slug: 'backyard-waterfall-pond',
      category: 'residential',
      tags: ['water-feature', 'garden'],
      image: '/assets/images/portfolio/project-4.jpg',
      location: 'Metropolis, NY',
      featured: true
    },
    {
      id: 5,
      title: 'Sustainable Rooftop Garden',
      slug: 'sustainable-rooftop-garden',
      category: 'commercial',
      tags: ['garden', 'sustainable'],
      image: '/assets/images/portfolio/project-5.jpg',
      location: 'Metropolis, NY',
      featured: false
    },
    {
      id: 6,
      title: 'Outdoor Kitchen & Dining Area',
      slug: 'outdoor-kitchen-dining',
      category: 'residential',
      tags: ['patio', 'hardscaping'],
      image: '/assets/images/portfolio/project-6.jpg',
      location: 'Metropolis, NY',
      featured: true
    },
    {
      id: 7,
      title: 'Japanese Zen Garden',
      slug: 'japanese-zen-garden',
      category: 'residential',
      tags: ['garden', 'cultural'],
      image: '/assets/images/portfolio/project-7.jpg',
      location: 'Metropolis, NY',
      featured: false
    },
    {
      id: 8,
      title: 'Community Park Renovation',
      slug: 'community-park-renovation',
      category: 'commercial',
      tags: ['municipal', 'hardscaping'],
      image: '/assets/images/portfolio/project-8.jpg',
      location: 'Metropolis, NY',
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = [...projects];

    // Filter by featured if needed
    if (featured) {
      result = result.filter(project => project.featured);
    }

    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(project =>
        project.category === activeCategory || project.tags.includes(activeCategory)
      );
    }

    // Limit the number of items if specified
    if (maxItems > 0) {
      result = result.slice(0, maxItems);
    }

    setFilteredProjects(result);
  }, [projects, activeCategory, featured, maxItems]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleViewProject = (slug) => {
    // In a real app, this would navigate to the project detail page
    console.log(`Viewing project: ${slug}`);
    // We'd normally use router navigation here, but for now we'll just log
    alert(`You clicked on project: ${slug}`);
  };

  const handleViewAllProjects = () => {
    // In a real app, this would navigate to the portfolio page
    console.log('Viewing all projects');
    // We'd normally use router navigation here, but for now we'll just log
    alert('You clicked View All Projects');
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {featured ? (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of stunning landscape transformations
              that we've created for homeowners and businesses.
            </p>
          </div>
        ) : (
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Our Portfolio</h1>
            <p className="text-gray-600 max-w-3xl">
              Browse our collection of completed landscape design and installation projects.
              Filter by category to find inspiration for your own outdoor space.
            </p>
          </div>
        )}

        {!featured && (
          <div className="mb-8">
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm"
              >
                <div className="flex items-center">
                  <Filter className="mr-2 text-primary" size={16} />
                  <span>Filter Projects</span>
                </div>
                <span>{activeCategory !== 'all' ? categories.find(c => c.id === activeCategory)?.name : 'All Projects'}</span>
              </button>
            </div>

            <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-md bg-white">
              <div
                className="block relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => handleViewProject(project.slug)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-40">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-primary text-white p-3 rounded-full">
                      <Search size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  {project.category === 'residential' ? 'Residential' :
                   project.category === 'commercial' ? 'Commercial' : 'Special Project'}
                </span>
                <h3 className="text-xl font-heading font-semibold mt-1 mb-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewProject(project.slug);
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{project.location}</p>
                <button
                  onClick={() => handleViewProject(project.slug)}
                  className="inline-flex items-center font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  View Project <ArrowRight className="ml-2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {featured && filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewAllProjects}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors"
            >
              View All Projects <ArrowRight className="ml-2" size={16} />
            </button>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No projects found</h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new projects.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGallery;