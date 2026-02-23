import React, { useState, useEffect, useContext } from "react";
import OTPOverlay from "./OTPOverlay";
import AccountActions from "./AccountActions";
import { LoggedCompanyContext } from "../../../context/LoggedCompanyContext";

/**
 * MainTop Component
 *
 * Manages the account deletion and email/password verification flow.
 * Handles OTP verification and coordinates with AccountActions for
 * the step-by-step verification process.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onCompanyDelete - Function to delete company account
 * @param {Function} props.setError - Function to set error messages
 */
function MainTop({ onCompanyDelete, setError, setPendingEmailChange }) {
  const [OTPOverlayOpen, setOTPOverlayOpen] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const { loggedCompany } = useContext(LoggedCompanyContext);

  // State to manage pending email changes
  const [pendingEmail, setPendingEmail] = useState("");

  // State to track verification completion
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // State to manage email input value
  const [emailValue, setEmailValue] = useState("");
  // Countdown logic
  useEffect(() => {
    let timer;
    if (OTPOverlayOpen && countDown > 0) {
      timer = setTimeout(() => setCountDown(countDown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [OTPOverlayOpen, countDown]);

  // Handle OTP verification
  const handleVerifyOTP = (otp, otpValues) => {
    if (otp.length !== 6) {
      setVerificationError("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true);
    setVerificationError("");

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, accept any 6-digit code
      // In real implementation, this would call an API
      if (/^\d{6}$/.test(otp)) {
        alert("OTP verified successfully!");
        setOTPOverlayOpen(false);
        // Trigger account deletion logic here
        onCompanyDelete();
      } else {
        setVerificationError("Invalid OTP. Please try again.");
        setIsVerifying(false);
      }
    }, 1000);
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (countDown === 0) {
      setCountDown(30);
      setVerificationError("");
      handleResendOTP(emailValue);
    }
  };

  // Handle OTP button click
  const handleSendOTP = async (email) => {
    try {
      // In a real application, this would be a fetch request to your backend API
      // Example: const response = await fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ email }) });

      // For now, we'll simulate the API call
      const response = await simulateSendOTPAPI(email);

      if (response.success) {
        setOTPOverlayOpen(true);
        setCountDown(30);
        setVerificationError("");
        setIsVerifying(false);
      } else {
        setVerificationError("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setVerificationError("Network error. Please check your connection.");
    }
  };

  // Simulate API call to backend (replace this with actual fetch request)
  const simulateSendOTPAPI = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate successful API response
        resolve({ success: true, message: "OTP sent successfully" });
      }, 1000);
    });
  };

  /**
   * Handle password verification against logged company password
   * @param {string} password - The password to verify
   */
  const handleVerifyPassword = (password) => {
    // Verify password against the actual company password
    if (password === loggedCompany.password) {
      setIsPasswordVerified(true);
      setError({
        type: "success",
        text: "Password verified successfully!",
      });
    } else {
      setError({
        type: "error",
        text: "Incorrect password. Please try again.",
      });
    }
  };

  return (
    <div className="w-full">
      <AccountActions
        setEmail={setEmailValue}
        setPendingEmail={setPendingEmail}
        setError={setError}
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
        verificationError={verificationError}
      />
    </div>
  );
}

export default MainTop;
