import { getByUserIdService } from '../../../api/features/dynamic.service';
import { updateUsers } from '../../../api/features/user.service';
import { updateByUserIdService } from '../../../shared/utils/server_until/service';

const API_ROUTES = import.meta.env.VITE_URL;

/**
 * Get user information
 */
export const getUserInfo = async (id) => {
  const res = await getByUserIdService('api/dr/get', 'user_info', id);

  if (!res.success) {
    return { success: false, message: 'user fetched failed' };
  }

  return { success: true, message: 'fetched successfully', data: res.data };
};

/**
 * Update user email
 */
export const updateUser = async (id, email = null) => {
  const userData = {};

  if (email !== null) {
    userData.email = email;
  }

  if (Object.keys(userData).length > 0) {
    const user = await updateUsers('api/users/update', 'users', id, userData);
    return user;
  }
};

/**
 * Update company information
 */
export const upateCompanyInfo = async (companyData) => {
  const { user_id, company_name, registration_number, description, industry_type } = companyData;

  if (!user_id) {
    return { success: false, message: 'User id is null' };
  }

  const res = await updateByUserIdService(
    'api/dr/update/userId',
    {
      company_name,
      registration_number,
      description,
      industry_type,
    },
    'company_info',
    user_id
  );

  return res;
};

/**
 * Update user contact information
 */
export const updateUserContact = async (contactData) => {
  const { user_id, email, phone, linkedin, website, others } = contactData;

  if (!user_id) {
    return { success: false, message: 'User id is null' };
  }

  const res = await updateByUserIdService(
    'api/dr/update/userId',
    {
      email,
      phone,
      linkedin,
      website,
      others,
    },
    'user_contacts',
    user_id
  );

  return res;
};

/**
 * Update user address
 */
export const updateUserAddress = async (addressData) => {
  const { user_id, street, city, state, pin_code } = addressData;

  if (!user_id) {
    return { success: false, message: 'User id is null' };
  }

  const res = await updateByUserIdService(
    'api/dr/update/userId',
    {
      street,
      city,
      state,
      pin_code,
    },
    'user_address',
    user_id
  );

  return res;
};

/**
 * Verify user password
 */
export const verifyPassword = async (user_id, password) => {
  const res = await fetch(`${API_ROUTES}/api/auth/verify-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, password }),
  });

  const data = await res.json();
  return data;
};

/**
 * Update user password
 */
export const updatePassword = async (user_id, password) => {
  const res = await fetch(`${API_ROUTES}/api/auth/update-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, password }),
  });

  const data = await res.json();
  return data;
};

/**
 * Update user email
 */
export const updateEmail = async (user_id, email) => {
  const res = await fetch(`${API_ROUTES}/api/auth/update-email`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id, email }),
  });

  const data = await res.json();
  return data;
};
