import bcrypt from "bcrypt";
import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { insertData } from "../util/dbCrud.js";
// import {
//   storeOTP,
//   getOtpVerification,
//   deleteOTP,
// } from "../services/db/verifyOTP.db.js";

const sendOTPService = async (data, user_id = null) => {
  const { email, purpose } = data;
  const OTP_code = generateOTP().toString();

  const hashotp = await bcrypt.hash(OTP_code, 10);
  const expireTime = new Date(Date.now() + 2 * 60 * 1000);

  const dataOjb = {
    email: email,
    otp_hash: hashotp,
    purpose: email,
    expires_at: expireTime,
  };

  console.log(dataOjb);

  await insertData("otp_verification", dataOjb);

  await sendEmail({
    to: email,
    subject: "Verify Your Email",
    html: emailTemplate(OTP_code, "verify your email address"),
  });
};

export const sendMailController = async (req, res) => {
  try {
    const data = await req.body;
    console.log("data", data);

    if (!data.email) {
      return res.status(400).json({
        success: false,
        message: "email are required",
      });
    }

    await sendOTPService(data);

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
