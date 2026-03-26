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
  getUserByEmailController,
  createUser,
  updateUser,
  deleteUser,
  checkSession,
} from "../controller/user.controller.js";
import {
  createController,
  getByUserIdController,
  updateByIdController,
} from "../util/controller.js";

/**
 * Create Express router instance for user-related routes
 */
const router = express.Router();

/**
 * User API endpoints
 * Base path: /api/users
 */

// GET the user data
router.get("", getUserByEmailController); // fetching the users data by email
router.get("/all", getUsers); // retrieve all the users data
// router.get("/:id", getById); // retrieve single user data

router.get("/check-session", checkSession);

// POST
router.post("/create_account", createUser); // Create a new users

// PUT: update user data
// router.patch("/:user_id", updateUser);

// DELETE
router.delete("/:user_id", deleteUser);

// ================================================
//                Others Routes
// ================================================
/**
 * User API endpoints
 * Base path: /api/users
 */
router.post("/create/:table", createController);

// update
router.patch("/update/:table/:id", updateByIdController);

// feching value by id
router.get("/get/:table/:user_id", getByUserIdController);

export default router;
