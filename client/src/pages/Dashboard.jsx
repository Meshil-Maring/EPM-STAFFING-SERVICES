/**
 * Dashboard page component
 *
 * The main dashboard layout for authenticated users. This component provides
 * the overall structure for the user dashboard including navigation sidebar,
 * header, and a dynamic content area that renders child routes. It serves as
 * the container for all authenticated user functionality.
 */

import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLayouts from "../Components/layouts/Dashboard/HeaderLayouts";
import NavBar from "../Components/layouts/Dashboard/Navbar/NavBar";

/**
 * Dashboard page functional component
 *
 * @returns {JSX.Element} The complete dashboard layout with navigation and content area
 */
function Dashboard() {
  return (
    <div className="w-full relative h-dvh flex flex-row overflow-hidden items-start justify-start bg-b">
      {/* Navigation sidebar */}
      <NavBar />

      {/* Main content area with header and dynamic content */}
      <div className="flex flex-col w-full h-full overflow-hidden">
        {/* Dashboard header with user info and actions */}
        <HeaderLayouts />
        {/* Dynamic content area that renders child route components */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto flex items-start justify-start bg-white px-4 md:px-6 lg:px-8 xl:px-10"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
