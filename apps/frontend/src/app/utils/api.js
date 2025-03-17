// apps/frontend/src/app/utils/api.js
import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
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
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      errorMessage = error.response.data.message || 'Server responded with an error';

      // Handle specific status codes
      if (error.response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        // You might want to redirect to login page here
        console.log('Authentication error: Please log in again');
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

// API service for services
export const ServicesAPI = {
  // Get all services
  getAllServices: async (filters = {}) => {
    try {
      return await apiClient.get('/services', { params: filters });
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by slug
  getServiceBySlug: async (slug) => {
    try {
      return await apiClient.get(`/services/${slug}`);
    } catch (error) {
      console.error(`Error fetching service with slug ${slug}:`, error);
      throw error;
    }
  },

  // Get service categories
  getCategories: async () => {
    try {
      return await apiClient.get('/services/categories/all');
    } catch (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }
  }
};

// API service for portfolio projects
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
        localStorage.setItem('token', response.token);
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
      localStorage.removeItem('token');
      return response;
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove token even if API call fails
      localStorage.removeItem('token');
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