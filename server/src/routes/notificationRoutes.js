import express from "express";
import { getClientNotificationController } from "../controller/notification.js";

const router = express.Router();

// GET /api/notifications/:user_id
router.get("/:user_id", getClientNotificationController);

export default router;
