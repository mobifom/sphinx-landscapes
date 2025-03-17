// apps/frontend/src/app/pages/TermsOfServicePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';

const TermsOfServicePage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Terms of Service | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHeader
        title="Terms of Service"
        description="Rules and guidelines for using our services"
        bgImage="/assets/images/about/about-header.jpg"
        breadcrumbs={[{ text: 'Terms of Service', link: '/terms-of-service' }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: March 1, 2023</p>

              <p>Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the sphinxlandscapes.com website or any services provided by Sphinx Landscapes ("we", "us", "our").</p>

              <h2>Acceptance of Terms</h2>
              <p>By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to all the terms and conditions of this agreement, you may not access the website or use any of our services.</p>

              <h2>Services</h2>
              <p>Sphinx Landscapes provides landscaping design, installation, and maintenance services as described on our website. All services are subject to availability, and we reserve the right to modify, suspend, or discontinue any service at any time without notice or liability.</p>

              <h3>Service Estimates and Quotes</h3>
              <p>Any estimates or quotes provided through our website or during consultations are approximations based on the information provided by you. Final pricing may vary based on site conditions, material costs, and other factors identified during the detailed assessment of your project.</p>

              <h3>Service Scheduling</h3>
              <p>Service scheduling is subject to availability, weather conditions, and other factors. While we strive to meet all scheduled appointments, we reserve the right to reschedule as necessary. We will make reasonable efforts to provide advance notice of any changes.</p>

              <h2>User Responsibilities</h2>
              <h3>Account Information</h3>
              <p>When you create an account or submit information through our website, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

              <h3>Property Access</h3>
              <p>For services requiring access to your property, you agree to provide safe and reasonable access to the areas where work will be performed. You are responsible for identifying and disclosing the location of any underground utilities, sprinkler systems, or other features that may affect the provision of services.</p>

              <h3>Permissions and Approvals</h3>
              <p>You are responsible for obtaining any necessary permits, homeowner association approvals, or other authorizations required for the landscaping services you request. We may assist with this process, but the ultimate responsibility remains with you.</p>

              <h2>Payment Terms</h2>
              <h3>Pricing</h3>
              <p>All prices are listed in US dollars and are subject to change without notice. Applicable taxes will be added to the final invoice.</p>

              <h3>Payment Methods</h3>
              <p>We accept various payment methods as indicated on our website or invoices. By providing a payment method, you represent and warrant that you are authorized to use the designated payment method.</p>

              <h3>Deposits</h3>
              <p>For certain services, we may require a deposit before commencing work. The amount of the deposit will be specified in your service agreement or quote.</p>

              <h3>Invoices</h3>
              <p>Invoices are due upon receipt unless otherwise specified. Late payments may be subject to interest charges of 1.5% per month or the maximum rate permitted by law, whichever is lower.</p>

              <h2>Intellectual Property</h2>
              <h3>Website Content</h3>
              <p>The content on our website, including text, graphics, logos, images, and software, is owned by or licensed to Sphinx Landscapes and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.</p>

              <h3>Landscape Designs</h3>
              <p>All landscape designs, plans, and specifications created by Sphinx Landscapes remain our intellectual property until full payment is received. After payment, you receive a license to use the designs for your property, but we retain the right to use photographs and descriptions of the completed project for promotional purposes.</p>

              <h2>Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Sphinx Landscapes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:</p>
              <ul>
                <li>Your use or inability to use our website or services</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                <li>Any interruption or cessation of transmission to or from our website</li>
                <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through our website</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through our website</li>
              </ul>

              <h2>Warranty and Guarantees</h2>
              <h3>Plant Material</h3>
              <p>We provide a one-year limited warranty on most plant material we install, subject to proper care and maintenance by the customer. This warranty does not cover damage from acts of nature, animals, improper care, or other factors beyond our control.</p>

              <h3>Hardscaping</h3>
              <p>Hardscaping elements like patios, walkways, and retaining walls typically carry a 3-year warranty against defects in materials and workmanship, subject to proper use and maintenance.</p>

              <h3>Irrigation Systems</h3>
              <p>Irrigation systems we install carry a 1-year warranty on parts and labor, excluding damage from freezing, improper winterization, or physical damage.</p>

              <h2>Disclaimers</h2>
              <p>Our website and services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation of our website or the content, information, materials, or products included on it.</p>

              <p>We do not guarantee that the results that may be obtained from the use of our services will be effective, reliable, or accurate, or will meet your requirements. We do not guarantee that you will be able to access or use our services at times or locations of your choosing, or that we will have adequate capacity for our services as a whole or in any geographic location.</p>

              <h2>Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless Sphinx Landscapes, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of our website and services, your violation of these Terms, or your violation of any third-party rights.</p>

              <h2>Termination</h2>
              <p>We may terminate or suspend your access to our website and services immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms of Service.</p>

              <p>Upon termination, your right to use our website and services will immediately cease. If you wish to terminate your account or service agreement, you may simply discontinue using our website or contact us to cancel scheduled services.</p>

              <h2>Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.</p>

              <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>

              <h2>Changes to Terms of Service</h2>
              <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

              <p>By continuing to access or use our website and services after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use our website and services.</p>

              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>

              <p>
                Sphinx Landscapes<br />
                123 Greenway Drive<br />
                Metropolis, NY 10001<br />
                Email: legal@sphinxlandscapes.com<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfServicePage;