const API_ROUTES = import.meta.env.VITE_URL;

export const updateByIdService = async (data, URL, id) => {
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

// get data by user id
export const getByUserIdService = async (URL, id) => {
  try {
    const response = await fetch(`${API_ROUTES}/${URL}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

// Create company information
export const createbyUserIdService = async (URL, objData, userId) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objData),
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
