/**
 * Generates a 6-digit OTP using browser-compatible random number generation
 * @returns {string} A 6-digit OTP string
 */
export const getOTP = () => {
  let otp = "";

  // Generate 6 random digits
  for (let i = 0; i < 6; i++) {
    // Use Math.random() for browser compatibility
    // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
    // Multiply by 10 to get a number between 0 and 10, then floor to get 0-9
    const digit = Math.floor(Math.random() * 10);
    otp += digit.toString();
  }

  return otp;
};
