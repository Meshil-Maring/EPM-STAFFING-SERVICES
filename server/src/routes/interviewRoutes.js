import express from "express";
import { getInterviewController } from "../controller/inteview.controller.js";

const router = express.Router();

// get interview pipeline
router.get("/get/interviews-pipeline/:id", getInterviewController);

export default router;
