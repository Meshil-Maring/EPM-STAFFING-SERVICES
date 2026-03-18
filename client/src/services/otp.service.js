/**
 * OTP Service
 *
 * Provides client-side functionality for OTP (One-Time Password) operations
 * including sending OTP emails, verifying OTP codes, and resending OTPs.
 * This service integrates with the server-side OTP endpoints.
 */
import { getOTP } from "../utils/getOTP";

/**
 * Base URL for API endpoints
 */
const API_BASE_URL = "http://localhost:5000/api";

/**
 * Send OTP to user's email for verification
 * @param {string} email - User's email address
 * @param {string} user_id - User's ID (if available)
 * @returns {Promise<Object>} Promise resolving to API response
 */
export const sendOTP = async (email, user_id = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user_id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

/**
 * Verify OTP code provided by user
 * @param {string} user_id - User's ID
 * @param {string} otp_code - OTP code to verify
 * @returns {Promise<Object>} Promise resolving to verification result
 */
export const verifyOTP = async (user_id, otp_code) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        otp_code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Invalid OTP");
    }

    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

/**
 * Resend OTP to user's email
 * @param {string} email - User's email address
 * @param {string} user_id - User's ID
 * @returns {Promise<Object>} Promise resolving to resend result
 */
export const resendOTP = async (email, user_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        user_id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to resend OTP");
    }

    return data;
  } catch (error) {
    console.error("Error resending OTP:", error);
    throw error;
  }
};

/**
 * Register user with form data and handle OTP verification
 * @param {Object} formData - Complete form data from all steps
 * @returns {Promise<Object>} Promise resolving to registration result
 */
export const registerUser = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

/**
 * Generate OTP for testing purposes (client-side only)
 * @returns {string} 6-digit OTP code
 */
export const generateTestOTP = () => {
  return getOTP();
};

/**
 * Validate OTP format
 * @param {string} otp - OTP code to validate
 * @returns {boolean} True if OTP is valid format
 */
export const validateOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};
