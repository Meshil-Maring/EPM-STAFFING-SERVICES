import { generateOTP } from "../util/generateOTP.js";

export const sendOTP = (req, res) => {
  const OTP_code = generateOTP();

  console.log(OTP_code);
};
