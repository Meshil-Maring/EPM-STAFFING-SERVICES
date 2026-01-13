import express from "express";
import {
  getUsers,
  getById,
  createUser,
  deleteById,
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

// // PATCH
// router.patch("/api/user/:id"); // update partial user

export default router;
