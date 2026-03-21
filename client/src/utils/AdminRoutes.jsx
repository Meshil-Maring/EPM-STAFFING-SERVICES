/**
 * AdminRoutes component
 *
 * A route guard component specifically for admin-only routes. This component
 * checks if a user is logged in and has admin privileges before allowing access
 * to administrative functionality. If not authenticated as an admin, it redirects
 * users to the signing page.
 */

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { log_state } from "../context/LogState";

/**
 * AdminRoutes functional component
 *
 * @returns {JSX.Element} Either the admin route content or a redirect
 */
function AdminRoutes() {
  const { log } = useContext(log_state);
  const user_type = sessionStorage.getItem("logged_user_type");

  // Check if user is authenticated as an admin
  const isAdmin = user_type === "admin" && log;

  // Render admin content or redirect based on authentication status
  return isAdmin ? <Outlet /> : <Navigate to={"/auth/signin"} />;
}

export default AdminRoutes;
