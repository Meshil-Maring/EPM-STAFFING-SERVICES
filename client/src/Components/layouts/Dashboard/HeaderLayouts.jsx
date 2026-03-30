import React, { useState } from "react";
import Icon from "../../common/Icon";
import LogoHeadings from "./LogoHeadings";
import Label from "../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { showInfo } from "../../../utils/toastUtils";
import Notifications from "../Notifications/Notifications";

function HeaderLayouts() {
  const [logout, setLogout] = useState(false);
  const [close, setClose] = useState(false);
  const navigate = useNavigate();
  const [note_overlay, setNot_overlay] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleAction = (name) => {
    if (name === "Profile") return setLogout(true);
    if (name === "Notifications") return setNot_overlay(true);
  };

  const handleConfirming = (name) => {
    if (name === "Confirm") {
      showInfo("Closing...");
      setClose(true);
      setTimeout(() => {
        setClose(false);
        sessionStorage.clear();
        sessionStorage.setItem("logged_state", "false");
        navigate("/");
      }, 2000);
      return;
    }
    setLogout(false);
  };

  return (
    <>
      <header className="flex pr-9 pl-5 py-2 border-b border-lighter flex-row items-center justify-start shadow-lg sticky top-0 bg-white ">
        <nav
          className="w-full flex flex-row items-center justify-between"
          aria-label="Main Header"
        >
          <LogoHeadings />

          <div className="flex flex-row gap-5 items-center justify-end ml-auto">
            <a
              href="/Empanelment_Agreement.pdf"
              rel="noopener noreferrer"
              target="_blank"
              className="py-1 px-4 rounded-small flex flex-row items-center justify-center space-x-1 bg-g_btn text-text_white"
            >
              <Icon icon={"ri-file-text-line"} class_name="" />
              <Label text={"Agreement"} class_name={""} />
            </a>

            <div
              onClick={() => handleAction("Notifications")}
              className="relative w-8 h-8 flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors outline-none focus:ring-2 focus:ring-Darkgold"
              aria-label="View 1 new notification"
            >
              <Icon
                icon="ri-notification-4-line"
                class_name="text-lg text-text_b"
              />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full bg-Darkgold border-2 border-white"
                aria-hidden="true"
              />
            </div>

            <div className="flex flex-row items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => handleAction("Profile")}
                  className="w-10 h-10 rounded-full p-0.5 bg-g_btn text-white hover:opacity-90 transition-opacity outline-none focus:ring-2 focus:ring-Darkgold"
                  aria-label="User Profile"
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                    <Icon icon="ri-user-line" class_name="text-2xl" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {logout && (
        <div
          onClick={() => setLogout(false)}
          className="w-full z-200 inset-0 absolute top-0 right-0 p-4 flex items-center justify-center bg-light_black/30"
        >
          <AnimatePresence mode="wait">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 200,
                ease: "easeInOut",
              }}
              className="shadow-xl border text-sm border-lighter bg-b_white p-4 rounded-small flex flex-col items-center justify-center gap-4 "
            >
              <Label text={"Confirm to close the App!"} />
              <div className="w-full flex flex-row items-center justify-center space-x-2">
                {["Confirm", "Cancel"].map((btn) => {
                  const isConfirm = btn === "Confirm";
                  return (
                    <Button
                      onclick={handleConfirming}
                      text={btn}
                      key={btn}
                      class_name={`py-1 px-4 rounded-small ${isConfirm ? "bg-g_btn text-text_white" : "border-2 border-lighter hover:bg-lighter"}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {close && (
        <div className="absolute top-0 left-0 inset-0 bg-light/10 z-300" />
      )}
      {note_overlay && (
        <Notifications onClose={setNot_overlay} notes={notifications} />
      )}
    </>
  );
}

export default HeaderLayouts;
