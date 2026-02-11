import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HeaderLayouts from "../Components/layouts/Dashboard/HeaderLayouts";
import NavBar from "../Components/layouts/Dashboard/Navbar/NavBar";
import { useLocation } from "react-router-dom";
import { DashboardSection } from "../context/DashboardSectionContext";
function Dashboard() {
  const { changeSection } = useContext(DashboardSection);
  const new_path = useLocation();
  useEffect(() => {
    const current_btn = new_path.pathname.split("/").at(-1);
    switch (current_btn) {
      case "dashboard":
        changeSection("jobs");
        break;
      case "JobApplienceOverview":
        changeSection("interview pipeline");
        break;
      case "offerReleased":
        changeSection("offer released");
        break;
      default:
        changeSection(current_btn.toLocaleLowerCase());
    }
  }, [new_path]);
  return (
    <div className="w-full relative h-dvh flex flex-row overflow-hidden items-start justify-start bg-b">
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
