import express from "express";
import { getUsers, getById } from "../controller/user.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getById);

export default router;
