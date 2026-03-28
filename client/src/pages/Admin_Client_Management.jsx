import React, { useContext, useEffect, useState } from "react";
import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { Link, Outlet } from "react-router-dom";
import OverviewHeading from "../Components/layouts/Admin/common/OverviewHeading";
import { useLocation } from "react-router-dom";

function Admin_Client_Management() {
  // Get current active navigation button from session storage
  const current_navbutton = sessionStorage.getItem("current_navbutton");

  // Get current URL path (example: /admin/management/follow_clients)
  const { pathname } = useLocation();

  // Check if user is in "management" main page
  const management = current_navbutton === "management";

  // Check if current route is "follow_clients"
  const isFollowClients = pathname.split("/").at(-1) === "follow_clients";

  // Check if current route is "listed_jobs"
  const isListedJobs = pathname.split("/").at(-1) === "listed_jobs";

  return (
    // Main container (full screen, horizontal layout)
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start ">
      {/* Left side Admin Navigation Bar */}
      <AdminNavBar />

      {/* Right side content area */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* ================= HEADER SECTION ================= */}

        {/* If current section is "management" */}
        {management ? (
          <OverviewHeading />
        ) : isListedJobs ? (
          // If user is on "Listed Jobs" page
          <div className="w-full flex border-b border-lighter flex-row items-center justify-between">
            <header className="flex flex-col items-start justify-center py-4 px-4 w-full">
              {/* Page Title */}
              <Label
                text="Listed Jobs"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />

              {/* Subtitle */}
              <Label
                text="Browse all available positions"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>
          </div>
        ) : (
          // Default: Client Management page
          <div className="w-full flex px-6 border-b border-lighter flex-row items-center justify-between">
            <header className="flex flex-col items-start justify-center py-4 px-6 w-full">
              {/* Page Title */}
              <Label
                text="Client Management"
                class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
              />

              {/* Subtitle */}
              <Label
                text="Track your partnerships"
                class_name="text-sm text-text_b_l opacity-80"
              />
            </header>

            {/* Show "Add Client" button ONLY in follow_clients page */}
            {isFollowClients && (
              <Link
                // When clicked, update session storage
                onClick={() =>
                  sessionStorage.setItem(
                    "current_navbutton",
                    "client_management",
                  )
                }
                // Navigate to management page with query param
                to={"/admin/management?showUnfollowed=true"}
                // Styling
                className="text-sm whitespace-nowrap text-text_white bg-g_btn py-2 px-4 transition-all duration-150 ease-in-out hover:scale-[1.02] cursor-pointer rounded-sm font-semibold"
              >
                + Add Client
              </Link>
            )}
          </div>
        )}

        {/* ================= MAIN CONTENT ================= */}

        {/* Outlet renders nested routes here */}
        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
