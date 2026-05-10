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

const sendOTPService = async (data, user_id = null) => {
  const { email, purpose } = data;
  const OTP_code = generateOTP().toString();

  const hashotp = await bcrypt.hash(OTP_code, 10);
  const expireTime = new Date(Date.now() + 5 * 60 * 1000);

  const dataOjb = {
    email: email,
    otp_hash: hashotp,
    purpose: purpose,
    expires_at: expireTime,
  };

  const resultData = await insertData("otp_verification", dataOjb);

  // Send otp to user mail
  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: emailTemplate(OTP_code, "verify your email address"),
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
        error: "user_id and otp_code are required",
      });
    }

    const { otp_hash } = await getById("otp_verification", id);

    if (!otp_hash) {
      return res.status(404).json({
        error: "Invalid user or OTP not found",
      });
    }

    const otpValid = await bcrypt.compare(String(otp_code), otp_hash);

    if (!otpValid) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Delete the otp after varification
    // await deleteData(id, "otp_verification");

    return successResponse(res, "Email verify successfully", 200);
  } catch (err) {
    return errorResponse(res, "Email verify failed", 400);
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

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, "Email is required", 400);
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      // Return success to avoid user enumeration
      return successResponse(res, "If that email exists, an OTP has been sent", null, 200);
    }

    const { id } = await sendOTPService({ email, purpose: "reset_password" });

    return successResponse(res, "OTP sent successfully", id, 200);
  } catch (err) {
    return errorResponse(res, "Failed to send OTP", 500, err.message);
  }
};

export const resetPasswordController = async (req, res) => {
  const { otp_id, otp_code, email, new_password } = req.body;

  if (!otp_id || !otp_code || !email || !new_password) {
    return errorResponse(res, "otp_id, otp_code, email, and new_password are required", 400);
  }

  try {
    const otpRecord = await getById("otp_verification", otp_id);

    if (!otpRecord) {
      return errorResponse(res, "Invalid or expired OTP", 400);
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
      await deleteData(otp_id, "otp_verification");
      return errorResponse(res, "OTP has expired", 400);
    }

    const otpValid = await bcrypt.compare(String(otp_code), otpRecord.otp_hash);

    if (!otpValid) {
      return errorResponse(res, "Invalid OTP", 401);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(new_password, 12);

    await updateById("users", user.id, { password: hashedPassword });

    await deleteData(otp_id, "otp_verification");

    return successResponse(res, "Password reset successfully", null, 200);
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
