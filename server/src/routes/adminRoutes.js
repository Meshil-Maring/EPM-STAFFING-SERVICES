import express from "express";
import {
  unfollowUserController,
  removeListController,
} from "../controller/admin.contoller.js";
import { checkAuth } from "../controller/session.controller.js";

const router = express.Router();

// BASE routes = api/admin
// This is for testing only
router.delete("/unfollow/:table", checkAuth, unfollowUserController);
router.delete("/remove-list/:table", checkAuth, removeListController);

export default router;
