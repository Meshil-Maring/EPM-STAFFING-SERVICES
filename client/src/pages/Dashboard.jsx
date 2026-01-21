import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLayouts from "../Components/layouts/Dashboard/HeaderLayouts";
import NavBar from "../Components/layouts/Dashboard/Navbar/NavBar";

function Dashboard() {
  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start bg-b">
      <NavBar />

      <div className="flex flex-col w-full h-full overflow-hidden">
        <HeaderLayouts />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto flex items-start justify-center bg-white"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
