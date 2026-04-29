import { useAuth } from "../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
