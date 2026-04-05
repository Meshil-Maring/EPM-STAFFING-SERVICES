import express from "express";
import jobRoutes from "./jobsRoutes.js";
import usersRoutes from "./userRoutes.js";
import userAuthRoutes from "./userAuthRoutes.js";
import dynamicRoutes from "./dynamicRoutes.js";
import adminRoutes from "./adminRoutes.js";
import candidateRoutes from "./candidateRoutes.js";

const router = express.Router();

// BASE route: /api

// user auth routs
router.use("/auth", userAuthRoutes);

router.use("/admin", adminRoutes);

router.use("/candidates", candidateRoutes);

// user routes
router.use("/users", usersRoutes);

// dynamic routes
router.use("/dr", dynamicRoutes);

// jobs routes
router.use("/jobs", jobRoutes);

export default router;
