import React from "react";
import HeaderLayouts from "../Components/layouts/HeaderLayouts";
import NavBar from "../Components/layouts/NavBar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="w-full h-dvh flex flex-row overflow-y-hidden">
      <NavBar />
      <div className="flex flex-col overflow-y-hidden w-full h-full">
        <HeaderLayouts />
        <main className="flex-1 overflow-y-auto shadow-inner-lighter flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
