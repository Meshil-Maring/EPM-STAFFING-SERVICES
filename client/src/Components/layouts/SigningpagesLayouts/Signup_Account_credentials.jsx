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

function Signup_Account_credentials() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [verify_id, setVerify_id] = useState("");
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();

  const elements = [
    {
      type: "new-password",
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
      type: "confirm password",
      placeholder: "Confirm your Password",
      label: "Confirm Password*",
      id: "confirm_password",
    },
  ];

  // =========================
  // INPUT HANDLER
  // =========================
  const handleInputChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // =========================
  // SEND OTP
  // =========================
  const handleGenerateOtp = async () => {
    try {
      const result = await sendOTP(form.email);

      if (!result.success) {
        return showError(result.message || "Failed to send OTP");
      }

      setVerify_id(result.data);
      setOtp_overlay(true);
      showSuccess("OTP sent successfully!");
    } catch (err) {
      console.log(err);
      showError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // VERIFY OTP + SIGNUP FLOW
  // =========================
  const handleVerifyOtp = async (otp_code) => {
    try {
      setVerifying(true);

      const otpRes = await verifyOTP(verify_id, otp_code);

      if (!otpRes.success) {
        return showError(otpRes.message || "Invalid OTP");
      }

      showSuccess("OTP verified successfully!");
      setOtp_overlay(false);

      // Check user
      const user = await getUserByEmail(form.email);

      // =========================
      // EXISTING USER FLOW
      // =========================
      if (user.success) {
        const stage = user.data.signup_stage;

        if (stage === "completed") {
          return showError("Account already completed");
        }

        if (stage === "1")
          return navigate("/auth/signup_form/company_information");
        if (stage === "2")
          return navigate("/auth/signup_form/company_information");
        if (stage === "3")
          return navigate("/auth/signup_form/contact_information");
        if (stage === "4")
          return navigate("/auth/signup_form/address_information");
      }

      // =========================
      // NEW USER FLOW
      // =========================
      const response = await createAccount({
        email: form.email,
        password: form.confirm_password,
      });

      if (!response.success) {
        return showError(response.message || "Failed to create account");
      }

      await updateByIdService(
        { signup_stage: "2" },
        "api/users/update/users/id",
        response.data.id,
      );

      showSuccess("Account created successfully!");
      navigate("/auth/signup_form/company_information");
    } catch (err) {
      console.log(err);
      showError("Verification failed!");
    } finally {
      setVerifying(false);
      setIsLoading(false);
    }
  };

  // =========================
  // VALIDATION + START FLOW
  // =========================
  const handleNavigation = async () => {
    if (!form.email) return showError("Email missing!");
    if (!form.password) return showError("Password is required!");
    if (!form.confirm_password) return showError("Confirm your password!");
    if (form.password !== form.confirm_password)
      return showError("Passwords do not match!");

    setIsLoading(true);

    try {
      const user = await getUserByEmail(form.email);

      if (user.success && user.data.signup_stage === "completed") {
        setIsLoading(false);
        return showError("Email is already used");
      }

      await handleGenerateOtp();
    } catch (err) {
      console.log(err);
      showError("Something went wrong");
      setIsLoading(false);
    }
  };

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-start";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0 items-center">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full p-2 text-sm">
        {elements.map((el) => (
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

        <button
          onClick={handleNavigation}
          disabled={isLoading}
          className={`flex flex-row items-center text-lg py-1.5 font-semibold cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small bg-g_btn text-text_white justify-center space-x-1 w-full
            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          <Label text={isLoading ? "Loading..." : "Continue"} />
          <Icon icon={"ri-arrow-right-line"} />
        </button>
      </div>

      <Already_have_account />

      <OTPOverlay
        isOpen={otp_overlay}
        email={form.email}
        onVerifyOTP={handleVerifyOtp}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
        onClose={() => {
          setOtp_overlay(false);
          setIsLoading(false);
        }}
      />
    </>
  );
}

export default Signup_Account_credentials;
