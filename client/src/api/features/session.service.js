const API_ROUTES = import.meta.env.VITE_URL;

export const checkSession = async () => {
  try {
    const response = await fetch(`${API_ROUTES}/api/users/check-session`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check session");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
