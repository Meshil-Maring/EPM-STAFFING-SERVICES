import React from "react";
import AdminNavBar from "../Components/layouts/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { Outlet } from "react-router-dom";

function Admin_Client_Management() {
  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start bg-lighter">
      <AdminNavBar />
      <div className="flex-1 h-dvh flex flex-col bg-b tracking-wide overflow-hidden">
        <div className="flex flex-col items-start justify-center py-2 pl-6 border-b border-light w-full shrink-0">
          <Label text="Client Management" class_name="text-lg font-slighter" />
          <Label text="Track your partnerships" class_name="text-sm" />
        </div>
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
