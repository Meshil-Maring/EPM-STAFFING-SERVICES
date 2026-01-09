import sql from "../config/db.js";

export const getAllUsers = async () => {
  const users = await sql`
    SELECT * FROM users
  `;

  return users;
};
