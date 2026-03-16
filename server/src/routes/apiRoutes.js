import express from "express";
import jobRoutes from "./jobsRoutes.js";

const router = express.Router();

// jobs routes
router.use("/jobs", jobRoutes);

export default router;
