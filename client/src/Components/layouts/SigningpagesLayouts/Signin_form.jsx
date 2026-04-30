import React, { useState, useContext } from "react";
import Signin_input from "./Signin_input";
import display_data from "../../InputElements.json";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { Company_context } from "../../../context/AccountsContext";
import { admin_accounts_context } from "../../../context/AdminAccountsContext";
import Accounts from "../../dummy_data_structures/Accounts.json";
import AdminAccounts from "../../dummy_data_structures/AdminAccounts.json";
import { showError, showInfo, showSuccess } from "../../../utils/toastUtils";
import Icon from "../../common/Icon";
import TopHeader from "./TopHeader";
import {
  getUserByEmail,
  loginService,
} from "../../../services/user.service.js";
import { useAuth } from "../../../hooks/useAuth";
import { sendOTP, verifyOTP } from "../../../services/otp.service.js";
import OTPOverlay from "../Settings/OTPOverlay.jsx";
import PasswordReset from "./ResetPassword/PasswordReset.jsx";
import { createPortal } from "react-dom";

// LOADING
const ResettingPass = () =>
  createPortal(
    <div className="w-full h-dvh gap-10 flex flex-col items-center justify-center absolute top-0 left-0 inset-0 z-20000 bg-lighter/20">
      <button
        type="button"
        className="inline-flex items-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-large"
        disabled
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          {/* This circle creates the faint outer ring */}
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          {/* This path creates the actual spinning arc */}
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </button>
    </div>,
    document.body,
  );

function Signin_form() {
  const { refetch } = useAuth(); // ✅ use refetch instead of setUser
  const { save_company_accounts } = useContext(Company_context);
  const { save_admin_accounts } = useContext(admin_accounts_context);

  // password reset states
  const [verify_id, setVerify_id] = useState(null);
  const [resendKey, setResendKey] = useState(0);
  // otp states
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // sending otp
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const loadData = (user_type) => {
    save_company_accounts(Accounts);
    if (user_type === "admin") {
      save_admin_accounts(AdminAccounts);
    }
  };

  const handle_form_submission = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!form.email) return showError("Email missing!");
    if (!form.password) return showError("Password missing!");

    try {
      setLoading(true);

      const { email, password } = form;
      const result = await loginService(email, password);

      if (!result.success) return showError(result.message);

      // ✅ Refresh auth state from server (session-based)
      await refetch();

      loadData(result.data.role);
      showSuccess(result.message);

      // ✅ Navigate based on role
      if (result.data.role === "user") {
        navigate("/client/dashboard");
      } else if (result.data.role === "admin") {
        navigate("/admin/management");
      }
    } catch (err) {
      showError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleClicking = (name) => {
    if (name === "Sign up") return navigate("/auth/signup_form");
    if (name === "Forgot password?") {
      if (form.email !== "") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(form.email);
        if (!isValidEmail) return showError("Invalid email!");
        handleGenerateOtp(form.email);
      }
    }
  };

  // GENERATING OTP AND SENDING OTP TO EMAIL
  const handleGenerateOtp = async (email) => {
    try {
      setIsSendingCode(true);

      const result = await sendOTP(email);
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
      setPasswordReset(true);
    } catch (err) {
      console.error(err);
      showError("Verification failed! Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const elements = display_data["Signin"];
  const keys = Object.keys(elements);

  return (
    <div className="w-full h-dvh flex flex-col pt-14 gap-4 items-center justify-center">
      <TopHeader />

      <form
        onSubmit={handle_form_submission}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-6 w-[80%] sm:w-[60%] md:w-[55%] lg:w-[40%]"
      >
        <header className="flex flex-col gap-2 w-full">
          <Label
            text="Welcome back!"
            class_name="text-2xl font-bold w-full text-center text-gray-900"
          />
          <Label
            text="Access your account and continue your journey with EPM Staffing Services"
            class_name="text-sm font-medium text-center w-full text-gray-600"
          />
        </header>

        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="w-full flex flex-col gap-4">
            {keys.map((key) => (
              <Signin_input
                key={key}
                element={elements[key]}
                display_data={display_data}
                handleInputChange={handleInputChange}
              />
            ))}
          </div>

          <Button
            onclick={handleClicking}
            text="Forgot password?"
            type="button"
            class_name="border-none hover:text-blue-700 transition-colors text-nevy_blue text-sm font-medium ml-auto cursor-pointer p-0"
          />
        </div>

        <div className="w-full transition-all ease-in-out duration-150 hover:scale-[1.02] text-text_white flex flex-row items-center relative justify-center rounded-small bg-g_btn overflow-hidden">
          <button
            className={`w-full flex items-center justify-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            <Label
              text={loading ? "Logging in..." : "Login"}
              class_name="cursor-pointer text-center p-2 text-lg font-semibold"
            />
            <Icon icon={"ri-arrow-right-line"} />
          </button>
        </div>

        <div className="flex flex-row items-center justify-center gap-4 w-full pt-2">
          <Label text="Don't have an account yet?" class_name="text-sm" />
          <Button
            type="button"
            text="Sign up"
            onclick={handleClicking}
            class_name="font-semibold text-nevy_blue border-b border-nevy_blue hover:text-blue-700 transition-colors"
          />
        </div>
      </form>
      <OTPOverlay
        key={resendKey}
        isOpen={otp_overlay}
        email={form.email}
        onVerifyOTP={handleVerifyOtp}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
        onClose={() => setOtp_overlay(false)}
      />
      {passwordReset && (
        <PasswordReset
          email={form.email}
          onClose={() => setPasswordReset(false)}
        />
      )}
      {isSendingCode && <ResettingPass />}
    </div>
  );
}

export default Signin_form;
