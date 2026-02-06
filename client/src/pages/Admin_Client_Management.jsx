import React, { useContext, useEffect } from "react";
import AdminNavBar from "../Components/layouts/Admin/AdminClientManagement/AdminNavBar";
import Label from "../Components/common/Label";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
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
      case "settings":
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
  const { section } = useContext(admin_navbar_context);

  // Render different components based on the section
  const renderContent = () => {
    switch (section) {
      case "Client Management":
      case "Submitted Candidates":
        return <ContentAppsView />;
      case "Settings":
        return <Settings />;
      default:
        return <ContentAppsView />;
    }
  };

  return (
    <div className="w-full h-dvh flex flex-row overflow-hidden items-start justify-start bg-b_white">
      <AdminNavBar />

      <div className="flex-1 h-full flex flex-col bg-b_white backdrop-blur-sm tracking-wide overflow-hidden">
        <header className="flex flex-col items-start justify-center py-3 pl-6 w-full shadow-lg shrink-0">
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

        <section className="flex-1 overflow-y-auto">{renderContent()}</section>
      </div>
    </div>
  );
}

export default Admin_Client_Management;
