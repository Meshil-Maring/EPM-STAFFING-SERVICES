import express from "express";
import { unfollowUserController } from "../controller/admin.contoller.js";

const router = express.Router();

// BASE routes = api/admin
router.delete("/unfollow/:table", unfollowUserController);

export default router;
