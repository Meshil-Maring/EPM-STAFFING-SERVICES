import React, { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import OTPOverlay from "../Settings/OTPOverlay";
import { sendOTP, verifyOTP } from "../../../services/otp.service";
import { updateByIdService } from "../../../utils/server_until/service.js";
import {
  createAccount,
  getUserByEmail,
} from "../../../services/user.service.js";

const FORM_ELEMENTS = [
  {
    type: "email",
    placeholder: "Enter email here...",
    label: "Email*",
    id: "email",
  },
  {
    type: "password",
    placeholder: "Create a Strong Password",
    label: "Password*",
    id: "password",
  },
  {
    type: "password",
    placeholder: "Confirm your Password",
    label: "Confirm Password*",
    id: "confirm_password",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Signup_Account_credentials() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [verify_id, setVerify_id] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resendKey, setResendKey] = useState(0);

  const navigate = useNavigate();

  const handleInputChange = (value, id) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  // ─── OTP send ────────────────────────────────────────────────────────────────
  const handleGenerateOtp = async () => {
    try {
      setIsSendingCode(true);

      const result = await sendOTP(form.email);
      if (!result.success)
        return showError(result.message || "Failed to send OTP");

      setVerify_id(result.data);
      setResendKey((prev) => prev + 1);
      setOtp_overlay(true);
      showSuccess("OTP sent successfully!");
    } catch (err) {
      console.error(err);
      showError("Something went wrong while sending OTP!");
    } finally {
      setIsLoading(false);
      setIsSendingCode(false);
    }
  };

  // ─── OTP verify ──────────────────────────────────────────────────────────────
  const handleVerifyOtp = async (otp_code) => {
    try {
      setVerifying(true);

      const otpRes = await verifyOTP(verify_id, otp_code);
      if (!otpRes.success) return showError(otpRes.message || "Invalid OTP");

      showSuccess("OTP verified successfully!");
      setOtp_overlay(false);

      let existingUser = null;
      try {
        const user = await getUserByEmail(form.email);
        if (user.success) existingUser = user.data;
      } catch {
        // Expected for brand-new signups — not an error
      }

      if (existingUser) {
        const stage = existingUser.signup_stage;

        if (stage === "completed")
          return showError(
            "This account is already registered. Please log in.",
          );
        if (stage === "1" || stage === "2")
          return navigate("/auth/signup_form/company_information");
        if (stage === "3")
          return navigate("/auth/signup_form/contact_information");
        if (stage === "4")
          return navigate("/auth/signup_form/address_information");

        return showError("Unexpected account state. Please contact support.");
      }

      const response = await createAccount({
        email: form.email,
        password: form.password,
      });

      if (!response.success)
        return showError(response.message || "Failed to create account");

      await updateByIdService(
        "api/dr/update/id",
        { signup_stage: "2" },
        "users",
        response.data.id,
      );

      showSuccess("Account created successfully!");
      navigate("/auth/signup_form/company_information");
    } catch (err) {
      console.error(err);
      showError("Verification failed! Please try again.");
    } finally {
      setVerifying(false);
      setIsLoading(false);
    }
  };

  // ─── Form validation ─────────────────────────────────────────────────────────
  const handleNavigation = async () => {
    if (form.email === "") return showError("Email is required!");
    if (!EMAIL_REGEX.test(form.email))
      return showError("Please enter a valid email address!");
    if (form.password === "") return showError("Password is required!");
    if (form.password.length < 5)
      return showError("Password must be at least 5 characters");
    if (!/^[A-Z]/.test(form.password))
      return showError("Password must start with a capital letter");
    if (!/\d/.test(form.password))
      return showError("Password must contain at least 1 digit");
    if (form.confirm_password === "")
      return showError("Please confirm your password!");
    if (form.password !== form.confirm_password)
      return showError("Passwords do not match!");

    setIsLoading(true);

    try {
      let existingUser = null;
      try {
        const user = await getUserByEmail(form.email);
        if (user.success) existingUser = user.data;
      } catch {
        // User doesn't exist — fine for new signup
      }

      if (existingUser?.signup_stage === "completed") {
        return showError("This email is already registered. Please log in.");
      }

      await handleGenerateOtp();
    } catch (err) {
      console.error(err);
      showError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Enter key handler ───────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading && !isSendingCode) handleNavigation();
  };

  // ─── Button label: priority → isSendingCode > isLoading > default ───────────
  const btnLabel = isSendingCode
    ? "Sending OTP..."
    : isLoading
      ? "Loading..."
      : "Continue";

  // ─── Styles ──────────────────────────────────────────────────────────────────
  const label_style = "text-sm font-medium text-gray-600 text-start";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <div className="h-full flex flex-col">
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0 items-center">
        <Label
          text="Create Account"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text="Set up your login credentials" class_name={label_style} />
      </header>

      <div
        className="flex flex-col items-center justify-start gap-4 w-full p-2 text-sm"
        onKeyDown={handleKeyDown}
      >
        {FORM_ELEMENTS.map((el) => (
          <div key={el.id} className="w-full flex flex-col space-y-1">
            <Label text={el.label} class_name={label_style} />
            <Input
              autoComplete="off"
              onchange={handleInputChange}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              class_name={input_style}
            />
          </div>
        ))}
      </div>

      <div className="flex w-full mt-auto flex-col p-2">
        <button
          onClick={handleNavigation}
          disabled={isLoading || isSendingCode}
          className={`flex flex-row items-center text-lg py-1.5 font-semibold cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small bg-g_btn text-text_white justify-center space-x-1 w-full
            ${isLoading || isSendingCode ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <Label text={btnLabel} />
          <Icon icon="ri-arrow-right-line" />
        </button>

        <Already_have_account />
      </div>

      <OTPOverlay
        key={resendKey}
        isOpen={otp_overlay}
        email={form.email}
        onVerifyOTP={handleVerifyOtp}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
        onClose={() => setOtp_overlay(false)}
      />
    </div>
  );
}

export default Signup_Account_credentials;
