import express from "express";
import { sendOTP } from "../controller/user.auth.controller.js";

const router = express.Router();

router.get("/send-otp", sendOTP);

export default router;
