import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Label from "../../../common/Label";
import Input from "../../../common/Input";
import Button from "../../../common/Button";

function PasswordReset({ email, onClose }) {
  // new password form
  const [password, setPassword] = useState({
    new_passowrd: "",
    confirm_password: "",
  });

  //   reseting trigger
  const [resetting, setResetting] = useState(false);
  // scaling trigger when closing
  const [closing, setClosing] = useState(false);
  // handle Closing the app
  const handleClosing = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 50);
  };

  const elements = [
    {
      label: "New Password",
      type: "new password",
      id: "new_password",
    },
    {
      label: "Confirm Password",
      type: "new password",
      id: "confirm_password",
    },
  ];

  //   handle password change
  const handlePasswordChange = (value, id) => {
    setPassword({
      ...password,
      [id]: value,
    });
  };

  //   handle password reset
  const handleClick = async (name) => {
    if (name === "Cancel") return handleClosing();
    if (password.new_passowrd === "" || password.confirm_password === "")
      return showError("Please fill all the fields");
    if (password.new_passowrd !== password.confirm_password)
      return showError("Password mismatch");

    setResetting(true);
    {
      /*
        BACKEND API CALL FOR RESETTING THE PASSWORD
        const result = await resetPassword(email, password.new_passowrd);
        */
    }
    // TEMPORARY DEFINITION OF RESULT DATA FOR TESTING
    const result = {};
    if (!result.success)
      return showError(result.message || "Password Reset failed!");
    showSuccess(result.message || "Password Reset successful!");
    resetting(false);
    handleClosing();
  };

  return createPortal(
    <div className="absolute top-0 left-0 inset-0 bg-lighter flex items-center justify-center z-20000">
      <AnimatePresence mode="wait">
        <motion.form
          autoComplete="off"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: closing ? 0.8 : 1 }}
          className="min-w-md min-h-md flex flex-col tracking-tight items-center justify-center gap-4 rounded-large p-8 bg-b_white shadow-lg"
        >
          <div className="w-full flex flex-col items-center justify-center">
            <Label
              text="Reset your password"
              class_name="font-semibold text-lg text-text"
            />
            <Label
              text="Forgot password? We've got you covered."
              class_name="font-lighter text-xs text-text_l_b"
            />
          </div>

          {elements.map((el) => {
            return (
              <div
                key={el.id}
                className="w-full flex flex-col items-start justify-start gap-1"
              >
                <Label text={el.label} class_name="font-semibold text-md" />
                <Input
                  value={password[el.id]}
                  onchange={handlePasswordChange}
                  id={el.id}
                  type={el.type}
                  class_name={
                    "w-full rounded-small p-2 border border-lighter focus:outline-none focus:ring-2 ring-lighter"
                  }
                />
              </div>
            );
          })}
          <div className="w-full mt-2 grid grid-cols-2 items-center justify-end gap-2">
            {[
              {
                id: "cancel",
                label: "Cancel",
                class_name: "bg-red text-text_white",
              },
              {
                id: "submit",
                label: resetting ? "Resetting..." : "Reset Password",
                class_name: "bg-nevy_blue text-text_white",
              },
            ].map((btn) => {
              return (
                <Button
                  type={btn.id}
                  onclick={handleClick}
                  key={btn.id}
                  text={btn.label}
                  class_name={`p-2 rounded-large ${btn.class_name} ${resetting ? "pointer-events-none opacity-60" : ""}`}
                />
              );
            })}
          </div>
        </motion.form>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default PasswordReset;
