import React, { useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import OTPOverlay from "../Settings/OTPOverlay";

function Signup_Account_credentials() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [user_id, setUser_id] = useState(null);

  const navigate = useNavigate();

  const elements = [
    {
      type: "new-password",
      placeholder: "Enter recovery email here...",
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

  const [verifying, setVerifying] = useState(false);

  const handleVerifyOtp = async (otp_code) => {
    if (!user_id) {
      showError("No user ID found. Please restart registration.");
      return;
    }

    try {
      setVerifying(true);

      if (result.success) {
        showSuccess("Account created Successfully");
        navigate("/auth/signin");
      } else {
        showError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      showError(error.message || "Failed to verify OTP");
    } finally {
      setVerifying(false);
    }
  };

  const handleGenerateOtp = () => {
    // calls for otp re-generation
    if (!otp_overlay) return setOtp_overlay(true);
  };

  const handleInputChange = (value, id) => {
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // form navigation buttons and validating the form details
  const handleNavigation = () => {
    if (form.password === "") return showError("Password is required!");
    if (form.confirm_password === "")
      return showError("Confirm your password!");
    if (form.email === "") return showError("Email missing!");
    if (form.password !== form.confirm_password)
      return showError("Passwords do not match!");

    // ***calling the function to generate and send otp
    handleGenerateOtp();
  };

  // styles
  const label_style = "text-sm font-medium text-gray-600 text-center";
  const input_style =
    "w-full p-2 rounded-small border focus:border-none focus:outline-none focus:ring ring-nevy_blue border-light";

  return (
    <>
      <header className="w-full flex flex-col gap-2 pt-4 bg-b_white z-20 sticky top-0">
        <Label
          text="Address Details"
          class_name="text-2xl font-bold text-gray-900 text-center"
        />
        <Label text={"Complete your registration"} class_name={label_style} />
      </header>

      <div className="flex flex-col items-center justify-start gap-4 w-full p-2 text-sm">
        {elements.map((el) => (
          <div
            key={el.id}
            className="w-full flex flex-col items-start justify-start space-y-1"
          >
            <Label text={el.label} class_name={label_style} />
            <Input
              autoComplete="new-password"
              onchange={handleInputChange}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              class_name={input_style}
            />
          </div>
        ))}
        {/* buttons here */}
        <div
          onClick={handleNavigation}
          className="flex flex-row items-center text-lg py-1.5 font-semibold cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small bg-g_btn text-text_white justify-center space-x-1 w-full"
        >
          <Label text={"Continue"} class_name={""} />
          <Icon icon={"ri-arrow-right-line"} class_name="" />
        </div>
      </div>

      {/* <Terms_Conditions onchange={handleInputChange} /> */}

      <Already_have_account />

      <OTPOverlay
        isOpen={otp_overlay}
        email={form.email}
        onVerifyOTP={handleVerifyOtp}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
        onClose={() => setOtp_overlay(false)}
      />
    </>
  );
}

export default Signup_Account_credentials;
