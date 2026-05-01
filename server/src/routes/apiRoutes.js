import express from "express";
import jobRoutes from "./jobsRoutes.js";
import usersRoutes from "./userRoutes.js";
import userAuthRoutes from "./userAuthRoutes.js";
import dynamicRoutes from "./dynamicRoutes.js";
import adminRoutes from "./adminRoutes.js";
import candidateRoutes from "./candidateRoutes.js";
import interviewRoutes from "./interviewRoutes.js";
import { checkAuth } from "../controller/session.controller.js";

const router = express.Router();

// BASE route: /api

// user auth routs
router.use("/auth", userAuthRoutes);

router.use("/admin", checkAuth, adminRoutes);

router.use("/candidates", checkAuth, candidateRoutes);

router.use("/interviews", checkAuth, interviewRoutes);

// user routes
router.use("/users", usersRoutes);

// dynamic routes
router.use("/dr", checkAuth, dynamicRoutes);

// jobs routes
router.use("/jobs", checkAuth, jobRoutes);

export default router;
