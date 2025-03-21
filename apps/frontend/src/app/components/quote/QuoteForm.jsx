// apps/frontend/src/app/components/quote/QuoteForm.jsx
import React from 'react';
import { FaPaperPlane, FaUser, FaHome, FaTools, FaInfoCircle } from 'react-icons/fa';
import { Button } from '../common';
import useQuoteForm from '../../hooks/useQuoteForm';

export const QuoteForm = ({ onSubmitSuccess }) => {
  const {
    formData,
    currentStep,
    handleChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    submitError
  } = useQuoteForm();

  // If form is successfully submitted, notify parent component
  React.useEffect(() => {
    if (isSubmitted && onSubmitSuccess) {
      onSubmitSuccess();
    }
  }, [isSubmitted, onSubmitSuccess]);

  // Service options
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

  // Property type options
  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'other', label: 'Other' },
  ];

  // Property size options
  const propertySizeOptions = [
    { value: 'small', label: 'Small (Less than 1,000 sq ft)' },
    { value: 'medium', label: 'Medium (1,000 - 5,000 sq ft)' },
    { value: 'large', label: 'Large (5,000 - 10,000 sq ft)' },
    { value: 'extra-large', label: 'Extra Large (Over 10,000 sq ft)' },
    { value: 'not-sure', label: 'Not Sure' },
  ];

  // Timeframe options
  const timeframeOptions = [
    { value: 'immediately', label: 'As Soon as Possible' },
    { value: '1-3-months', label: 'Within 1-3 Months' },
    { value: '3-6-months', label: 'Within 3-6 Months' },
    { value: '6-plus-months', label: 'More than 6 Months Out' },
    { value: 'not-sure', label: 'Not Sure / Flexible' },
  ];

  // Budget options
  const budgetOptions = [
    { value: 'under-5000', label: 'Under $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000-plus', label: 'Over $50,000' },
    { value: 'not-sure', label: 'Not Sure / Flexible' },
  ];

  // Referral options
  const referralOptions = [
    { value: 'search', label: 'Search Engine (Google, Bing, etc.)' },
    { value: 'social', label: 'Social Media' },
    { value: 'referral', label: 'Referral from a Friend/Family' },
    { value: 'drove-by', label: 'Drove By Your Work' },
    { value: 'review-site', label: 'Review Website (Yelp, Houzz, etc.)' },
    { value: 'repeat', label: 'Returning Customer' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="quote-form">
      {/* Error Message */}
      {submitError && (
        <div className="p-4 mb-6 flex items-center bg-red-50 border-l-4 border-red-500 text-red-700">
          <div>
            <p className="font-medium">An error occurred</p>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className={`text-center flex-1 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaUser className="h-4 w-4" />
            </div>
            <span className="text-sm">Contact Info</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaHome className="h-4 w-4" />
            </div>
            <span className="text-sm">Property Info</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaTools className="h-4 w-4" />
            </div>
            <span className="text-sm">Project Details</span>
          </div>
          <div className={`text-center flex-1 ${currentStep >= 4 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`h-8 w-8 rounded-full mx-auto flex items-center justify-center mb-2 ${currentStep >= 4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
              <FaInfoCircle className="h-4 w-4" />
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