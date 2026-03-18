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
} from "../controller/user.controller.js";

/**
 * Create Express router instance for user-related routes
 */
const router = express.Router();

/**
 * User API endpoints
 * Base path: /api
 */

// GET the user data
router.get("/users", getUsers); // retrieve all the users data
router.get("/users/:id", getById); // retrieve single user data

// POST
router.post("/users", createUser); // Create a new users

// // PATCH
// router.patch("/api/user/:id"); // update partial user

export default router;
