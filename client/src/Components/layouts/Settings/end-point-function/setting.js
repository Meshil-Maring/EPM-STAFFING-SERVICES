import { getByUserIdService } from "../../../../services/dynamic.service";
import { updateUsers } from "../../../../services/user.service";
import { updateByUserIdService } from "../../../../utils/server_until/service";
const API_ROUTES = import.meta.env.VITE_URL;

export const getUserInfo = async (id) => {
  const res = await getByUserIdService("api/dr/get", "user_info", id);

  if (!res.success) return { success: false, message: "user fetched failed" };

  return { success: true, message: "fetched successfully", data: res.data };
};

/*
================================
            UPATE 
================================
*/

// update user info
export const updateUser = async (id, email = null, password = null) => {
  const userData = {};

  if (email !== null) {
    userData.email = email;
  }

  if (password !== null) {
    userData.password = password;
  }

  if (Object.keys(userData).length > 0) {
    const user = await updateUsers("api/users/update", "users", id, userData);
    return user;
  }
};

// update company
export const upateCompanyInfo = async (
  user_id,
  company_name,
  registration_number,
  description,
  industry_type, //type enum: Banking, IT Services, Insurance, Healthcare, Education, Manufacturing, Retail, Logistics, Consulting, Marketing, Construction, Other
) => {
  if (!user_id) return { success: false, message: "User id is null" };

  const res = await updateByUserIdService(
    "api/dr/update/userId",
    {
      company_name,
      registration_number,
      description,
      industry_type,
    },
    "company_info",
    user_id,
  );

  return res;
};

// update user contact
export const updateUserContact = async (
  user_id,
  email,
  phone,
  others, // Type: Array Object, example: [{ label: "facebook", value: "https:co" }, {label: "youtube", value: "https/"}]
) => {
  if (!user_id) return { success: false, message: "User id is null" };

  const res = await updateByUserIdService(
    "api/dr/update/userId",
    {
      email,
      phone,
      others,
    },
    "user_contacts",
    user_id,
  );

  return res;
};

// update user address
export const updateUserAddress = async (
  user_id,
  street,
  city,
  state,
  pin_code,
) => {
  if (!user_id) return { success: false, message: "User id is null" };

  const res = await updateByUserIdService(
    "api/dr/update/userId",
    {
      street,
      city,
      state,
      pin_code,
    },
    "user_address",
    user_id,
  );

  return res;
};

/*
================================
         PASSWORD
================================
*/

export const verifyPassword = async (user_id, password) => {
  const res = await fetch(`${API_ROUTES}/api/auth/verify-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, password }),
  });

  console.log(res);

  const data = await res.json();

  return data;
};

// update password by id
export const updatePassword = async (user_id, password) => {
  const res = await fetch(`${API_ROUTES}/api/auth/update-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, password }),
  });

  const data = await res.json();

  return data;
};

/*
================================
        EMAIL
================================
*/

export const updateEmail = async (user_id, email) => {
  const res = await fetch(`${API_ROUTES}/api/auth/update-email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, email }),
  });

  const data = await res.json();

  return data;
};
