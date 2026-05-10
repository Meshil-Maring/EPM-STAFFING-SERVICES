import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function YourComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    queryClient.clear();
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
