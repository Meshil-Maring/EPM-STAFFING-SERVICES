import React, { useState } from "react";
import Label from "../../common/Label";
import { showError, showWarning } from "../../../utils/toastUtils";
import Icon from "../../common/Icon";

function AccountActions({ onSendOTP, onVerifyPassword, credentials }) {
  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");
  const [isChangeMode, setIsChangeMode] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleAction = async (type) => {
    if (type === "email") {
      if (!localEmail) return showWarning("Field cannot be empty");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail))
        return showError("Invalid email");
      onSendOTP(localEmail);
    } else {
      if (!isChangeMode) {
        if (!localPass) return showWarning("Field cannot be empty");
        // Mode: Verifying current password
        const success = await onVerifyPassword(localPass, false);
        if (success) {
          setIsChangeMode(true);
          setLocalPass(""); // Clear field for the new password
        }
      } else {
        // Mode: Entering new password
        onVerifyPassword(localPass, true);
      }
    }
  };

  // check if form is verifying
  const isVerifying =
    credentials.isEmailVerifying || credentials.isPasswordVerifying;

  // input styling
  const input_style = `w-full rounded-small border border-lighter px-3 py-2 text-sm text-text_b bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition`;

  return (
    <div className="w-full rounded-small border border-lighter shadow-sm flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Email Section */}
      <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-lighter">
        <Label text="Update Email" class_name="font-medium mb-1 block" />
        <div className="relative">
          <input
            placeholder="New email address"
            onChange={(e) => setLocalEmail(e.target.value)}
            value={localEmail}
            type="email"
            autoComplete="off"
            className={input_style}
          />
          <button
            onClick={() => handleAction("email")}
            className="absolute right-1 top-1 bottom-1 px-3 bg-highlightBackground text-xs rounded-small"
          >
            {!isVerifying
              ? credentials.emailVerified
                ? "Verified ✓"
                : "Send OTP"
              : "Verifying..."}
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="flex-1 p-4">
        <Label
          text={
            isChangeMode ? "Enter New Password" : "Confirm Current Password"
          }
          class_name="font-medium mb-1 block text-blue"
        />
        <div className="flex flex-row gap-2 items-center justify-between ">
          <div className="relative flex-1 w-full flex items-center rounded-small border-[#E3E3E3] bg-[#F6F3F3]">
            <input
              type={clicked ? "text" : "password"}
              placeholder={
                isChangeMode ? "Type new password" : "Type current password"
              }
              autoComplete="new-password"
              onChange={(e) => setLocalPass(e.target.value)}
              className={input_style}
            />
            <span
              onClick={() => setClicked((prev) => !prev)}
              className="absolute right-2 top-0 bottom-0 text-lg cursor-pointer"
            >
              <Icon icon={clicked ? "ri-eye-off-line" : "ri-eye-line"} />
            </span>
          </div>
          <button
            onClick={() => handleAction("password")}
            className={`px-3 py-2 text-xs rounded-small ${isChangeMode ? "bg-green-500 text-white" : "bg-highlightBackground"}`}
          >
            {!isVerifying
              ? isChangeMode
                ? credentials.passwordVerified
                  ? "Ready ✓"
                  : "Confirm New"
                : "Verify Identity"
              : "Verifying..."}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountActions;
