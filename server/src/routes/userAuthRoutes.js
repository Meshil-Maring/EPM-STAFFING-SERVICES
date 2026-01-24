import express from "express";
import { sendMailController } from "../controller/user.auth.controller.js";

const router = express.Router();

router.get("/send-otp", sendMailController);

export default router;
