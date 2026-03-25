const API_ROUTES = import.meta.env.VITE_URL;

export const updateData = async (data, URL, id) => {
  try {
    const response = await fetch(`${API_ROUTES}/${URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update account");
    }

    return await response.json();
  } catch (err) {
    console.error("Update Error:", err.message);
    return { error: err.message };
  }
};
