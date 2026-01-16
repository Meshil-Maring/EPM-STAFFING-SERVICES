import sql from "../config/db.js";

// Get all user information
export const getAllUsers = async () => {
  try {
    const users = await sql`
    SELECT * FROM users
    `;

    if (!users || users.length === 0) {
      throw new Error("User is not found!");
    }

    return users;
  } catch (err) {
    throw err;
  }
};

// GET: user by id
export const getUserById = async (id) => {
  const user = await sql`SELECT * FROM users WHERE id = ${id}`;

  if (!user || user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
};

// Create user account
export const createUserDb = async (
  company_name,
  email,
  cin,
  location,
  phone,
  password
) => {
  try {
    const result =
      await sql`INSERT INTO users (company_name, email, cin, location, phone, password, update_at) VALUES (${company_name}, ${email}, ${cin}, ${location}, ${phone}, ${password}, NOW()) RETURNING *`;

    return result[0];
  } catch (err) {
    throw err;
  }
};

// Delete account
export const deleteUser = async (id) => {
  try {
    const deletedUser =
      await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;

    if (deletedUser.length === 0) return [];

    return deletedUser[0];
  } catch (err) {
    throw err;
  }
};

export const updateAccountDb = async (
  id,
  company_name,
  email,
  cin,
  location,
  phone,
  password
) => {
  // password is not secure
  try {
    const updatedUser = await sql`
      UPDATE users
      SET
        company_name = ${company_name},
        email = ${email},
        cin = ${cin},
        location = ${location},
        phone = ${phone},
        password = ${password}, 
        update_at = NOW()
      WHERE id = ${id}
      RETURNING *;
    `;

    return updatedUser[0];
  } catch (err) {
    throw err;
  }
};
