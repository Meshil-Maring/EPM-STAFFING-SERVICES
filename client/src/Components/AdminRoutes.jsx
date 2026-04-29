import { useAuth } from "../hooks/useAuth.js";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  const { user, loading } = useAuth();

  console.log(user);

  if (loading) return null; // or loader

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
