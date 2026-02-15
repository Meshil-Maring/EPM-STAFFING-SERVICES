import React from "react";
import { motion } from "framer-motion";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import Header from "../Dashboard/Candidate/Common/Header";

/**
 * Authentication modal component for verifying user password before saving changes
 */
function AuthenticationModal({
  isOpen,
  onClose,
  onAuthenticate,
  authError,
  onPasswordChange,
  showPassword,
  onTogglePassword,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="inset-0 z-200 absolute top-0 left-0 p-4 flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="bg-b_white overflow-hidden rounded-small shadow-xl h-[40%] w-[30%] flex flex-col gap-4 items-start justify-between"
      >
        <Header heading={"Verify Authenticity"} handleClosingModal={onClose} />
        {authError !== "" && (
          <p className="text-red text-md font-lighter">{authError}</p>
        )}
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-4 p-4">
          <div className="w-full flex flex-col items-start justify-start">
            <Label
              text="Enter Current Password"
              class_name="font-lighter text-[clamp(0.8em,2vw,1.2em)]"
            />
            <span className="w-full flex relative">
              <input
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                type={showPassword ? "text" : "password"}
                onChange={onPasswordChange}
                id="verify_password"
                placeholder="Enter password..."
                autoComplete="new-password"
                className="w-full flex py-2 px-2 rounded-small h-full border border-border1 focus:outline-none focus:ring-1 ring-border1 text-[(0.8em,2vw,1.2em)]"
              />
              <span
                onClick={onTogglePassword}
                className="text-[clamp(1em,2vw,1.4vw)] absolute top-0 bottom-0 flex items-center justify-center right-2"
              >
                <Icon icon={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
              </span>
            </span>
          </div>
          <Button
            text={"Submit"}
            onclick={onAuthenticate}
            class_name="bg-g_btn w-full rounded-small py-2 text-text_white "
          />
        </div>
      </motion.div>
    </div>
  );
}

export default AuthenticationModal;
