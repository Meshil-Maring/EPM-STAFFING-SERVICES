/**
 * User routes module
 *
 * Defines all API endpoints related to user management operations including
 * retrieving user data and creating new users. This router handles requests
 * under the '/api' base path.
 */

import express from "express";
import {
  getUsers,
  getById,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/user.controller.js";
import companyRoutes from "../routes/user/companyRoutes.js";

/**
 * Create Express router instance for user-related routes
 */
const router = express.Router();

/**
 * User API endpoints
 * Base path: /api/users
 */

// GET the user data
router.get("", getUsers); // retrieve all the users data
router.get("/:id", getById); // retrieve single user data

// POST
router.post("", createUser); // Create a new users

// PUT: update user data
router.patch("/:user_id", updateUser);

// DELETE
router.delete("/:user_id", deleteUser);

// Company Routes
router.use("/company", companyRoutes);

export default router;
