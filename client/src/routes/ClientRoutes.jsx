import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ClientRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user || user.role !== "user") {
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
}

export default ClientRoutes;
