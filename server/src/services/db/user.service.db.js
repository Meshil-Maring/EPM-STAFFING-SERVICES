/**
 * User database service module
 *
 * Contains database operations for user management including retrieving all users,
 * getting a specific user by ID, and creating new users. This module uses the
 * postgres library for database queries and handles error cases appropriately.
 */

import db from "../../config/db.js";
import bcrypt from "bcrypt";

// GET: fetching all user
export const getAllUsers = async () => {
  try {
    const users = await db`
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
// GET: user by id
export const getUserById = async (id) => {
  const user = await db`SELECT * FROM users WHERE id = ${id}`;

  if (!user || user.length === 0) {
    throw new Error("User not found");
  }

  return user[0];
};

// GET: user by email
export const getUserByEmail = async (email) => {
  try {
    const user = await db`SELECT * FROM users WHERE email = ${email}`;

    if (!user || user.length === 0) {
      throw new Error("User not found");
    }

    return user[0];
  } catch (err) {
    throw err;
  }
};

// Create User account
export const createUserDb = async (email, hashedPassword) => {
  try {
    const result =
      await db`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword}) RETURNING *`;

    return result[0];
  } catch (err) {
    throw err;
  }
};

// UPDATE: user account
export const updateUserService = async (id, data) => {
  const updateData = {};

  if (data.email) {
    updateData.email = data.email;
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    updateData.password = hashedPassword;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("No data provided to update");
  }

  try {
    const result =
      await db`UPDATE ${db("users")} SET ${db(updateData)} WHERE id = ${id} RETURNING id, email`;

    return result[0];
  } catch (err) {
    throw err;
  }
};
