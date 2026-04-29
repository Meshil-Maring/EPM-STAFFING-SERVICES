import React, { useContext, useEffect, useState } from "react";
import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { Link, Outlet } from "react-router-dom";
import OverviewHeading from "../Components/layouts/Admin/common/OverviewHeading";
import { useLocation } from "react-router-dom";

function Admin_Client_Management() {
  const current_navbutton = sessionStorage.getItem("current_navbutton");
  const { pathname } = useLocation();
  const management = current_navbutton === "management";
  const isFollowClients = pathname.split("/").at(-1) === "follow_clients";
  const isListedJobs = pathname.split("/").at(-1) === "listed_jobs";

  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start ">
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
            {/* {isFollowClients && (
              <Link
                onClick={() =>
                  sessionStorage.setItem(
                    "current_navbutton",
                    "client_management",
                  )
                }
                to={"/admin/management?showUnfollowed=true"}
                className="text-sm whitespace-nowrap text-text_white bg-g_btn py-2 px-4 transition-all duration-150 ease-in-out hover:scale-[1.02] cursor-pointer rounded-sm font-semibold"
              >
                + Add Client
              </Link>
            )} */}
          </div>
        )}
        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
