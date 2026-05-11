import bcrypt from "bcrypt";
import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { deleteData, getById, insertData, updateById } from "../util/dbCrud.js";
import { errorResponse, successResponse } from "../util/response.js";
import { getUserByEmail } from "../services/db/user.service.db.js";

// import {
//   storeOTP,
//   getOtpVerification,
//   deleteOTP,
// } from "../services/db/verifyOTP.db.js";

/*
===========================
    RELATED OTP
===========================
*/

const sendOTPService = async (data) => {
  const { email, purpose } = data;
  const OTP_code = generateOTP().toString();

  const hashotp = await bcrypt.hash(OTP_code, 10);
  const expireTime = new Date(Date.now() + 2 * 60 * 1000);

  const resultData = await insertData("otp_verification", {
    email,
    otp_hash: hashotp,
    purpose,
    expires_at: expireTime,
  });

  const isReset = purpose === "reset_password";
  await sendEmail({
    to: email,
    subject: isReset ? "Reset Your Password – EPM Staffing" : "Verify Your Email – EPM Staffing",
    html: emailTemplate(OTP_code, isReset ? "reset your password" : "verify your email address"),
  });

  return resultData;
};

export const sendMailController = async (req, res) => {
  try {
    const data = await req.body;

    if (!data.email) {
      return res.status(400).json({
        success: false,
        message: "email are required",
      });
    }

    const { id } = await sendOTPService(data);

    return successResponse(res, "OTP send successfully", id, 200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// Verified OTP code by id
export const verifiedOTPContoller = async (req, res) => {
  try {
    const { id, otp_code } = req.body;

    if (!id || !otp_code) {
      return res.status(400).json({
        success: false,
        error: "id and otp_code are required",
      });
    }

    const otpRecord = await getById("otp_verification", id);

    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        error: "Invalid or expired OTP",
      });
    }

    const otpValid = await bcrypt.compare(String(otp_code), otpRecord.otp_hash);

    if (!otpValid) {
      return res.status(401).json({ success: false, error: "Invalid OTP. Please check and try again." });
    }

    // OTP record is kept so the same id+code can be used in reset-password.
    // Expiry is enforced there.
    return successResponse(res, "OTP verified successfully", null, 200);
  } catch (err) {
    return errorResponse(res, "OTP verification failed", 400);
  }
};

//  resend otp controller
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

/*
=======================================
        RELATED PASSWORD
=======================================
*/
export const verifyPasswordController = async (req, res) => {
  const { password, user_id } = req.body;

  console.log(password, user_id);

  try {
    const result = await getById("users", user_id);

    if (!result || result.length === 0) {
      return errorResponse(res, "User not found!", 404);
    }

    const hashPassword = result.password;

    const isCorrectPassword = await bcrypt.compare(password, hashPassword);

    if (!isCorrectPassword) {
      return errorResponse(res, "Wrong password", 401);
    }

    return successResponse(res, "Verify successful", 200);
  } catch (err) {
    return errorResponse(res, "Verify password failed", 500, err.message);
  }
};

export const updatePasswordController = async (req, res) => {
  const { password, user_id } = req.body;

  console.log(password, user_id);

  try {
    const result = await getById("users", user_id);

    if (!result || result.length === 0) {
      return errorResponse(res, "User not found!", 404);
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await updateById("users", user_id, {
      password: hashPassword,
    });

    return successResponse(res, "Update password successful", user, 200);
  } catch (err) {
    return errorResponse(res, "Update password failed", 500, err.message);
  }
};

/*
=======================================
        RELATED EMAIL
=======================================
*/

export const updateEmailController = async (req, res) => {
  const { email, user_id } = req.body;

  try {
    // Check input
    if (!email || !user_id) {
      return errorResponse(res, "Email and user_id are required", 400);
    }

    // Validate email format
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
      return errorResponse(res, "Invalid email format", 400);
    }

    const result = await getById("users", user_id);

    if (!result || result.length === 0) {
      return errorResponse(res, "User not found!", 404);
    }

    // Update email
    const user = await updateById("users", user_id, {
      email: email,
    });

    return successResponse(res, "Update email successful", user, 200);
  } catch (err) {
    return errorResponse(res, "Update email failed", 500, err.message);
  }
};

/*
=======================================
        FORGOT / RESET PASSWORD
=======================================
*/

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validatePasswordStrength = (password) => {
  if (!password || password.length < 5)
    return "Password must be at least 5 characters";
  if (!/^[A-Z]/.test(password))
    return "Password must start with a capital letter";
  if (!/\d/.test(password))
    return "Password must contain at least one number";
  return null;
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, "Email is required", 400);
  }

  if (!EMAIL_REGEX.test(email)) {
    return errorResponse(res, "Invalid email format", 400);
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      // Generic response — prevents user enumeration
      return successResponse(
        res,
        "If that email is registered, an OTP has been sent. Please check your inbox.",
        null,
        200
      );
    }

    const { id } = await sendOTPService({ email, purpose: "reset_password" });

    return successResponse(res, "OTP sent. It expires in 15 minutes.", id, 200);
  } catch (err) {
    return errorResponse(res, "Failed to send OTP", 500, err.message);
  }
};

export const resetPasswordController = async (req, res) => {
  const { otp_id, otp_code, email, new_password } = req.body;

  // ── 1. Presence check ────────────────────────────────────────────────────
  if (!otp_id || !otp_code || !email || !new_password) {
    return errorResponse(
      res,
      "otp_id, otp_code, email, and new_password are required",
      400
    );
  }

  // ── 2. Email format ───────────────────────────────────────────────────────
  if (!EMAIL_REGEX.test(email)) {
    return errorResponse(res, "Invalid email format", 400);
  }

  // ── 3. Server-side password strength (mirrors client rules) ──────────────
  const passwordError = validatePasswordStrength(new_password);
  if (passwordError) {
    return errorResponse(res, passwordError, 400);
  }

  try {
    // ── 4. Fetch OTP record ─────────────────────────────────────────────────
    const otpRecord = await getById("otp_verification", otp_id);
    console.log(otpRecord);

    if (!otpRecord) {
      return errorResponse(res, "Invalid or expired OTP", 400);
    }

    // ── 6. Purpose guard — must be a reset_password OTP ───────────────────
    if (otpRecord.purpose !== "reset_password") {
      return errorResponse(res, "Invalid OTP", 400);
    }

    // ── 7. Email binding — OTP must belong to this exact email ────────────
    if (otpRecord.email !== email) {
      return errorResponse(res, "Invalid OTP", 400);
    }

    // ── 8. Verify the OTP code ────────────────────────────────────────────
    const otpValid = await bcrypt.compare(String(otp_code), otpRecord.otp_hash);

    if (!otpValid) {
      return errorResponse(
        res,
        "Incorrect OTP. Please check and try again.",
        401
      );
    }

    // ── 9. Fetch user account ─────────────────────────────────────────────
    const user = await getUserByEmail(email);

    if (!user) {
      return errorResponse(res, "No account found for this email", 404);
    }

    // ── 10. Hash and persist the new password ─────────────────────────────
    const hashedPassword = await bcrypt.hash(new_password, 12);
    await updateById("users", user.id, { password: hashedPassword });

    // ── 11. Invalidate the OTP so it cannot be reused ─────────────────────
    await deleteData(otp_id, "otp_verification");

    return successResponse(
      res,
      "Password reset successfully. You can now sign in with your new password.",
      null,
      200
    );
  } catch (err) {
    return errorResponse(res, "Failed to reset password", 500, err.message);
  }
};

/*
=======================================
        LOG OUT
=======================================
*/

export const logOutController = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    res.clearCookie("session_id");
    return res.json({ success: true });
  });
};
