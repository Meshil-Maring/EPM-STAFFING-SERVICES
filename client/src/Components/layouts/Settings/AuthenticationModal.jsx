import React from "react";
import { motion } from "framer-motion";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Icon from "../../common/Icon";

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
      className="inset-0 z-200 absolute top-0 left-0 bg-slate-800/60 pr-4 flex items-center justify-end"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "30%" }}
        transition={{ duration: 0.3, type: "tween" }}
        className="bg-b_white p-4 rounded-small h-[40%] flex flex-col gap-4 items-start justify-between"
      >
        <Label
          class_name={"font-semibold text-lg text-text_b"}
          text={"Verify Authenticity"}
        />
        {authError !== "" && (
          <p className="text-red text-md font-lighter">{authError}</p>
        )}

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
      </motion.div>
    </div>
  );
}

export default AuthenticationModal;
