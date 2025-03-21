// apps/frontend/src/app/components/contact/ContactForm.jsx
import React from 'react';
import { FaPaperPlane, FaCheck } from 'react-icons/fa';
import { Button } from '../common';
import useContactForm from '../../hooks/useContactForm';

export const ContactForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    submitError
  } = useContactForm();

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isSubmitted ? (
        <div className="p-4 mb-6 flex items-center bg-green-50 border-l-4 border-green-500 text-green-700">
          <FaCheck className="text-green-500 mr-3" />
          <div>
            <p className="font-medium">Thank you for your message!</p>
            <p>We will get back to you as soon as possible.</p>
          </div>
        </div>
      ) : null}

      {submitError && (
        <div className="p-4 mb-6 flex items-center bg-red-50 border-l-4 border-red-500 text-red-700">
          <div>
            <p className="font-medium">An error occurred</p>
            <p>{submitError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div className="col-span-1">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="col-span-1">
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
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="col-span-1">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
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
            disabled={isSubmitting}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Subject Field */}
        <div className="col-span-1">
          <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select a subject</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Service Information">Service Information</option>
            <option value="Project Consultation">Project Consultation</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="col-span-2">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="How can we help you?"
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-2">
          <Button
            type="submit"
            variant="primary"
            size="large"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Send Message
              </>
            )}
          </Button>
          <p className="mt-3 text-sm text-gray-500">
            <span className="text-red-500">*</span> Required fields
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;