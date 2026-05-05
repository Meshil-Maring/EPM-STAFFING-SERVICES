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
  getUserByEmailController,
  createUser,
  deleteUser,
  loginController,
  getUsersFullData,
  updateUser,
} from "../controller/user.controller.js";
import { checkAuth, checkSession } from "../controller/session.controller.js";
import {
  getByUserIdController,
  insertController,
  updateByIdController,
} from "../util/controller.js";

import { getAllJobDetailsContoller } from "../controller/jobs.controller.js";
import { getClientNotificationController } from "../controller/notification.js";

/**
 * Create Express router instance for user-related routes
 */
const router = express.Router();

/**
 * User API endpoints
 * Base path: /api/users
 */

// LOG IN
router.post("/login", loginController);

// GET the user data
router.get("", getUserByEmailController); // fetching the users data by email

router.get("/all", getUsers); // retrieve all the users data
// router.get("/:id", getById); // retrieve single user data

router.get("/check-session", checkSession);

// POST
router.post("/create_account", createUser); // Create a new users

// DELETE
router.delete("/:user_id", checkAuth, deleteUser);

// ================================================
//                UPDATE Routes
// ================================================
/**
 * User API endpoints
 * Base path: /api/users
 */
// const res = await fetch(`${API_ROUTES}/api/users/update/${id}`);
// update by id
router.patch("/update/:table/id/:id", checkAuth, updateByIdController);

// update users table
router.patch("/update/:table/user_id/:user_id", checkAuth, updateUser);

// ================================================
//                Others Routes
// ================================================
/**
 * User API endpoints
 * Base path: /api/users
 */
router.post("/create/:table", checkAuth, insertController);

// feching value by id
router.get("/get/:table/:user_id", checkAuth, getByUserIdController);

// ================================================
//                User All info
// ================================================
/**
 * User API endpoints
 * Base path: /api/users
 */
router.get("/get/users-full-data", checkAuth, getUsersFullData);
router.get("/get-all-jobs-details", checkAuth, getAllJobDetailsContoller);

// ================================================
//                User All info
// ================================================
router.get(
  "/get/notifications/user_id",
  checkAuth,
  getClientNotificationController,
);

export default router;
