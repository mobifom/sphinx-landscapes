// apps/frontend/src/app/utils/api.js
import axios from 'axios';
import config from './config';

// Create axios instance with base URL and configuration
const apiClient = axios.create({
  baseURL: config.apiUrl,
  headers: config.defaultHeaders,
  timeout: config.requestTimeout,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (reqConfig) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem(config.auth.tokenKey);
    if (token) {
      reqConfig.headers.Authorization = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code between 200 and 299 will trigger this function
    return response.data;
  },
  (error) => {
    // Handle errors
    let errorMessage = config.errorHandling.useGenericMessages
      ? config.errorHandling.genericErrorMessage
      : 'An unexpected error occurred';

    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      errorMessage = error.response.data.message || 'Server responded with an error';

      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - clear token
        localStorage.removeItem(config.auth.tokenKey);
        console.log('Authentication error: Please log in again');
        // You might want to redirect to login page here
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from server. Please check your connection';
    }

    return Promise.reject({
      message: errorMessage,
      originalError: error
    });
  }
);

// Mock service for development when backend is not available
const mockService = {
  getAllServices: () => {
    return Promise.resolve({
      success: true,
      data: [
        {
          _id: '1',
          name: 'Landscape Design',
          slug: 'landscape-design',
          description: 'Our landscape design services create beautiful, functional outdoor spaces tailored to your specific needs and preferences.',
          shortDescription: 'Custom designs that blend beauty and functionality.',
          image: '/assets/images/services/landscape-design.jpg',
          category: 'design',
          features: [
            {
              title: 'Custom Design Solutions',
              description: 'Personalized designs that reflect your style and meet the specific needs of your property.'
            },
            {
              title: 'Digital Renderings',
              description: 'Visualize your completed project with photorealistic 3D renderings before any work begins.'
            }
          ],
          benefits: [
            'Increase property value',
            'Create outdoor living spaces',
            'Sustainable and environmentally friendly designs',
            'Expert plant selection for your climate'
          ]
        },
        {
          _id: '2',
          name: 'Hardscaping',
          slug: 'hardscaping',
          description: 'Our hardscaping services create durable, beautiful features like patios, walkways, and retaining walls to enhance your outdoor living space.',
          shortDescription: 'Transform your outdoor living with patios, walkways, retaining walls, and more.',
          image: '/assets/images/services/hardscaping.jpg',
          category: 'hardscaping',
          features: [
            {
              title: 'Custom Patios & Walkways',
              description: 'Create functional, beautiful spaces with stone, pavers, or concrete that complement your home's architecture.'
            },
            {
              title: 'Retaining Walls & Seating',
              description: 'Add structural support, define spaces, and create additional seating with expertly constructed walls.'
            }
          ],
          benefits: [
            'Increase usable outdoor space',
            'Add architectural interest to your landscape',
            'Reduce erosion and improve drainage',
            'Long-lasting materials with minimal maintenance'
          ]
        },
        {
          _id: '3',
          name: 'Irrigation Systems',
          slug: 'irrigation-systems',
          description: 'Our irrigation services install efficient watering systems that keep your landscape healthy while conserving water and saving you time.',
          shortDescription: 'Water-efficient solutions that keep your landscape healthy and save you time and money.',
          image: '/assets/images/services/irrigation.jpg',
          category: 'irrigation',
          features: [
            {
              title: 'Custom Irrigation Design',
              description: 'Systems designed specifically for your landscape's unique watering needs.'
            },
            {
              title: 'Smart Controllers',
              description: 'Weather-based systems that adjust watering schedules automatically based on local conditions.'
            }
          ],
          benefits: [
            'Reduce water usage and utility bills',
            'Prevent over or under-watering',
            'Save time with automated irrigation',
            'Promote healthier plants and lawns'
          ]
        }
      ]
    });
  },
  getServiceBySlug: (slug) => {
    const services = [
      {
        _id: '1',
        name: 'Landscape Design',
        slug: 'landscape-design',
        description: 'Our landscape design services create beautiful, functional outdoor spaces tailored to your specific needs and preferences.',
        shortDescription: 'Custom designs that blend beauty and functionality.',
        image: '/assets/images/services/landscape-design.jpg',
        category: 'design',
        features: [
          {
            title: 'Custom Design Solutions',
            description: 'Personalized designs that reflect your style and meet the specific needs of your property.'
          },
          {
            title: 'Digital Renderings',
            description: 'Visualize your completed project with photorealistic 3D renderings before any work begins.'
          }
        ],
        benefits: [
          'Increase property value',
          'Create outdoor living spaces',
          'Sustainable and environmentally friendly designs',
          'Expert plant selection for your climate'
        ],
        priceRange: {
          min: 1500,
          max: 15000,
          unit: 'per project'
        },
        portfolioProjects: [
          {
            _id: '1',
            title: 'Tranquil Garden Retreat',
            slug: 'tranquil-garden-retreat',
            mainImage: '/assets/images/portfolio/project-1.jpg',
            location: 'Metropolis, NY'
          },
          {
            _id: '2',
            title: 'Modern Backyard Transformation',
            slug: 'modern-backyard-transformation',
            mainImage: '/assets/images/portfolio/project-2.jpg',
            location: 'Metropolis, NY'
          }
        ]
      },
      {
        _id: '2',
        name: 'Hardscaping',
        slug: 'hardscaping',
        description: 'Our hardscaping services create durable, beautiful features like patios, walkways, and retaining walls to enhance your outdoor living space.',
        shortDescription: 'Transform your outdoor living with patios, walkways, retaining walls, and more.',
        image: '/assets/images/services/hardscaping.jpg',
        category: 'hardscaping',
        features: [
          {
            title: 'Custom Patios & Walkways',
            description: 'Create functional, beautiful spaces with stone, pavers, or concrete that complement your home's architecture.'
          },
          {
            title: 'Retaining Walls & Seating',
            description: 'Add structural support, define spaces, and create additional seating with expertly constructed walls.'
          }
        ],
        benefits: [
          'Increase usable outdoor space',
          'Add architectural interest to your landscape',
          'Reduce erosion and improve drainage',
          'Long-lasting materials with minimal maintenance'
        ],
        priceRange: {
          min: 5000,
          max: 50000,
          unit: 'per project'
        },
        portfolioProjects: [
          {
            _id: '2',
            title: 'Modern Backyard Transformation',
            slug: 'modern-backyard-transformation',
            mainImage: '/assets/images/portfolio/project-2.jpg',
            location: 'Metropolis, NY'
          }
        ]
      },
      {
        _id: '3',
        name: 'Irrigation Systems',
        slug: 'irrigation-systems',
        description: 'Our irrigation services install efficient watering systems that keep your landscape healthy while conserving water and saving you time.',
        shortDescription: 'Water-efficient solutions that keep your landscape healthy and save you time and money.',
        image: '/assets/images/services/irrigation.jpg',
        category: 'irrigation',
        features: [
          {
            title: 'Custom Irrigation Design',
            description: 'Systems designed specifically for your landscape's unique watering needs.'
          },
          {
            title: 'Smart Controllers',
            description: 'Weather-based systems that adjust watering schedules automatically based on local conditions.'
          }
        ],
        benefits: [
          'Reduce water usage and utility bills',
          'Prevent over or under-watering',
          'Save time with automated irrigation',
          'Promote healthier plants and lawns'
        ],
        priceRange: {
          min: 2500,
          max: 10000,
          unit: 'per project'
        },
        portfolioProjects: []
      }
    ];

    const service = services.find(s => s.slug === slug);
    if (!service) {
      return Promise.reject({
        message: 'Service not found',
        originalError: {
          response: {
            status: 404
          }
        }
      });
    }

    return Promise.resolve({
      success: true,
      data: service
    });
  },
  getCategories: () => {
    return Promise.resolve({
      success: true,
      data: ['design', 'hardscaping', 'irrigation', 'maintenance', 'planting', 'lighting']
    });
  }
};

// Determine whether to use real API or mock data
const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true' || false;

// API service for services
export const ServicesAPI = {
  // Get all services
  getAllServices: async (filters = {}) => {
    try {
      if (useMockData) {
        return await mockService.getAllServices();
      }
      return await apiClient.get('/services', { params: filters });
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by slug
  getServiceBySlug: async (slug) => {
    try {
      if (useMockData) {
        return await mockService.getServiceBySlug(slug);
      }
      return await apiClient.get(`/services/${slug}`);
    } catch (error) {
      console.error(`Error fetching service with slug ${slug}:`, error);
      throw error;
    }
  },

  // Get service categories
  getCategories: async () => {
    try {
      if (useMockData) {
        return await mockService.getCategories();
      }
      return await apiClient.get('/services/categories/all');
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  }
};

// API service for portfolio projects (using mock data for now)
export const PortfolioAPI = {
  // Get all projects
  getAllProjects: async (filters = {}) => {
    try {
      return await apiClient.get('/portfolio', { params: filters });
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get project by slug
  getProjectBySlug: async (slug) => {
    try {
      return await apiClient.get(`/portfolio/${slug}`);
    } catch (error) {
      console.error(`Error fetching project with slug ${slug}:`, error);
      throw error;
    }
  },

  // Get project categories
  getCategories: async () => {
    try {
      return await apiClient.get('/portfolio/categories/all');
    } catch (error) {
      console.error('Error fetching project categories:', error);
      throw error;
    }
  }
};

// API service for blog
export const BlogAPI = {
  // Get all blog posts
  getAllPosts: async (filters = {}) => {
    try {
      return await apiClient.get('/blog', { params: filters });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  // Get blog post by slug
  getPostBySlug: async (slug) => {
    try {
      return await apiClient.get(`/blog/${slug}`);
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  },

  // Get blog categories
  getCategories: async () => {
    try {
      return await apiClient.get('/blog/categories/all');
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw error;
    }
  }
};

// API service for contact and quote forms
export const FormAPI = {
  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      return await apiClient.post('/contact', formData);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Submit quote request form
  submitQuoteForm: async (formData) => {
    try {
      return await apiClient.post('/quote', formData);
    } catch (error) {
      console.error('Error submitting quote form:', error);
      throw error;
    }
  }
};

// API service for testimonials
export const TestimonialsAPI = {
  // Get all testimonials
  getAllTestimonials: async () => {
    try {
      return await apiClient.get('/testimonials');
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }
  }
};

// API service for authentication
export const AuthAPI = {
  // Login
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem(config.auth.tokenKey, response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await apiClient.get('/auth/logout');
      localStorage.removeItem(config.auth.tokenKey);
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if API call fails
      localStorage.removeItem(config.auth.tokenKey);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      return await apiClient.get('/auth/me');
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }
};

export default {
  ServicesAPI,
  PortfolioAPI,
  BlogAPI,
  FormAPI,
  TestimonialsAPI,
  AuthAPI
};