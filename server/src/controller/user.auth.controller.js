import bcrypt from "bcrypt";
import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { deleteData, getById, insertData } from "../util/dbCrud.js";
import { errorResponse, successResponse } from "../util/response.js";
// import {
//   storeOTP,
//   getOtpVerification,
//   deleteOTP,
// } from "../services/db/verifyOTP.db.js";

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
