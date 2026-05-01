import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import OverviewHeading from "../Components/layouts/Admin/common/OverviewHeading";
import Notifications from "../Components/layouts/Notifications/Notifications";
import { getClientNotification } from "../Components/layouts/Notifications/notification.js";

// Map API "type" values → Notification component icon types
const TYPE_MAP = {
  job_post: "info",
  job_update: "info",
  candidate_applied: "success",
  candidate_accepted: "success",
  candidate_rejected: "error",
  interview_scheduled: "warning",
  offer_sent: "success",
};

// Format ISO timestamp → human-readable relative time
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

// Normalize API response item → shape expected by <Notifications />
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

function Admin_Client_Management() {
  const current_navbutton = sessionStorage.getItem("current_navbutton");
  const { pathname } = useLocation();
  const management = current_navbutton === "management";
  const isListedJobs = pathname.split("/").at(-1) === "listed_jobs";
  const [openNotification, setOpenNotification] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getClientNotification,
  });

  // Normalize raw API data into component-ready shape
  const notes = (data?.data ?? []).map(normalizeNote);
  const unreadCount = notes.filter((n) => !n.read).length;

  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start">
      <AdminNavBar />

      <div className="flex flex-col w-full h-full overflow-hidden">
        {management ? (
          <OverviewHeading />
        ) : isListedJobs ? (
          <div className="w-full flex border-b border-lighter flex-row items-center justify-between">
            <header className="flex flex-col items-start justify-center py-4 px-4 w-full">
              <Label
                text="Listed Jobs"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />
              <Label
                text="Browse all available positions"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>
          </div>
        ) : (
          <div className="w-full flex px-6 border-b border-lighter flex-row items-center justify-between">
            <header className="flex flex-col items-start justify-center py-4 px-6 w-full">
              <Label
                text="Client Management"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />
              <Label
                text="Track your partnerships"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>

            {/* Bell button — only show when NOT in management/listedJobs views */}
            <button
              onClick={() => setOpenNotification(true)}
              className="relative bg-black/10 hover:bg-black/15 transition-colors duration-150 p-2 rounded-full"
            >
              <Bell size={22} color="black" />

              {/* Badge — hidden when 0 or still loading */}
              {!isLoading && unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
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
