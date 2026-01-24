import bcrypt from "bcrypt";
import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";
import { storeOTP } from "../services/storeOTP.db.js";

export const sendMailController = async (req, res) => {
  try {
    const { user_id, email } = req.body;

    if (!user_id || !email) {
      return res.status(400).json({
        success: false,
        message: "user_id and email are required",
      });
    }

    // Generate OTP (as string)
    const OTP_code = generateOTP().toString();

    // Send email
    await sendEmail({
      to: email,
      subject: "Verify Your Email",
      html: emailTemplate(OTP_code, "verify your email address"),
    });

    // Hash OTP
    const hashotp = await bcrypt.hash(OTP_code, 12);

    // Store OTP
    await storeOTP(
      user_id,
      email,
      hashotp,
      "verify email",
      new Date(Date.now() + 5 * 60 * 1000),
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Email send failed:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again later.",
    });
  }
};
