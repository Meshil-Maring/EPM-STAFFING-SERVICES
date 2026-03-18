/**
 * Signing page component
 *
 * The main layout container for authentication-related pages including
 * login and registration flows. This component provides the overall structure
 * for the signing process with a header and outlet for nested routes.
 */

import React from "react";
import TopHeader from "../Components/layouts/SigningpagesLayouts/TopHeader";
import { Outlet } from "react-router-dom";

/**
 * Signing page functional component
 *
 * @returns {JSX.Element} The complete signing page layout with header and content area
 */
function Signing() {
  return (
    <main className="h-dvh w-full overflow-y-hidden bg-b_white space-y-2 flex flex-col items-center justify-start ">
      <TopHeader />
      <Outlet />
    </main>
  );
}

export default Signing;
