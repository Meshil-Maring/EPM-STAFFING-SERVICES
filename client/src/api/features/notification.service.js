const API_URL = import.meta.env.VITE_URL;

// GET /api/notifications/:user_id
export const getClientNotification = async (user_id) => {
  const res = await fetch(`${API_URL}/api/notifications/${user_id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Failed to fetch notifications");
  }

  return res.json();
};
