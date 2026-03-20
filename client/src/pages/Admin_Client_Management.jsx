import React, { useContext, useEffect, useState } from "react";
import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { Outlet } from "react-router-dom";
import OverviewHeading from "../Components/layouts/Admin/common/OverviewHeading";

function Admin_Client_Management() {
  const current_navbutton = sessionStorage.getItem("current_navbutton");
  const management = current_navbutton === "management";
  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start ">
      <AdminNavBar />

      <div className="flex flex-col w-full h-full overflow-hidden">
        {management ? (
          <OverviewHeading />
        ) : (
          <header className="flex border flex-col items-start justify-center py-4 px-6 w-full border-b border-lighter">
            <Label
              text="Client Management"
              class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
            />
            <Label
              text="Track your partnerships"
              class_name="text-sm text-text_b_l opacity-80"
            />
          </header>
        )}
        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
