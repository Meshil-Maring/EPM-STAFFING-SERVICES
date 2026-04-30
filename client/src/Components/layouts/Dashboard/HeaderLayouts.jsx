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
      showInfo("Log Out...");
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
      <header className="flex pr-9 pl-5 py-2 border-b border-lighter flex-row items-center justify-start shadow-md/5 sticky top-0 bg-white">
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
              aria-label="View notifications"
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

      {/* ── Logout Modal ───────────────────────────────────────────────────── */}
      {logout && (
        <div
          onClick={() => setLogout(false)}
          className="fixed inset-0 z-300 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={{
                duration: 0.18,
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[340px] overflow-hidden"
            >
              {/* Top accent strip */}
              <div className="h-1 w-full bg-g_btn" />

              <div className="px-7 pt-7 pb-6 flex flex-col items-center gap-5">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                  <Icon
                    icon="ri-logout-box-r-line"
                    class_name="text-2xl text-red-500"
                  />
                </div>

                {/* Text */}
                <div className="text-center">
                  <p className="text-base font-semibold text-gray-900 mb-1">
                    Sign out of your account?
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    You'll need to sign back in to access your dashboard and
                    data.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2.5 w-full">
                  <Button
                    onclick={handleConfirming}
                    text="Confirm"
                    class_name="w-full py-2.5 rounded-xl bg-g_btn text-text_white text-sm font-semibold hover:opacity-90 transition-opacity"
                  />
                  <Button
                    onclick={handleConfirming}
                    text="Cancel"
                    class_name="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {close && <div className="fixed inset-0 bg-white/10 z-300" />}

      {note_overlay && (
        <Notifications onClose={setNot_overlay} notes={notifications} />
      )}
    </>
  );
}

export default HeaderLayouts;
