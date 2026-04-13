import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Label from "../../common/Label";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { createPortal } from "react-dom";

/**
 * Authentication modal component for verifying user password before saving changes
 */
function AuthenticationModal({
  isOpen,
  onClose,
  onAuthenticate,
  submit = false,
  context,
}) {
  if (!isOpen) return null;

  // showing password
  const [show, setShow] = useState(false);

  // local password
  const [password, setPassword] = useState("");

  return createPortal(
    <div
      onClick={onClose}
      className="inset-0 z-200 absolute top-0 left-0 p-4 flex items-center justify-center"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, type: "tween" }}
        className="bg-b_white min-w-[40%] min-h-[50%] overflow-hidden rounded-small shadow-xl h-auto flex flex-col items-start justify-start"
      >
        <header className="flex sticky top-0 z-200 w-full bg-g_btn text-text_white border-b flex-row items-center justify-between px-4 py-2 gap-2">
          <Label
            text={"Verify Password"}
            class_name="text-[clamp(1em,2vw,1.2em)] font-bold"
          />

          <span
            className="font-semibold cursor-pointer hover:bg-b_white hover:text-red-dark transition-colors duration-200 flex items-center justify-center p-1 rounded-full"
            onClick={onClose}
            title="Close"
          >
            <Icon
              icon="ri-close-line"
              class_name="transition-all duration-200 ease-in-out w-6 h-6 flex items-center justify-center"
            />
          </span>
        </header>

        <div className="w-full h-full flex-1 flex flex-col items-center justify-center gap-10 p-10">
          <div className="w-full flex flex-col items-start justify-start">
            <Label
              text="Enter Current Password"
              class_name="font-lighter text-[clamp(0.8em,2vw,1.2em)]"
            />
            <span className="w-full flex relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onCut={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onChange={(e) => setPassword(e.target.value)}
                id="verify_password"
                placeholder="Enter password..."
                autoComplete="new-password"
                className="w-full flex py-2 px-2 rounded-small h-full border border-border1 focus:outline-none focus:ring-1 ring-border1 text-[(0.8em,2vw,1.2em)]"
              />
              <span
                onClick={() => setShow((prev) => !prev)}
                className="text-[clamp(1em,2vw,1.4vw)] absolute top-0 bottom-0 flex items-center justify-center right-2"
              >
                <Icon icon={show ? "ri-eye-off-line" : "ri-eye-line"} />
              </span>
            </span>
          </div>
          <Button
            text={submit ? "Submitting..." : "Submit"}
            onclick={() => {
              onAuthenticate(context ?? "");
              password;
            }}
            class_name="bg-g_btn w-full rounded-small py-2 text-text_white "
          />
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}

export default AuthenticationModal;
