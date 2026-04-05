const API_ROUTES = import.meta.env.VITE_URL;

/*
========================================
              GET 
========================================
*/

export const getByIdService = async (URL, table, id) => {
  ("URL: ", URL, "table: ", table, "id: ", id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getByUserIdService = async (URL, table, id) => {
  ("getByUserIdService", "URL: ", URL, "table: ", table, "id: ", id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

/*
========================================
            INSERT/POST
========================================
*/
export const insertDataService = async (URL, table, dataObj) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataObj),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

/*
========================================
              UPDATE
========================================
*/
const updateDataSevice = async (URL, table, id) => {};
