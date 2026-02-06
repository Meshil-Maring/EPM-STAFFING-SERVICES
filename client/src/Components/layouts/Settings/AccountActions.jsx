import React, { useState, useContext } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { LoggedCompanyContext } from "../../../context/LoggedCompanyContext";

/**
 * AccountActions Component
 *
 * Handles the email/password verification flow for account management.
 * Implements a step-by-step verification process where:
 * 1. Email field is initially disabled and only enables when clicked
 * 2. User enters NEW email address (for updating company email)
 * 3. After email verification, password field enables and email becomes read-only
 * 4. User enters CURRENT company password for verification
 * 5. After password verification, new email is stored in local state
 * 6. Changes are only applied when "Save All Changes" is clicked
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSendOTP - Function to send OTP to email
 * @param {Function} props.onVerifyPassword - Function to verify password
 * @param {Function} props.setError - Function to set error messages
 * @param {Function} props.setPendingEmail - Function to store pending email change
 */
function AccountActions({
  onSendOTP,
  onVerifyPassword,
  setError,
  setPendingEmail,
}) {
  // Context to access current logged company data
  const { loggedCompany } = useContext(LoggedCompanyContext);

  // State to manage input values
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // State to manage field enablement states
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  // State to track verification status
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  /**
   * Handle input changes for email and password fields
   * @param {string} value - The new input value
   * @param {string} id - The input field identifier ('email' or 'password')
   */
  const handleInputChange = (value, id) => {
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Handle email field click to enable it
   * Only allows enabling if email is not already verified
   */
  const handleEmailClick = () => {
    if (!isEmailVerified) {
      setIsEmailEnabled(true);
    }
  };

  /**
   * Handle password field focus
   * Only enables password field if email is verified
   */
  const handlePasswordFocus = () => {
    if (isEmailVerified) {
      setIsPasswordEnabled(true);
    } else {
      setError({
        type: "error",
        text: "Please verify your email first before entering password",
      });
    }
  };

  /**
   * Handle email verification process
   * Validates email format and sends OTP if valid
   */
  const handleEmailVerification = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!input.email) {
      setError({
        type: "error",
        text: "Please enter your email address",
      });
      return;
    }

    if (!regex.test(input.email)) {
      setError({
        type: "error",
        text: "Invalid email format",
      });
      return;
    }

    // Email validation - accept any valid email format (new email for update)
    // No need to check against current company email since this is for updating

    // Email is valid, send OTP
    onSendOTP(input.email);
    setIsEmailVerified(true);
    setIsEmailEnabled(false); // Disable email field after verification
    setError({
      type: "success",
      text: "Email verified successfully! Please enter your password.",
    });
  };

  /**
   * Handle password verification process
   * Validates password against current company password
   */
  const handlePasswordVerification = () => {
    if (!input.password) {
      setError({
        type: "error",
        text: "Please enter your current password",
      });
      return;
    }

    // Verify password against logged company password
    if (input.password !== loggedCompany.password) {
      setError({
        type: "error",
        text: "Incorrect password. Please try again.",
      });
      return;
    }

    // Password is correct, mark as verified
    setIsPasswordVerified(true);
    setIsPasswordEnabled(false); // Disable password field after verification

    // Store the new email in local state for pending changes
    if (input.email !== loggedCompany.email) {
      setPendingEmail(input.email);
    }

    setError({
      type: "success",
      text: "Password verified successfully! Changes are ready to be saved.",
    });
  };

  /**
   * Handle button clicks for OTP and password verification
   * @param {string} name - The button name ('Send OTP' or 'Verify Password')
   */
  const handleClicking = (name) => {
    if (name === "Send OTP") {
      handleEmailVerification();
    } else if (name === "Verify Password") {
      handlePasswordVerification();
    }
  };

  /**
   * Handle email field blur event
   * Disables email field if not verified, keeps it enabled if verified
   */
  const handleEmailBlur = () => {
    if (!isEmailVerified) {
      setIsEmailEnabled(false);
    }
  };

  /**
   * Handle password field blur event
   * Disables password field if not verified
   */
  const handlePasswordBlur = () => {
    if (!isPasswordVerified) {
      setIsPasswordEnabled(false);
    }
  };

  // Configuration for the input fields
  const infor = [
    {
      name: "Send OTP",
      label: "Email",
      placeholder: "Enter New Email Address",
    },
    {
      name: "Verify Password",
      label: "Password",
      placeholder: "Enter current password",
    },
  ];

  return (
    <div className="w-full rounded-small border-lighter shadow-sm flex flex-col items-start justify-start">
      <div className="w-full flex flex-row items-center justify-center">
        {infor.map((button, index) => {
          const autocomplete =
            button.label === "Email"
              ? "off"
              : button.label === "Password"
                ? "password"
                : "";

          // Determine if field should be enabled
          const isFieldEnabled =
            button.label === "Email" ? isEmailEnabled : isPasswordEnabled;

          // Determine if field should be read-only (email after verification)
          const isReadOnly = button.label === "Email" && isEmailVerified;

          return (
            <div
              key={index}
              className="flex items-start justify-center flex-col text-text_b_l gap-2 text-sm w-full p-4"
            >
              <Label text={button.label} class_name={"font-lighter"} />
              <div className="w-full relative flex gap-2">
                <span className="relative w-full flex flex-1 border border-lighter rounded-small items-center justify-center ">
                  <Input
                    input_target={`input_${button.label.toLocaleLowerCase()}`}
                    id={button.label.toLocaleLowerCase()}
                    placeholder={button.placeholder}
                    type={button}
                    autoComplete={autocomplete}
                    onchange={handleInputChange}
                    class_name={`w-full h-full p-2 rounded-small flex-1 focus:outline-none focus:ring-2 focus:ring-light ${
                      isFieldEnabled ? "cursor-text" : "cursor-pointer"
                    }`}
                    readOnly={!isFieldEnabled || isReadOnly}
                    value={input[button.label.toLowerCase()]}
                    onClick={
                      button.label === "Email" ? handleEmailClick : undefined
                    }
                    onFocus={
                      button.label === "Password"
                        ? handlePasswordFocus
                        : undefined
                    }
                    onBlur={
                      button.label === "Email"
                        ? handleEmailBlur
                        : handlePasswordBlur
                    }
                  />
                </span>
                <Button
                  onclick={handleClicking}
                  text={button.name}
                  class_name="bg-highlightBackground whitespace-nowrap px-3 py-1 absolute right-1 top-0 bottom-0 my-1 rounded-small text-text_b"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AccountActions;
