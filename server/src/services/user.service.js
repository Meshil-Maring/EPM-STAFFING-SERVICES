import sql from "../config/db.js";

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
      await sql`INSERT INTO users (company_name, email, cin, location, phone, password) VALUES (${company_name}, ${email}, ${cin}, ${location}, ${phone}, ${password}) RETURNING *`;

    return result[0];
  } catch (err) {
    throw err;
  }
};
