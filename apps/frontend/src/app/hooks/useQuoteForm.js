// apps/frontend/src/app/hooks/useQuoteForm.js
import { useState } from 'react';
import { FormAPI } from '../utils/api';

const useQuoteForm = () => {
  const initialFormState = {
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

    // Property Information
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: '',
    propertySize: '',

    // Project Details
    serviceType: [],
    projectDescription: '',
    timeframe: '',
    budget: '',

    // Additional Information
    howDidYouHear: '',
    additionalComments: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Validate step data
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Validate Contact Information
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9\-\+\(\) ]+$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (step === 2) {
      // Validate Property Information
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }

      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }

      if (!formData.state.trim()) {
        newErrors.state = 'State is required';
      }

      if (!formData.zipCode.trim()) {
        newErrors.zipCode = 'ZIP code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Please enter a valid ZIP code';
      }

      if (!formData.propertyType) {
        newErrors.propertyType = 'Property type is required';
      }
    } else if (step === 3) {
      // Validate Project Details
      if (formData.serviceType.length === 0) {
        newErrors.serviceType = 'Please select at least one service';
      }

      if (!formData.projectDescription.trim()) {
        newErrors.projectDescription = 'Project description is required';
      } else if (formData.projectDescription.trim().length < 10) {
        newErrors.projectDescription = 'Please provide more details about your project';
      }

      if (!formData.timeframe) {
        newErrors.timeframe = 'Please select a timeframe';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'serviceType') {
        let updatedServices = [...formData.serviceType];
        if (checked) {
          updatedServices.push(value);
        } else {
          updatedServices = updatedServices.filter(service => service !== value);
        }
        setFormData({
          ...formData,
          serviceType: updatedServices,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Move to next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  // Move to previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        await FormAPI.submitQuoteForm(formData);
        setIsSubmitted(true);
        setFormData(initialFormState);
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitError(
          error.message || 'An error occurred while submitting the form. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    formData,
    currentStep,
    handleChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    submitError,
  };
};

export default useQuoteForm;