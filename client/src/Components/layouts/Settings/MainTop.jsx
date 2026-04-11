import React, { useState, useEffect, useContext } from "react";
import OTPOverlay from "./OTPOverlay";
import AccountActions from "./AccountActions";
import { Company_context } from "../../../context/AccountsContext";
import { showError, showInfo, showSuccess } from "../../../utils/toastUtils";
import { getOTP } from "../../../utils/getOTP";

/**
 * MainTop component for settings page
 *
 * Handles OTP verification and account actions for the settings page.
 * Works with backend data structure containing user information.
 */
function MainTop({ logged_user_data }) {
  const [OTPOverlayOpen, setOTPOverlayOpen] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  // State to manage email input value
  const [emailValue, setEmailValue] = useState("");

  // State to store the generated OTP for validation
  const [generatedOTP, setGeneratedOTP] = useState("");

  // Countdown logic
  useEffect(() => {
    let timer;
    if (OTPOverlayOpen && countDown > 0) {
      timer = setTimeout(() => setCountDown(countDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [OTPOverlayOpen, countDown]);

  // Handle OTP verification
  const handleVerifyOTP = (otp) => {
    if (otp.length !== 6) return showInfo("Please enter 6 digits");

    setIsVerifying(true);

    setTimeout(() => {
      // Validate against the generated OTP
      if (otp === generatedOTP) {
        showSuccess("OTP verified successfully!");
        setOTPOverlayOpen(false);
        showSuccess("Email changed successfully!");
        // Reset OTP after successful verification
        setGeneratedOTP("");
      } else {
        showError("Invalid OTP. Please try again.");
        setIsVerifying(false);
      }
    }, 1000);
  };

  // Early return if logged_user_data is not provided - avoid side effects during render
  if (!logged_user_data) return null;

  // Handle resend OTP
  const handleResendOTP = () => {
    if (countDown === 0) {
      setCountDown(30);
      handleSendOTP(emailValue);
    }
  };

  // Handle OTP button click
  const handleSendOTP = (email) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    showSuccess(`Email was sent successfully to ${email}`);
    const otp = getOTP();
    showInfo(otp);

    if (!otp || otp.length !== 6) {
      showError("Failed to generate OTP. Please try again.");
    } else {
      // Store the generated OTP for validation
      setGeneratedOTP(otp);
      setOTPOverlayOpen(true);
      setCountDown(30);
      setIsVerifying(false);
    }
  };

  /**
   * Handle password verification against logged user password
   * Uses the password from the backend data structure
   * @param {string} password - The password to verify
   */
  const handleVerifyPassword = (password) => {
    // Verify password against the actual user password from backend
    if (password === logged_user_data.password) {
      showSuccess("Password verified successfully!");
    } else {
      showError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <AccountActions
        setEmail={setEmailValue}
        onSendOTP={handleSendOTP}
        onVerifyPassword={handleVerifyPassword}
      />

      <OTPOverlay
        isOpen={OTPOverlayOpen}
        onClose={() => setOTPOverlayOpen(false)}
        email={emailValue}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={handleResendOTP}
        countDown={countDown}
        isVerifying={isVerifying}
      />
    </div>
  );
}

export default MainTop;
