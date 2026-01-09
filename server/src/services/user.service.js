import sql from "../config/db.js";

export const getAllUsers = async () => {
  const users = await sql`
    SELECT * FROM users
  `;

  return users;
};

export const getUserById = async (id) => {
  const user = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;
};
