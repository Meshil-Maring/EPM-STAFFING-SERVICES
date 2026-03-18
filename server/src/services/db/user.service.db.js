/**
 * User database service module
 *
 * Contains database operations for user management including retrieving all users,
 * getting a specific user by ID, and creating new users. This module uses the
 * postgres library for database queries and handles error cases appropriately.
 */

import sql from "../../config/db.js";

/**
 * Retrieve all users from the database
 * @returns {Promise<Array>} Promise resolving to array of all users
 * @throws {Error} If no users are found or database query fails
 */
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

/**
 * Retrieve a specific user by their ID
 * @param {string} id - The UUID of the user to retrieve
 * @returns {Promise<Object>} Promise resolving to the user object
 * @throws {Error} If user is not found or database query fails
 */
export const getUserById = async (id) => {
  const user = await sql`SELECT * FROM users WHERE id = ${id}`;

  if (!user || user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
};

/**
 * Create a new user in the database
 * @param {string} company_name - The company name
 * @param {string} email - The user's email address
 * @param {string} cin - The company's CIN number
 * @param {string} location - The company's location
 * @param {string} phone - The company's phone number
 * @param {string} password - The hashed password
 * @returns {Promise<Object>} Promise resolving to the created user object
 * @throws {Error} If database query fails
 */
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
