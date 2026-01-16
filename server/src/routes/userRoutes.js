import express from "express";
import {
  getUsers,
  getById,
  createUser,
  deleteById,
  updateUser,
} from "../controller/user.controller.js";

const router = express.Router();

// routes: api/

// GET the user data
router.get("/users", getUsers); // retrieve all the users data
router.get("/users/:id", getById); // retrieve single user data

// POST
router.post("/users", createUser); // Create a new users

// DELETE
router.delete("/users/:id", deleteById);

// // PUT
router.put("/users/:id", updateUser); // update user account

export default router;
