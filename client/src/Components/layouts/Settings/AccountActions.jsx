import React, { useState, useContext } from "react";
import Label from "../../common/Label";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { Company_context } from "../../../context/AccountsContext";
import { admin_accounts_context } from "../../../context/AdminAccountsContext";
import { showError, showSuccess, showWarning } from "../../../utils/toastUtils";
function AccountActions({ onSendOTP }) {
  // Context to access current logged company data
  const { company_accounts } = useContext(Company_context);
  const logged_user_id = sessionStorage.getItem("logged_user_id");
  const { adminAccounts } = useContext(admin_accounts_context);
  const user_type = sessionStorage.getItem("logged_user_type");
  const logged_user =
    user_type === "admin"
      ? adminAccounts[logged_user_id]
      : company_accounts[logged_user_id];

  // State to manage input values
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (value, id) => {
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  /**
   * Handle email verification process
   * Validates email format and sends OTP if valid
   */
  const handleEmailVerification = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email) return showWarning("Please enter your email address");

    if (!regex.test(input.email)) return showError("Invalid email format");

    // Email is valid, send OTP
    onSendOTP(input.email);
  };

  /**
   * Handle password verification process
   * Validates password against current company password
   */
  const handlePasswordVerification = () => {
    if (!input.password) {
      showError("Please enter your current password");
      return;
    }

    // Verify password against logged company password
    if (input.password !== logged_user.password) {
      showError("Incorrect password. Please try again.");
      return;
    }

    // Store the new email in local state for pending changes
    if (input.email !== logged_user.email) {
      setPendingEmail(input.email);
    }

    setError({
      type: "success",
      text: "Password verified successfully! Changes are ready to be saved.",
    });
    clearError();
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
                    class_name={`w-full h-full p-2 rounded-small flex-1 focus:outline-none focus:ring-2 focus:ring-light`}
                    value={input[button.label.toLowerCase()]}
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
