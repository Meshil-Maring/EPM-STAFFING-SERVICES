/**
 * OTP generation utility
 *
 * Generates random One-Time Password (OTP) codes for email-based authentication.
 * Uses Node.js crypto module to generate cryptographically secure random numbers.
 */

import crypto from "crypto";

/**
 * Generate a random 6-7 digit OTP code
 * @param {Object} req - Express request object (not used in this function)
 * @param {Object} res - Express response object (not used in this function)
 * @returns {string} A random 6-7 digit OTP code as a string
 */
export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};
