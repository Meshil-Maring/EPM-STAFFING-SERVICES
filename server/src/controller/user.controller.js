/**
 * User controller module
 *
 * Contains all the business logic for user-related operations including
 * retrieving user data, creating new users, and validating user IDs.
 * This controller handles HTTP requests and responses for user management.
 */

import bcrypt from "bcrypt";

import {
  getAllUsers,
  getUserById,
  createUserDb,
} from "../services/db/user.service.db.js";

/**
 * Validates if a given string is a valid UUID format
 * @param {string} id - The ID string to validate
 * @returns {boolean} True if the ID is a valid UUID format, false otherwise
 */
const isValidUUID = (id) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    id,
  );
};

/**
 * Retrieve all users data from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with all users data
 */
export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

/**
 * Retrieve a single user's data by ID
 * @param {Object} req - Express request object containing user ID in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user data or error message
 */
export const getById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate UUID format before querying database
    if (!isValidUUID(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
      });
    }

    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

/**
 * Create a new user account
 * @param {Object} req - Express request object containing user data in body
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success message and user data or error
 */
export const createUser = async (req, res) => {
  try {
    const { email, password, role, active } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(email, hashedPassword, role, active);

    const user = await createUserDb(email, hashedPassword, role, active);

    // Set session user ID for authentication
    req.session.userId = user.id;

    // Save session and return success response
    req.session.save(() => {
      res.status(201).json({
        message: "Account created successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
