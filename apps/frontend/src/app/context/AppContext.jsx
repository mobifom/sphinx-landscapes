// apps/frontend/src/app/context/AppContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { ServicesAPI, PortfolioAPI, BlogAPI } from '../utils/api';

// Create context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // App state
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState({
    services: false,
    projects: false,
    blogPosts: false
  });
  const [error, setError] = useState({
    services: null,
    projects: null,
    blogPosts: null
  });

  // Fetch services from API
  const fetchServices = async () => {
    setLoading(prev => ({ ...prev, services: true }));
    setError(prev => ({ ...prev, services: null }));

    try {
      const response = await ServicesAPI.getAllServices();
      setServices(response.data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(prev => ({
        ...prev,
        services: 'Failed to load services. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, services: false }));
    }
  };

  // Fetch portfolio projects from API
  const fetchProjects = async () => {
    setLoading(prev => ({ ...prev, projects: true }));
    setError(prev => ({ ...prev, projects: null }));

    try {
      const response = await PortfolioAPI.getAllProjects();
      setProjects(response.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(prev => ({
        ...prev,
        projects: 'Failed to load projects. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  // Fetch blog posts from API
  const fetchBlogPosts = async () => {
    setLoading(prev => ({ ...prev, blogPosts: true }));
    setError(prev => ({ ...prev, blogPosts: null }));

    try {
      const response = await BlogAPI.getAllPosts();
      setBlogPosts(response.data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError(prev => ({
        ...prev,
        blogPosts: 'Failed to load blog posts. Please try again later.'
      }));
    } finally {
      setLoading(prev => ({ ...prev, blogPosts: false }));
    }
  };

  // Provide context values
  const contextValue = {
    services,
    projects,
    blogPosts,
    loading,
    error,
    fetchServices,
    fetchProjects,
    fetchBlogPosts
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using app context
export const useApp = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};