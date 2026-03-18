/**
 * Email sending service
 *
 * Provides functionality to send emails using the configured transporter.
 * This service handles the email sending logic and error handling for
 * the OTP verification and other email-based features.
 */

import { transporter } from "../config/mailer.js";

/**
 * Send an email using the configured transporter
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} [options.text] - Plain text email body
 * @param {string} [options.html] - HTML email body
 * @returns {Promise<Object>} Promise resolving to email info object
 * @throws {Error} If email sending fails
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"EPM Staffing Services" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};
