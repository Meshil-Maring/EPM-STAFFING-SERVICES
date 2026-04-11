const API_ROUTES = import.meta.env.VITE_URL;

/*
========================================
              GET 
========================================
*/
// router.get("/get/:table", getWithPageController);
export const getWithPageService = async (URL, table, page) => {
  ("URL: ", URL, "table: ", table, "page: ", page);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}?page=${page}`, {
      method: "GET",
      credentials: "include",
    });

    const data = res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

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
export const updateByIdSevice = async (URL, data, table, id) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(data),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    return err;
  }
};

/*
========================================
            DELETE
========================================
*/

export const deleteService = async (URL, table, id) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    console.log(res);
  } catch (err) {
    console.log(err);
    return err;
  }
};
