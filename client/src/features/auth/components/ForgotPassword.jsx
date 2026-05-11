import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../../shared/components/ui/Label";
import Input from "../../../shared/components/ui/Input";
import Icon from "../../../shared/components/ui/Icon";
import TopHeader from "./TopHeader";
import OTPOverlay from "../../settings/components/OTPOverlay";
import { showError, showSuccess, showInfo } from "../../../shared/utils/toastUtils";
import {
  forgotPasswordService,
  resetPasswordService,
} from "../../../api/features/otp.service.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const input_style =
  "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";
const label_style = "text-sm font-medium text-gray-600 text-start";

// ─── Step: email ────────────────────────────────────────────────────────────

function EmailStep({ onOtpSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return showError("Email is required!");
    if (!EMAIL_REGEX.test(email)) return showError("Please enter a valid email address!");

    try {
      setLoading(true);
      const result = await forgotPasswordService(email);

      if (!result.success) return showError(result.message || "Failed to send OTP");

      // result.data is null when the email doesn't exist in the DB.
      // Server returns success intentionally (user enumeration protection).
      // We show a safe message and do not open the OTP overlay.
      if (!result.data) {
        showInfo("If that email is registered, an OTP has been sent. Please check your inbox.");
        return;
      }

      showSuccess("OTP sent! Check your email.");
      onOtpSent(email, result.data);
    } catch (err) {
      showError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Label text="Forgot Password?" class_name="text-2xl font-bold text-gray-900 text-center" />
        <Label
          text="Enter the email address linked to your account and we'll send you a verification code."
          class_name="text-sm text-gray-600 text-center"
        />
      </header>

      <div className="flex flex-col gap-1">
        <Label text="Email*" class_name={label_style} />
        <Input
          type="email"
          id="email"
          placeholder="Enter your email address..."
          class_name={input_style}
          onchange={(val) => setEmail(val)}
          autoComplete="email"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full py-2 text-lg font-semibold rounded-small bg-g_btn text-text_white transition-all duration-150 hover:scale-[1.02] ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <Label text={loading ? "Sending OTP..." : "Send OTP"} />
        <Icon icon="ri-mail-send-line" />
      </button>
    </form>
  );
}

// ─── Step: reset ─────────────────────────────────────────────────────────────

function ResetStep({ email, otpId, otpCode, onSuccess }) {

  const [form, setForm] = useState({ password: "", confirm_password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password) return showError("Password is required!");
    if (form.password.length < 5) return showError("Password must be at least 5 characters");
    if (!/^[A-Z]/.test(form.password)) return showError("Password must start with a capital letter");
    if (!/\d/.test(form.password)) return showError("Password must contain at least 1 digit");
    if (!form.confirm_password) return showError("Please confirm your password!");
    if (form.password !== form.confirm_password) return showError("Passwords do not match!");

    try {
      setLoading(true);
      const result = await resetPasswordService(otpId, otpCode, email, form.password);

      if (!result.success) return showError(result.message || "Failed to reset password");

      showSuccess("Password reset successfully!");
      onSuccess();
    } catch (err) {
      showError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Label text="Set New Password" class_name="text-2xl font-bold text-gray-900 text-center" />
        <Label
          text={`OTP verified for ${email}. Enter your new password below.`}
          class_name="text-sm text-gray-600 text-center"
        />
      </header>

      {[
        { id: "password", label: "New Password*", placeholder: "Create a strong password" },
        { id: "confirm_password", label: "Confirm Password*", placeholder: "Confirm your new password" },
      ].map((el) => (
        <div key={el.id} className="flex flex-col gap-1">
          <Label text={el.label} class_name={label_style} />
          <Input
            type="password"
            id={el.id}
            placeholder={el.placeholder}
            class_name={input_style}
            onchange={(val) => setForm((prev) => ({ ...prev, [el.id]: val }))}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full py-2 text-lg font-semibold rounded-small bg-g_btn text-text_white transition-all duration-150 hover:scale-[1.02] ${
          loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <Label text={loading ? "Resetting..." : "Reset Password"} />
        <Icon icon="ri-lock-password-line" />
      </button>
    </form>
  );
}

// ─── Step: success ───────────────────────────────────────────────────────────

function SuccessStep({ onGoToLogin }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
        <Icon icon="ri-check-line" class_name="text-3xl text-green-600" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <Label text="Password Reset!" class_name="text-2xl font-bold text-gray-900" />
        <Label
          text="Your password has been reset successfully. You can now sign in with your new password."
          class_name="text-sm text-gray-600"
        />
      </div>
      <button
        onClick={onGoToLogin}
        className="flex items-center justify-center gap-2 w-full py-2 text-lg font-semibold rounded-small bg-g_btn text-text_white transition-all duration-150 hover:scale-[1.02] cursor-pointer"
      >
        <Label text="Back to Sign In" />
        <Icon icon="ri-arrow-right-line" />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function ForgotPassword({ inline = false, onBack }) {
  const navigate = useNavigate();

  const [step, setStep] = useState("email"); // "email" | "reset" | "success"
  const [email, setEmail] = useState("");
  const [otpId, setOtpId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [showOtpOverlay, setShowOtpOverlay] = useState(false);
  const [resendKey, setResendKey] = useState(0);
  const handleOtpSent = (sentEmail, sentOtpId) => {
    setEmail(sentEmail);
    setOtpId(sentOtpId);
    setResendKey((k) => k + 1);
    setShowOtpOverlay(true);
  };

  // Just collect the code here — the reset-password endpoint verifies it
  // and resets in one atomic call, so there's no risk of the OTP record
  // disappearing between a separate verify call and the reset call.
  const handleOtpVerify = (code) => {
    setOtpCode(code);
    setShowOtpOverlay(false);
    setStep("reset");
  };

  const handleResendOtp = async () => {
    try {
      const result = await forgotPasswordService(email);
      if (!result.success || !result.data) {
        return showError(result.message || "Failed to resend OTP");
      }
      setOtpId(result.data);
      setResendKey((k) => k + 1);
      showSuccess("OTP resent successfully!");
    } catch (err) {
      showError(err.message || "Failed to resend OTP");
    }
  };

  const handleGoToLogin = () => {
    if (inline && onBack) {
      onBack();
    } else {
      navigate("/auth/signin");
    }
  };

  const content = (
    <>
      {step === "email" && <EmailStep onOtpSent={handleOtpSent} />}
      {step === "reset" && (
        <ResetStep
          email={email}
          otpId={otpId}
          otpCode={otpCode}
          onSuccess={() => setStep("success")}
        />
      )}
      {step === "success" && <SuccessStep onGoToLogin={handleGoToLogin} />}

      {step !== "success" && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={handleGoToLogin}
            className="text-sm text-nevy_blue hover:text-blue-700 transition-colors font-medium"
          >
            ← Back to Sign In
          </button>
        </div>
      )}

      <OTPOverlay
        key={resendKey}
        isOpen={showOtpOverlay}
        email={email}
        onVerifyOTP={handleOtpVerify}
        onResendOTP={handleResendOtp}
        isVerifying={false}
        onClose={() => setShowOtpOverlay(false)}
      />
    </>
  );

  if (inline) return content;

  return (
    <div className="w-full h-dvh flex flex-col pt-14 gap-4 items-center justify-center">
      <TopHeader />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[40%]">
        {content}
      </div>
    </div>
  );
}

export default ForgotPassword;
