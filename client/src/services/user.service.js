const API_ROUTES = import.meta.env.VITE_URL;

// Create an user account
export const createAccount = async (data) => {
  try {
    const response = await fetch(`${API_ROUTES}/api/users/create_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }

    const res = await response.json();
    return res;
  } catch (err) {
    return err;
  }
};

// GET an user account by email
export const getUserByEmail = async (email) => {
  try {
    const response = await fetch(
      `${API_ROUTES}/api/users?email=${encodeURIComponent(email)}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

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

// Create company information
export const createCompanyInfo = async (objData) => {
  try {
    const res = await fetch(`${API_ROUTES}/api/users/create/company_info`, {
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

// Create company information
export const createContactInfo = async (objData) => {
  try {
    const res = await fetch(`${API_ROUTES}/api/users/create/user_contacts`, {
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

// Create company address
export const createAddress = async (objData) => {
  try {
    const res = await fetch(`${API_ROUTES}/api/users/create/user_address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objData),
      credentials: "include",
    });

    const data = res.json();

    return data;
  } catch (err) {
    throw err;
  }
};

// log in
export const loginService = async (email, password) => {
  const res = await fetch(`${API_ROUTES}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  return data;
};
