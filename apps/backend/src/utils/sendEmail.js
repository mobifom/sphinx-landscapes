// apps/backend/src/utils/sendEmail.js
const nodemailer = require('nodemailer');

/**
 * Send email using nodemailer
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email message body
 * @param {string} options.html - Email HTML body (optional)
 * @returns {Promise} - Resolves when email is sent
 */
const sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Define mail options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME || 'Sphinx Landscapes'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Add HTML if provided
  if (options.html) {
    mailOptions.html = options.html;
  }

  // Send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;