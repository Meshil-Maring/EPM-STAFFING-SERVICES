import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, ImageOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Icon from "../../common/Icon";
import LogoHeadings from "./LogoHeadings";
import Label from "../../common/Label";
import { showInfo } from "../../../utils/toastUtils";
import Button from "../../common/Button";
import Notifications from "../Notifications/Notifications";
import {
  getAdminNotification,
  getClientNotification,
} from "../Notifications/notification";

const TYPE_MAP = {
  job_post: "info",
  job_update: "info",
  candidate_applied: "success",
  candidate_accepted: "success",
  candidate_rejected: "error",
  interview_scheduled: "warning",
  offer_sent: "success",
};

function formatTime(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function normalizeNote(item) {
  return {
    id: item.id,
    title: item.title,
    message: item.message,
    time: formatTime(item.created_at),
    type: TYPE_MAP[item.type] ?? "info",
    read: item.is_read,
  };
}

function HeaderLayouts() {
  const [logout, setLogout] = useState(false);
  const [close, setClose] = useState(false);
  const [note_overlay, setNot_overlay] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["client-notifications"],
    queryFn: getAdminNotification,
  });

  const notes = (data?.data ?? []).map(normalizeNote);
  const unreadCount = notes.filter((n) => !n.read).length;

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

            {/* ── Bell Button ── */}
            <button
              onClick={() => handleAction("Notifications")}
              className="relative bg-black/10 hover:bg-black/15 transition-colors duration-150 p-2 rounded-full"
            >
              <Bell size={22} color="black" />

              {!isLoading && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

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

      {/* ── Logout Modal ── */}
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
              <div className="h-1 w-full bg-g_btn" />

              <div className="px-7 pt-7 pb-6 flex flex-col items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
                  <Icon
                    icon="ri-logout-box-r-line"
                    class_name="text-2xl text-red-500"
                  />
                </div>

                <div className="text-center">
                  <p className="text-base font-semibold text-gray-900 mb-1">
                    Sign out of your account?
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    You'll need to sign back in to access your dashboard and
                    data.
                  </p>
                </div>

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

      {/* ── Notifications Overlay ── */}
      {note_overlay && <Notifications onClose={setNot_overlay} notes={notes} />}
    </>
  );
}

export default HeaderLayouts;
