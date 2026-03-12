import sql from "../../config/db.js";

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
  email,
  hashedPassword,
  role,
  active,
  description,
) => {
  try {
    const result =
      await sql`INSERT INTO users (email, password, role, active, description) VALUES (${email}, ${hashedPassword}, ${role}, ${active}, ${description}) RETURNING *`;

    return result[0];
  } catch (err) {
    throw err;
  }
};
