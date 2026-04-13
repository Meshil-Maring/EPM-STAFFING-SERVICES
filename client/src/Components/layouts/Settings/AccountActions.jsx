import React, { useContext, useState } from "react";
import Label from "../../common/Label";
import { showError, showSuccess, showWarning } from "../../../utils/toastUtils";
import Icon from "../../common/Icon";
import AuthenticationModal from "./AuthenticationModal";
import { updateUser, verifyPassword } from "./end-point-function/setting";
import { AuthContext } from "../../../context/AuthContext";

function AccountActions({ onSendOTP, credentials, setCredentials }) {
  const email = credentials.email;
  const password = credentials.password;
  const [clicked, setClicked] = useState(false);

  // handleInputchange
  const handleInputChange = (value, id) => {
    return setCredentials((prev) => ({ ...prev, [id]: value }));
  };

  // getting the user id from authContext
  const { user } = useContext(AuthContext);

  // setting the section context: verifying for email change or password change
  const [context, setContext] = useState("");

  // password to verify
  const [verify, setVerify] = useState("");

  const [authenticate, setAuthenticate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Handle Authentication
  const handleAuthentication = async (context) => {
    setSubmitting(true);
    console.log(user.id);
    const result = await verifyPassword(user.id, verify);
    if (!result.success) {
      setSubmitting(false);
      showError("Invalid password");
      return;
    }
    showSuccess("Password verified successfully");
    setSubmitting(false);
    setAuthenticate(false);
    if (context === "email") {
      return await onSendOTP(email);
    }

    setCredentials((prev) => ({ ...prev, isPasswordVerifying: true }));
    // udpating the user password
    const res = await updateUser(user?.id, password);
    if (!res?.success) {
      setCredentials((prev) => ({
        ...prev,
        isPasswordVerifying: false,
        passwordVerified: false,
      }));
      return showError("Credential update failed");
    }

    setCredentials((prev) => ({
      ...prev,
      isPasswordVerifying: false,
      passwordVerified: true,
    }));
    return showSuccess("Password changed successfully");
  };

  const handleAction = async (type) => {
    if (type === "email") {
      if (!email) return showWarning("Email field cannot be empty");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return showError("Invalid email");
      setContext("email");
    } else {
      if (!password) return showWarning("Password field cannot be empty");
      setContext("password");
    }
    setAuthenticate(true);
  };

  // check if form is verifying
  const isVerifyingEmail = credentials.isEmailVerifying;
  const isVerifyingPassword = credentials.isPasswordVerifying;

  // input styling
  const input_style = `w-full rounded-small border border-lighter px-3 py-2 text-sm text-text_b bg-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition`;

  return (
    <div className="w-full rounded-small border border-lighter shadow-sm flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Email Section */}
      <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-lighter">
        <Label text="Change Email" class_name="font-medium mb-1 block" />
        <div className="relative">
          <input
            placeholder="New email address"
            onChange={(e) => handleInputChange(e.target.value, "email")}
            // value={email}
            type="email"
            autoComplete="off"
            className={input_style}
          />
          <button
            onClick={() => handleAction("email")}
            className="absolute right-1 top-1 bottom-1 px-3 bg-highlightBackground text-xs rounded-small"
          >
            {!isVerifyingEmail
              ? credentials.emailVerified
                ? "Changed ✓"
                : "Change"
              : "Changing..."}
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="flex-1 p-4">
        <Label text={"Change Password"} class_name="font-medium mb-1 block" />
        <div className="flex flex-row gap-2 items-center justify-between ">
          <div className="relative flex-1 w-full flex items-center rounded-small border-[#E3E3E3] bg-[#F6F3F3]">
            <input
              type={clicked ? "text" : "password"}
              placeholder={"Type new password"}
              autoComplete="new-password"
              onChange={(e) => handleInputChange(e.target.value, "password")}
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
            className={`px-3 py-2 text-xs rounded-small bg-highlightBackground`}
          >
            {!isVerifyingPassword
              ? credentials.passwordVerified
                ? "Ready ✓"
                : "Change"
              : "Changing..."}
          </button>
        </div>
      </div>
      <AuthenticationModal
        context={context}
        submit={submitting}
        isOpen={authenticate}
        onClose={() => setAuthenticate(false)}
        onAuthenticate={handleAuthentication}
        onPasswordChange={(e) => setVerify(e.target.value)}
      />
    </div>
  );
}

export default AccountActions;
