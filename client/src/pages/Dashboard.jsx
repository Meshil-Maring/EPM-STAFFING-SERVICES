import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
const HeaderLayouts = lazy(() =>
  import("../Components/layouts/Dashboard/HeaderLayouts")
);
const NavBar = lazy(() =>
  import("../Components/layouts/Dashboard/Navbar/NavBar")
);

function Dashboard() {
  return (
    <Suspense fallback={<div>Loading Content...</div>}>
      <div className="w-full h-dvh flex flex-row overflow-y-hidden items-start justify-start">
        <NavBar />
        <div className="flex flex-col overflow-y-hidden w-full h-full">
          <HeaderLayouts />
          <main className="flex-1 overflow-y-hidden shadow-inner-lighter flex items-start justify-center">
            <Outlet />
          </main>
        </div>
      </div>
    </Suspense>
  );
}
export default Dashboard;
