import bcrypt from "bcrypt";

import { sendEmail } from "../services/sendEmail.js";
import { generateOTP } from "../util/generateOTP.js";
import { emailTemplate } from "../util/emailTemplate.js";

export const sendMailController = async (req, res) => {
  // Sending otp to user email
  try {
    const OTP_code = generateOTP();

    // await sendEmail({
    //   to: "dsmeshilmaring13@gmail.com",
    //   subject: "Welcome to My app",
    //   html: emailTemplate(OTP_code, "verify your email address"),
    // });

    // hashing the opt code
    const otphash = await bcrypt.hash(OTP_code, 12);

    //

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("Email send failed: ", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try agaiun later.",
    });
  }
};
