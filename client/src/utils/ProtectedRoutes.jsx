/**
 * ProtectedRoutes component
 *
 * A route guard component that protects routes requiring user authentication.
 * This component checks if a user is logged in and has the appropriate user type
 * (company) before allowing access to protected routes. If not authenticated,
 * it redirects users to the signing page.
 */

import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { log_state } from "../context/LogState";
import { showError } from "./toastUtils";

/**
 * ProtectedRoutes functional component
 *
 * @returns {JSX.Element} Either the protected route content or a redirect
 */
function ProtectedRoutes() {
  // const { log } = useContext(log_state);
  // const user_type = sessionStorage.getItem("logged_user_type");
  // // Check if user is authenticated as a company
  // const isCompany = user_type === "company" && log;
  // if (!isCompany) showError("Protected Route");
  // // Render protected content or redirect based on authentication status
  // return isCompany ? <Outlet /> : <Navigate to={"auth/signin"} />;
}

export default ProtectedRoutes;
