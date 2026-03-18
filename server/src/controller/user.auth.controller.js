/**
 * User authentication controller module
 *
 * Handles OTP (One-Time Password) based authentication operations including
 * sending OTP emails, verifying OTP codes, and resending OTPs. This controller
 * manages the email verification flow for user registration and authentication.
 */

import bcrypt from "bcrypt";
import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";
import {
  storeOTP,
  getOtpVerification,
  deleteOTP,
} from "../services/db/verifyOTP.db.js";

/**
 * Reusable service function to send OTP to user's email
 * @param {Object} params - Object containing user_id and email
 * @param {string} params.user_id - The user's ID
 * @param {string} params.email - The user's email address
 * @returns {Promise<void>} Promise that resolves when OTP is sent
 */
const sendOTPService = async ({ user_id, email }) => {
  const OTP_code = generateOTP().toString();

  const hashotp = await bcrypt.hash(OTP_code, 10);

  await storeOTP(
    user_id,
    email,
    hashotp,
    "verify email",
    new Date(Date.now() + 5 * 60 * 1000),
  );

  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: emailTemplate(OTP_code, "verify your email address"),
  });
};

/**
 * Send OTP to user's email for verification
 * @param {Object} req - Express request object containing user_id and email in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success/failure status
 */
export const sendMailController = async (req, res) => {
  try {
    const { user_id, email } = req.body;

    if (!user_id || !email) {
      return res.status(400).json({
        success: false,
        message: "user_id and email are required",
      });
    }

    await sendOTPService({ user_id, email });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

/**
 * Verify OTP code provided by user
 * @param {Object} req - Express request object containing user_id and otp_code in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with verification result
 */
export const verifiedOTPContoller = async (req, res) => {
  try {
    const { user_id, otp_code } = req.body;

    if (!user_id || !otp_code) {
      return res.status(400).json({
        error: "user_id and otp_code are required",
      });
    }

    const db_otp = await getOtpVerification(user_id);

    if (!db_otp) {
      return res.status(404).json({
        error: "Invalid user or OTP not found",
      });
    }

    const otpValid = await bcrypt.compare(String(otp_code), db_otp.otp_hash);

    if (!otpValid) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    await deleteOTP(user_id);

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
};

/**
 * Resend OTP to user's email
 * @param {Object} req - Express request object containing user_id and email in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with resend result
 */
export const resendOTPController = async (req, res) => {
  try {
    const { user_id, email } = req.body;

    if (!user_id || !email) {
      return res.status(400).json({
        error: "user_id and email are required",
      });
    }

    // invalidate old OTP
    await deleteOTP(user_id);

    // send new OTP
    await sendOTPService({ user_id, email });

    return res.status(200).json({
      message: "OTP resent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to resend OTP",
    });
  }
};
