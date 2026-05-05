import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query"; //
import { Bell, LogOut } from "lucide-react";

import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import OverviewHeading from "../Components/layouts/Admin/common/OverviewHeading";
import Notifications from "../Components/layouts/Notifications/Notifications";
import {
  getAdminNotification,
  getClientNotification,
} from "../Components/layouts/Notifications/notification.js";

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
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
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

// ── Reusable header action buttons ──────────────────────────────────────────
function HeaderActions({ isLoading, unreadCount, onBellClick, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* Bell */}
      <button
        onClick={onBellClick}
        className="relative bg-black/10 hover:bg-black/15 transition-colors duration-150 p-2 rounded-full cursor-pointer"
      >
        <Bell size={20} color="black" />
        {!isLoading && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200 mx-1" />

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-red-50 hover:border-red-200 group transition-all duration-150 cursor-pointer"
      >
        <LogOut
          size={15}
          className="text-slate-500 group-hover:text-red-500 transition-colors duration-150"
        />
        <span className="text-sm font-medium text-slate-500 group-hover:text-red-500 transition-colors duration-150">
          Log out
        </span>
      </button>
    </div>
  );
}

function Admin_Client_Management() {
  const API_ROUTES = import.meta.env.VITE_URL;

  const current_navbutton = sessionStorage.getItem("current_navbutton");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const management = current_navbutton === "management";
  const isListedJobs = pathname.split("/").at(-1) === "listed_jobs";
  const [openNotification, setOpenNotification] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAdminNotification,
  });

  const notes = (data?.data ?? []).map(normalizeNote);
  const unreadCount = notes.filter((n) => !n.read).length;

  const handleLogout = async () => {
    await fetch(`${API_ROUTES}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    sessionStorage.clear();

    queryClient.clear();

    navigate("/auth/signin");
  };

  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start">
      <AdminNavBar />

      <div className="flex flex-col w-full h-full overflow-hidden">
        {management ? (
          <OverviewHeading />
        ) : isListedJobs ? (
          <div className="w-full flex border-b border-lighter flex-row items-center justify-between px-6">
            <header className="flex flex-col items-start justify-center py-4 w-full">
              <Label
                text="Listed Jobs"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />
              <Label
                text="Browse all available positions"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>

            <HeaderActions
              isLoading={isLoading}
              unreadCount={unreadCount}
              onBellClick={() => setOpenNotification(true)}
              onLogout={handleLogout}
            />
          </div>
        ) : (
          <div className="w-full flex px-6 border-b border-lighter flex-row items-center justify-between">
            <header className="flex flex-col items-start justify-center py-4 w-full">
              <Label
                text="Client Management"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />
              <Label
                text="Track your partnerships"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>
            <HeaderActions
              isLoading={isLoading}
              unreadCount={unreadCount}
              onBellClick={() => setOpenNotification(true)}
              onLogout={handleLogout}
            />
          </div>
        )}

        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </div>

      {openNotification && (
        <Notifications
          onClose={() => setOpenNotification(false)}
          notes={notes}
        />
      )}
    </div>
  );
}

export default Admin_Client_Management;
