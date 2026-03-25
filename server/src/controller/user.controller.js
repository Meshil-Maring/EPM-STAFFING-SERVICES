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
  getUserByEmail,
  createUserDb,
  updateUserService,
} from "../services/db/user.service.db.js";
import { deleteData } from "../util/dbCrud.js";
import { errorResponse, successResponse } from "../util/response.js";

// Checking UUID is valid or not
const isValidUUID = (id) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id,
  );
};

// Fetching all user
export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  return res.json(users);
};

// Fetching single user by id
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

// Get user by email
export const getUserByEmailController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.query.email);

    if (!user) {
      return errorResponse(res, "User can't found!", 400, err.message);
    }

    return successResponse(res, "Fetched user successfully", user);
  } catch (err) {
    return errorResponse(res, "Failed to fectch user", 400, err.message);
  }
};

// Create an account
export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUserDb(email, hashedPassword);

    await saveSession(req, user.id); // wait session saved

    return successResponse(res, "Account created successfully", user, 200);
  } catch (err) {
    return errorResponse(res, "Failed to create account");
  }
};

// update user data
export const updateUser = async (req, res) => {
  const user_id = req.params.user_id;
  const data = req.body;

  try {
    const result = await updateUserService(user_id, data);

    res.json({
      message: "User updated successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: user account
export const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await deleteData(user_id, "users");

    res.status(200).json({
      success: true,
      message: "User Account deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check user is login or not
export const checkSession = (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      userId: req.session.userId,
    });
  }

  return res.json({
    loggedIn: false,
  });
};

// ================================
// Helper function
// ================================

const saveSession = (req, user_id) => {
  req.session.userId = user_id;

  return new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
