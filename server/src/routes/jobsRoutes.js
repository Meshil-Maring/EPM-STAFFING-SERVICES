import express from "express";
import {
  createJobContoller,
  getJobsByUserIdController,
  updateByJobIdController,
  deleteByJobIdController,
} from "../controller/jobs.controller.js";

const router = express.Router();

// Routes /api/jobs

// GET -> fetching job by user id
router.get("/:user_id", getJobsByUserIdController);

// UPDATE (PUT) -> update the job
router.put("/update/:job_id", updateByJobIdController);

// DELETE -> delete job
router.delete("/:job_id", deleteByJobIdController);

export default router;
