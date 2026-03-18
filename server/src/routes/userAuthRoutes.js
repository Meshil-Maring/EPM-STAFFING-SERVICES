/**
 * User authentication routes module
 *
 * Defines all API endpoints related to user authentication operations including
 * OTP (One-Time Password) sending, verification, and resending. These routes
 * handle the email-based authentication flow for user registration and login.
 */

import express from "express";
import {
  resendOTPController,
  sendMailController,
  verifiedOTPContoller,
} from "../controller/user.auth.controller.js";

/**
 * Create Express router instance for authentication-related routes
 */
const router = express.Router();

/**
 * Authentication API endpoints
 * Base path: /auth
 */

// POST endpoints for OTP-based authentication
router.post("/send-otp", sendMailController); // Send OTP to user's email
router.post("/verify-otp", verifiedOTPContoller); // Verify OTP provided by user
router.post("/resend-otp", resendOTPController); // Resend OTP to user's email

export default router;
