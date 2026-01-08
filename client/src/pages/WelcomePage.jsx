import React from "react";
import { Outlet } from "react-router-dom";

function WelcomePage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <Outlet />
    </main>
  );
}

export default WelcomePage;
