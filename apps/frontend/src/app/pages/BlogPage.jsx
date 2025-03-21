// apps/frontend/src/app/pages/QuotePage.jsx
import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { QuoteForm } from '../components/quote/QuoteForm';
import { Button } from '../components/common';
import { FaCheck, FaTools, FaRegLightbulb, FaRegClock, FaRegSmile } from 'react-icons/fa';

const QuotePage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = 'Request a Quote | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (formData) => {
    // The form component will handle the API call
    // This is a callback for when the form has been successfully submitted
    setFormSubmitted(true);
  };

  return (
    <main>
      <PageHeader
        title="Request a Free Quote"
        description="Tell us about your project and we'll provide a detailed estimate for your landscaping needs."
        bgImage="/assets/images/quote/quote-header.jpg"
        breadcrumbs={[{ text: 'Quote', link: '/quote' }]}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {formSubmitted ? (
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-4">
                  <FaCheck className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-heading font-semibold mb-4">Thank You!</h2>
                <p className="text-lg text-gray-600">
                  Your quote request has been successfully submitted. We appreciate your interest in Sphinx Landscapes.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-heading font-medium mb-4">What Happens Next?</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Initial Review</p>
                      <p className="text-gray-600">One of our team members will review your request within 24 hours.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Contact</p>
                      <p className="text-gray-600">We'll reach out to discuss your project in more detail and arrange a site visit if needed.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3 mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Detailed Quote</p>
                      <p className="text-gray-600">We'll provide a comprehensive quote tailored to your specific needs and budget.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <p className="text-center mb-6">
                If you have any questions in the meantime, please don't hesitate to contact us.
              </p>

              <div className="text-center">
                <Button
                  as="link"
                  to="/"
                  variant="primary"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                  <h2 className="text-2xl font-heading font-semibold mb-6">Tell Us About Your Project</h2>
                  <QuoteForm onSubmitSuccess={handleFormSubmit} />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                  <h3 className="text-xl font-heading font-semibold mb-4">Why Request a Quote?</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <FaTools className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">Get a detailed breakdown of services and materials for your project.</p>
                    </li>
                    <li className="flex">
                      <FaRegLightbulb className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">Receive expert recommendations tailored to your specific needs.</p>
                    </li>
                    <li className="flex">
                      <FaRegClock className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">Understand timeline expectations for your landscaping project.</p>
                    </li>
                    <li className="flex">
                      <FaRegSmile className="text-primary mt-1 mr-3 flex-shrink-0" />
                      <p className="text-gray-600">No obligation - our quotes are free and pressure-free.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary-light bg-opacity-10 rounded-lg p-6 md:p-8">
                  <h3 className="text-xl font-heading font-semibold mb-4">Have Questions?</h3>
                  <p className="text-gray-600 mb-4">
                    If you prefer to speak with someone directly before requesting a quote, we're here to help.
                  </p>
                  <p className="font-medium mb-2">Call us:</p>
                  <p className="text-primary text-xl font-medium mb-4">(555) 123-4567</p>
                  <p className="font-medium mb-2">Email us:</p>
                  <p className="text-primary text-xl font-medium">
                    <a href="mailto:info@sphinxlandscapes.com" className="hover:underline">info@sphinxlandscapes.com</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default QuotePage;