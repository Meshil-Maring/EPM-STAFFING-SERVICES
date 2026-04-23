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

export const getByColumnName = async (URL, table, column, id) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${column}/${id}`, {
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
//router.post("api/dr/insert/:table", insertController);

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

// router.patch("/update/id/:table/:id", updateByIdController);

export const updateByIdService = async (URL, data, table, id) => {
  console.log(data);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    return resData;
  } catch (err) {
    return err;
  }
};

export const putByIdService = async (URL, table, data, id) => {
  console.log(URL, data, table, id);

  try {
    const res = await fetch(`${API_ROUTES}/${URL}/id/${table}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    console.log(res);

    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

/*
========================================
            DELETE
========================================
*/
// router.delete("/delete/id/:table/:id", deleteController);

export const deleteService = async (URL, table, id) => {
  try {
    const res = await fetch(`${API_ROUTES}/${URL}/${table}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = res.json();

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
