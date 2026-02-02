import express from "express";
import {
  resendOTPController,
  sendMailController,
  verifiedOTPContoller,
} from "../controller/user.auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendMailController);
router.post("/verify-otp", verifiedOTPContoller);
router.post("/resend-otp", resendOTPController);

export default router;
