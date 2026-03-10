import React, { useState, useEffect, useRef } from "react";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { motion } from "framer-motion";

function OTPOverlay({
  isOpen,
  onClose,
  email,
  onVerifyOTP,
  onResendOTP,
  countDown,
  isVerifying,
  verificationError,
}) {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  // Reset OTP values when overlay opens
  useEffect(() => {
    if (isOpen) {
      setOtpValues(["", "", "", "", "", ""]);
    }
  }, [isOpen]);

  // Countdown logic
  useEffect(() => {
    let timer;
    if (isOpen && countDown > 0) {
      timer = setTimeout(() => onResendOTP(), 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, countDown, onResendOTP]);

  // OTP input handling
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1); // Only take first character
    setOtpValues(newOtpValues);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to previous input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = () => {
    const otp = otpValues.join("");
    onVerifyOTP(otp, otpValues);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-light_black bg-opacity-50 flex items-center justify-center z-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className="flex flex-col items-center justify-center p-8 rounded-small bg-white shadow-xl gap-6 max-w-md w-full mx-4"
      >
        <div className="flex flex-col items-center gap-2">
          <Label
            text={"Check your Email"}
            class_name={
              "font-semibold text-[clamp(1.2em,2vw,1.6em)] text-text_b"
            }
          />
          <label className="font-lighter text-center text-text_b_l">
            We have sent a 6-digit code to{" "}
            <span className="font-semibold text-text_b">{email}</span>
          </label>
        </div>

        <Label
          text={"Enter it below to confirm your account."}
          class_name={"font-medium text-text_b_l"}
        />

        <div className="w-full flex flex-row items-center justify-center gap-3">
          {otpValues.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (otpInputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="border border-light h-12 w-12 text-center text-lg font-semibold rounded-small focus:outline-none focus:ring-2 focus:ring-nevy_blue focus:border-transparent"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {verificationError && (
          <div className="text-red-500 text-sm font-medium">
            {verificationError}
          </div>
        )}

        <Button
          text={isVerifying ? "Verifying..." : "Verify Account"}
          onclick={handleVerify}
          disabled={isVerifying}
          class_name={`py-2 px-8 rounded-small font-semibold transition-all ${
            isVerifying
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-g_btn hover:bg-g_btn_hover text-text_white"
          }`}
        />

        <div className="flex flex-col items-center gap-2">
          <Label
            text={"Didn't receive the code?"}
            class_name={"text-text_b_l"}
          />
          <button
            onClick={onResendOTP}
            disabled={countDown > 0}
            className={`font-semibold ${
              countDown > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-nevy_blue hover:text-nevy_blue_hover"
            }`}
          >
            Resend code{" "}
            {countDown > 0 && (
              <span className="text-gray-500">({countDown}s)</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default OTPOverlay;
