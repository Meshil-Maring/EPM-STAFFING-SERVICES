const API_ROUTES = import.meta.env.VITE_URL;

// Create an user account
export const createAccount = async (data) => {
  console.log(data);

  try {
    const response = await fetch(`${API_ROUTES}/api/users/create_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(data.error || "Failed to resend OTP");
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
      },
    );

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
