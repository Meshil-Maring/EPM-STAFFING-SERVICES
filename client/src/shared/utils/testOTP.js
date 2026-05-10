/**
 * Test utility to verify OTP functionality
 * This file can be used to test the OTP generation and validation
 */

import { getOTP } from "./getOTP";

/**
 * Test OTP generation
 */
export const testOTPGeneration = () => {
  ("Testing OTP Generation...");

  // Generate multiple OTPs to test randomness
  const otps = [];
  for (let i = 0; i < 5; i++) {
    const otp = getOTP();
    `Generated OTP ${i + 1}: ${otp}`;

    // Validate OTP format
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      `✓ OTP ${i + 1} is valid format`;
    } else {
      `✗ OTP ${i + 1} is invalid format`;
    }

    otps.push(otp);
  }

  // Check for uniqueness (should be different most of the time)
  const uniqueOTPs = new Set(otps);
  `Generated ${uniqueOTPs.size} unique OTPs out of ${otps.length}`;

  return otps;
};

/**
 * Test OTP validation logic
 */
export const testOTPValidation = (generatedOTP, userOTP) => {
  ("Testing OTP Validation...");
  `Generated OTP: ${generatedOTP}`;
  `User OTP: ${userOTP}`;

  const isValid = generatedOTP === userOTP;
  `Validation result: ${isValid ? "✓ Valid" : "✗ Invalid"}`;

  return isValid;
};

// Run tests if this file is executed directly
if (typeof window !== "undefined") {
  // Browser environment
  ("OTP Test Suite");
  const otps = testOTPGeneration();
  if (otps.length > 0) {
    testOTPValidation(otps[0], otps[0]); // Should be valid
    testOTPValidation(otps[0], "123456"); // Should be invalid (unless by chance)
  }
}
