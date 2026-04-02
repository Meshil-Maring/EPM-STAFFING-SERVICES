const API_ROUTES = import.meta.env.VITE_URL;

// ================================================
//                  UPDATE
// ================================================

// update by idj
// router.patch("/update/id/:table/:id", updateByIdController);

export const updateByIdService = async (URL, data, table, id) => {
  try {
    const response = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
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

export const updateByColumnNameIdService = async (
  URL,
  data,
  table,
  column_name,
  id,
) => {
  try {
    const response = await fetch(
      `${API_ROUTES}/${URL}/${table}/${column_name}/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update account");
    }

    return await response.json();
  } catch (err) {
    console.error("Update error", err.message);
    return { error: err.message };
  }
};

// ================================================
//                  GET
// ================================================

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

// ================================================
//                  INSERT
// ================================================

// Create company information
export const insertDataService = async (URL, objData) => {
  ("URL: ", URL, "Insert Data: ", objData);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}`, {
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

// ================================================
//                  DELETE
// ================================================
// Create company information
export const deleteByIdService = async (URL, table, id) => {
  ("URL: ", URL, "delete Data: ", id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};
