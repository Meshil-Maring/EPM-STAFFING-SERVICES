import crypto from "crypto";

export const generateOTP = (req, res) => {
  return crypto.randomInt(100000, 9999999).toString();
};
