import React, { useContext, useEffect } from "react";
import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { useLocation, Outlet } from "react-router-dom";
import { admin_navbar_context } from "../context/AdminNavContext";
import ContentAppsView from "../Components/layouts/Admin/AdminClientManagement/ContentAppsView";
import Settings from "./Settings";

function Admin_Client_Management() {
  const { setSection } = useContext(admin_navbar_context);
  const location = useLocation();

  useEffect(() => {
    // Extract the last part of the pathname from the location object
    const nav_button = location.pathname.split("/").at(-1);

    // Map pathname to section name for admin navigation
    let sectionName = "Client Management"; // Default

    switch (nav_button) {
      case "management":
        sectionName = "Client Management";
        break;
      case "submittedCandidates":
        sectionName = "Submitted Candidates";
        break;
      case "AdminSettings":
        sectionName = "Settings";
        break;
      default:
        // For the root path or unknown paths, default to Client Management
        sectionName = "Client Management";
    }

    // Update the section in context (this will also save to sessionStorage)
    setSection(sectionName);
  }, [location, setSection]);

  // Get the current section to determine what to render

  // Render different components based on the section

  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start ">
      <AdminNavBar />

      <div className="flex flex-col w-full h-full overflow-hidden">
        <header className="flex flex-col items-start justify-center py-4 px-6 w-full border-b border-lighter">
          <Label
            as="h1"
            text="Client Management"
            class_name="text-[clamp(1.2em,2vw,1.4em)] font-semibold text-text_b"
          />
          <Label
            as="p"
            text="Track your partnerships"
            class_name="text-sm text-text_b_l opacity-80"
          />
        </header>
        <main className="w-full h-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
