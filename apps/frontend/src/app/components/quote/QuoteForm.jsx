// apps/frontend/src/app/components/quote/QuoteForm.jsx
import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaEnvelope, FaPhone, FaHome, FaRuler, FaCalendarAlt, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';
import { Button } from '../common';

export const QuoteForm = ({ onSubmit }) => {
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

  const serviceOptions = [
    { id: 'landscape-design', label: 'Landscape Design' },
    { id: 'hardscaping', label: 'Hardscaping (Patios, Walkways, etc.)' },
    { id: 'planting', label: 'Planting & Gardens' },
    { id: 'lawn-installation', label: 'Lawn Installation' },
    { id: 'irrigation', label: 'Irrigation Systems' },
    { id: 'lighting', label: 'Outdoor Lighting' },
    { id: 'maintenance', label: 'Maintenance & Lawn Care' },
    { id: 'drainage', label: 'Drainage Solutions' },
    { id: 'other', label: 'Other' },
  ];

  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'other', label: 'Other' },
  ];

  const propertySizeOptions = [
    { value: 'small', label: 'Small (Less than 1,000 sq ft)' },
    { value: 'medium', label: 'Medium (1,000 - 5,000 sq ft)' },
    { value: 'large', label: 'Large (5,000 - 10,000 sq ft)' },
    { value: 'extra-large', label: 'Extra Large (Over 10,000 sq ft)' },
    { value: 'not-sure', label: 'Not Sure' },
  ];

  const timeframeOptions = [
    { value: 'immediately', label: 'As Soon as Possible' },
    { value: '1-3-months', label: 'Within 1-3 Months' },
    { value: '3-6-months', label: 'Within 3-6 Months' },
    { value: '6-plus-months', label: 'More than 6 Months Out' },
    { value: 'not-sure', label: 'Not Sure / Flexible' },
  ];

  const budgetOptions = [
    { value: 'under-5000', label: 'Under $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000-plus', label: 'Over $50,000' },
    { value: 'not-sure', label: 'Not Sure / Flexible' },
  ];

  const referralOptions = [
    { value: 'search', label: 'Search Engine (Google, Bing, etc.)' },
    { value: 'social', label: 'Social Media' },
    { value: 'referral', label: 'Referral from a Friend/Family' },
    { value: 'drove-by', label: 'Drove By Your Work' },
    { value: 'review-site', label: 'Review Website (Yelp, Houzz, etc.)' },
    { value: 'repeat', label: 'Returning Customer' },
    { value: 'other', label: 'Other' },
  ];

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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="quote-form">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`text-center flex-1 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaUser />
            </div>
            <span className="text-sm">Contact Info</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaHome />
            </div>
            <span className="text-sm">Property Info</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaTools className="fas fa-tools" />
            </div>
            <span className="text-sm">Project Details</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 4 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaInfoCircle />
            </div>
            <span className="text-sm">Additional Info</span>
          </div>
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
          <div
            className="absolute top-0 left-0 h-1 bg-primary rounded transition-all duration-300"
            style={{ width: `${(currentStep - 1) * 33.33}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Contact Information */}
      {currentStep === 1 && (
        <div className="step-content">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Your phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Property Information */}
      {currentStep === 2 && (
        <div className="step-content">
          <h3 className="text-lg font-medium mb-4">Property Information</h3>

          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Street address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="State"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* ZIP Code */}
              <div>
                <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ZIP code"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                )}
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-gray-700 font-medium mb-2">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.propertyType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select property type</option>
                {propertyTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>
              )}
            </div>

            {/* Property Size */}
            <div>
              <label htmlFor="propertySize" className="block text-gray-700 font-medium mb-2">
                Property Size <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <select
                id="propertySize"
                name="propertySize"
                value={formData.propertySize}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select approximate size</option>
                {propertySizeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
            >
              Previous Step
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Project Details */}
      {currentStep === 3 && (
        <div className="step-content">
          <h3 className="text-lg font-medium mb-4">Project Details</h3>

          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Service Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Services Needed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {serviceOptions.map(option => (
                  <div key={option.id} className="flex items-start">
                    <input
                      type="checkbox"
                      id={option.id}
                      name="serviceType"
                      value={option.id}
                      checked={formData.serviceType.includes(option.id)}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={option.id} className="ml-2 text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.serviceType && (
                <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="projectDescription" className="block text-gray-700 font-medium mb-2">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="projectDescription"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                rows="5"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Please describe your project, including any specific features or challenges..."
              ></textarea>
              {errors.projectDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.projectDescription}</p>
              )}
            </div>

            {/* Timeframe */}
            <div>
              <label htmlFor="timeframe" className="block text-gray-700 font-medium mb-2">
                Project Timeframe <span className="text-red-500">*</span>
              </label>
              <select
                id="timeframe"
                name="timeframe"
                value={formData.timeframe}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.timeframe ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select timeframe</option>
                {timeframeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.timeframe && (
                <p className="mt-1 text-sm text-red-500">{errors.timeframe}</p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
                Approximate Budget <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select budget range</option>
                {budgetOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
            >
              Previous Step
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleNext}
            >
              Next Step
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Additional Information and Submit */}
      {currentStep === 4 && (
        <div className="step-content">
          <h3 className="text-lg font-medium mb-4">Additional Information</h3>

          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* How Did You Hear About Us */}
            <div>
              <label htmlFor="howDidYouHear" className="block text-gray-700 font-medium mb-2">
                How did you hear about us? <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <select
                id="howDidYouHear"
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select option</option>
                {referralOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Additional Comments */}
            <div>
              <label htmlFor="additionalComments" className="block text-gray-700 font-medium mb-2">
                Additional Comments or Questions <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Anything else you'd like us to know..."
              ></textarea>
            </div>

            {/* Terms and Privacy */}
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                By submitting this form, you agree to our <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>. We'll use your information to respond to your inquiry and may contact you about our services.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
            >
              Previous Step
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Submit Quote
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default QuoteForm;