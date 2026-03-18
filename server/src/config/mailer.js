/**
 * Email transporter configuration
 *
 * Configures the nodemailer transporter for sending emails via Gmail.
 * This module sets up the email service with authentication credentials
 * from environment variables for secure email delivery.
 */

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Configured nodemailer transporter for Gmail service
 * Uses environment variables for authentication credentials
 */
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
