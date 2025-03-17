// apps/frontend/src/app/pages/PrivacyPolicyPage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/common/PageHeader';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Privacy Policy | Sphinx Landscapes';

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <PageHeader
        title="Privacy Policy"
        description="How we collect, use, and protect your information"
        bgImage="/assets/images/about/about-header.jpg"
        breadcrumbs={[{ text: 'Privacy Policy', link: '/privacy-policy' }]}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <p>Last Updated: March 1, 2023</p>

              <p>This Privacy Policy describes how Sphinx Landscapes ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website (sphinxlandscapes.com), use our services, or otherwise interact with us.</p>

              <h2>Information We Collect</h2>

              <h3>Personal Information You Provide to Us</h3>
              <p>We collect personal information that you voluntarily provide to us when you:</p>
              <ul>
                <li>Fill out forms on our website (contact forms, quote requests, newsletter sign-ups)</li>
                <li>Correspond with us by phone, email, or other means</li>
                <li>Request information about our services</li>
                <li>Purchase services from us</li>
                <li>Provide feedback or testimonials</li>
              </ul>

              <p>This information may include:</p>
              <ul>
                <li>Contact information (name, email address, phone number, mailing address)</li>
                <li>Property details relevant to landscaping services</li>
                <li>Service preferences and project requirements</li>
                <li>Payment information (handled securely through our payment processors)</li>
              </ul>

              <h3>Information Automatically Collected</h3>
              <p>When you visit our website, we may automatically collect certain information about your device and usage patterns. This information may include:</p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring website</li>
                <li>Pages viewed and time spent on our website</li>
                <li>Links clicked</li>
                <li>Geographic location (city and state level)</li>
                <li>Device information</li>
              </ul>

              <p>We collect this information using cookies and similar technologies. You can control cookies through your browser settings and other tools. However, disabling cookies may limit your ability to use certain features of our website.</p>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process and fulfill your service requests</li>
                <li>Communicate with you about appointments, services, and promotional offers</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products, services, and features</li>
                <li>Analyze how visitors use our website to improve user experience</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Comply with our legal obligations</li>
              </ul>

              <h2>How We Share Your Information</h2>
              <p>We may share your personal information in the following situations:</p>
              <ul>
                <li><strong>Service Providers:</strong> We may share your information with third-party vendors, consultants, and other service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, financing, or sale of business assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                <li><strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy, safety, or property, and/or that of our customers or others.</li>
              </ul>

              <h2>Your Privacy Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal information, which may include:</p>
              <ul>
                <li>Accessing the personal information we hold about you</li>
                <li>Correcting any inaccurate personal information</li>
                <li>Deleting your personal information</li>
                <li>Restricting or objecting to our use of your personal information</li>
                <li>Receiving your personal information in a usable electronic format</li>
                <li>Withdrawing your consent at any time (if we rely on consent as a legal basis for processing)</li>
              </ul>

              <p>To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.</p>

              <h2>Data Security</h2>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>

              <h2>Data Retention</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>

              <p>When we no longer need your personal information, we will securely delete or anonymize it so that it can no longer be associated with you.</p>

              <h2>Children's Privacy</h2>
              <p>Our website and services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems.</p>

              <h2>Third-Party Links</h2>
              <p>Our website may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices. We encourage you to read the privacy policy of every website you visit.</p>

              <h2>Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on our website and update the "Last Updated" date at the top of this Privacy Policy.</p>

              <p>We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your personal information.</p>

              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at:</p>

              <p>
                Sphinx Landscapes<br />
                123 Greenway Drive<br />
                Metropolis, NY 10001<br />
                Email: privacy@sphinxlandscapes.com<br />
                Phone: (555) 123-4567
              </p>

              <p>We will respond to your request as soon as possible and no later than 30 days from the date of receipt.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;