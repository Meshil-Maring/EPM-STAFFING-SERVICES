import React, { useContext, useState } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Icon from "../../common/Icon";
import { showError, showSuccess } from "../../../utils/toastUtils";
import { signup_form_context } from "../../../context/SignupFormContext";
import { useNavigate } from "react-router-dom";
import Already_have_account from "./Already_have_account";
import { Link } from "react-router-dom";
import OTPOverlay from "../Settings/OTPOverlay";
import {
  sendOTP,
  verifyOTP,
  registerUser,
} from "../../../services/otp.service";

function Signup_Account_credentials() {
  const { form, setForm, clearForm } = useContext(signup_form_context);
  const [otp_overlay, setOtp_overlay] = useState(false);
  const [confirm_password, setConfirm_password] = useState("");

  const navigate = useNavigate();

  const elements = [
    {
      type: "email",
      placeholder: "Enter recovery email here...",
      label: "Recovery Email*",
      id: "recovery_email",
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

  const buttons = [
    { label: "Back", icon: "ri-arrow-left-line" },
    { label: "Complete Registration", icon: "ri-arrow-right-line" },
  ];

  const [verifying, setVerifying] = useState(false);
  const [user_id, setUser_id] = useState(null);
  const [otp_sent, setOtp_sent] = useState(false);

  const handleVerifyOtp = async (otp_code) => {
    if (!user_id) {
      showError("No user ID found. Please restart registration.");
      return;
    }

    try {
      setVerifying(true);
      const result = await verifyOTP(user_id, otp_code);

      if (result.success) {
        showSuccess("Account created Successfully");
        clearForm();
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

  const handleGenerateOtp = async () => {
    try {
      // First register the user to get a user_id
      const formData = {
        company_name: form.company_name,
        industry_type: form.industry_type,
        registration_number: form.registration_number,
        description: form.description,
        email: form.email,
        mobile_number: form["mobile number"],
        contact_information: form["contact information"],
        address: form.address,
        city: form.city,
        state: form.state,
        pin_code: form.pin_code,
        recovery_email: form.recovery_email,
        password: form.password,
      };

      const registerResult = await registerUser(formData);

      if (registerResult.user_id) {
        setUser_id(registerResult.user_id);
        await sendOTP(form.recovery_email, registerResult.user_id);
        setOtp_sent(true);
        showSuccess("OTP sent to your email");
      } else {
        showError("Registration failed. Please try again.");
      }
    } catch (error) {
      showError(error.message || "Failed to send OTP");
    }
  };

  const handleInputChange = (value, id) => {
    if (id === "confirm_password") return setConfirm_password(value);
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Confirming OTP
  const confirm_otp = () => {
    setOtp_overlay(true);
  };

  // form navigation buttons and validating the form details
  const handleNavigation = (dir) => {
    if (dir === "Back")
      return navigate("/Signing/signup_form/address_information");
    if (form.password === "") return showError("Password is required!");
    if (confirm_password === "") return showError("Confirm your password!");
    if (form.recovery_email === "") return showError("Recovery email missin!");
    if (form.password !== confirm_password)
      return showError("Passwords do not match!");
    if (form.terms === false)
      return showError(
        "Read and accept to our terms and Conditions to continue",
      );

    // calling the function to generate and send otp
    confirm_otp();
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
              autoComplete="off"
              onchange={handleInputChange}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              class_name={input_style}
              default_value={
                el.id === "confirm_password" ? confirm_password : form[el.id]
              }
            />
          </div>
        ))}
        <div className="w-full text-xs flex flex-row space-x-1 items-center justify-start">
          <Input id={"terms"} type={"checkbox"} onchange={handleInputChange} />
          <p>
            I accept the{" "}
            <span className="text-red-dark font-semibold">
              <Link>Terms and Conditions</Link>
            </span>{" "}
            and I agree to the{" "}
            <span className="text-red-dark font-semibold">
              <Link>Privacy Policy</Link>
            </span>
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 items-center justify-center mb-0">
          {buttons.map((button) => {
            const isBack = button.label === "Back";
            return (
              <div
                key={button.label}
                onClick={() => handleNavigation(button.label)}
                className={`flex flex-row items-center py-1 cursor-pointer hover:scale-[1.02] transition-all duration-150 ease-in-out rounded-small ${isBack ? "bg-white text-nevy_blue border border-nevy_blue" : "bg-g_btn flex-row-reverse text-text_white"} justify-center space-x-1 w-full`}
              >
                <Icon icon={button.icon} class_name="" />
                <Label text={button.label} class_name={""} />
              </div>
            );
          })}
        </div>
      </div>

      {/* <Terms_Conditions onchange={handleInputChange} /> */}

      <Already_have_account />

      <OTPOverlay
        isOpen={otp_overlay}
        onClose={setOtp_overlay}
        email={form.recovery_email}
        onVerifyOTP={handleVerifyOtp}
        countDown={30}
        onResendOTP={handleGenerateOtp}
        isVerifying={verifying}
      />
    </>
  );
}

export default Signup_Account_credentials;
