import express from "express";
import { createJobContoller } from "../controller/jobs.controller";

const router = express.Router();

// Routes /api

// POST -> post job
router.post("/jobs", createJobContoller);
