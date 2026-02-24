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
    const current_btn = new_path.pathname.split("/").at(-1) || "";
    const navKey = current_btn.toLocaleLowerCase();

    switch (navKey) {
      case "dashboard":
        changeSection("jobs");
        break;
      case "jobapplienceoverview":
        changeSection("jobs");
        break;
      case "offerreleased":
        changeSection("offer released");
        break;
      default:
        changeSection(navKey);
    }
  }, [new_path, changeSection]);
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
