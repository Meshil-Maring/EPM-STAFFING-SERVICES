import React, { useState, useEffect } from "react";
import OTPOverlay from "./OTPOverlay";
import AccountActions from "./AccountActions";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { sendOTP, verifyOTP } from "../../../services/otp.service";

function MainTop({ logged_user_data, credentials, setCredentials }) {
  const [OTPOverlayOpen, setOTPOverlayOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpVerify_id, setOtpVerify_id] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // Handle OTP Verification for Email
  const handleVerifyOTP = async (otp) => {
    setIsVerifying(true);
    const result = await verifyOTP(otpVerify_id, otp);
    setTimeout(() => {
      if (!result.success) return showError(result.message || "Invalid OTP");
      setCredentials((prev) => ({
        ...prev,
        email: tempEmail,
        emailVerified: true,
      }));
      showSuccess("Email verified! Save changes to apply.");
      setOTPOverlayOpen(false);
      setIsVerifying(false);
    }, 1000);
  };

  const handleSendOTP = async (NewEmail) => {
    setCredentials((prev) => ({
      ...prev,
      isEmailVerifying: true,
      email: NewEmail,
    }));
    // send otp
    const result = await sendOTP(NewEmail);
    if (!result.success) {
      setCredentials((prev) => ({
        ...prev,
        isEmailVerifying: false,
        emailVerified: false,
      }));
      return showError(result.message || "Failed to send OTP");
    }
    setOtpVerify_id(result.data);
    console.log(result.data);
    setCredentials((prev) => ({
      ...prev,
      isEmailVerifying: false,
      emailVerified: true,
    }));
    setOTPOverlayOpen(true);
  };

  if (!logged_user_data) return null;

  return (
    <div className="w-full">
      <AccountActions
        onSendOTP={handleSendOTP}
        setCredentials={setCredentials}
        credentials={credentials}
      />
      <OTPOverlay
        isOpen={OTPOverlayOpen}
        onClose={() => setOTPOverlayOpen(false)}
        email={tempEmail}
        onVerifyOTP={handleVerifyOTP}
        onResendOTP={() => handleSendOTP(tempEmail)}
        isVerifying={isVerifying}
      />
    </div>
  );
}

export default MainTop;
