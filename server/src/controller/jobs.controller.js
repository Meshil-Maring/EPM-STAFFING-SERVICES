import { successResponse, errorResponse } from "../util/response.js";
import { getAllUserJobInfo } from "../services/db/jobs.service.db.js";

import {
  createJob,
  getJobsByUserId,
  updateByJobId,
  deleteByJobId,
} from "../services/db/jobs.service.db.js";

// POST : api/jobs -> create jobs
export const createJobContoller = async (req, res) => {
  try {
    const result = await createJob(req.body);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// GET: api/jobs/:user_id -> get jobs by user id
export const getJobsByUserIdController = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const result = await getJobsByUserId(user_id);

    res.status(201).json({
      success: true,
      message: "Fetch jobs by user id successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE (PUT) : api/jobs/update/:job_id
export const updateByJobIdController = async (req, res) => {
  const job_id = req.params.job_id;
  const data = req.body;

  try {
    const result = await updateByJobId(job_id, data);

    res.status(201).json({
      success: true,
      message: "Job update successfully.",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE : api/jobs/:job_id
export const deleteByJobIdController = async (req, res) => {
  const job_id = req.params.job_id;

  console.log(job_id);

  try {
    const result = await deleteByJobId(job_id);

    res.status(201).json({
      success: true,
      message: "Job delete successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================================
//          All
// ==========================================

export const getAllJobDetailsContoller = async (req, res) => {
  try {
    const job_info = await getAllUserJobInfo();

    return successResponse(
      res,
      "Fetching all user job info successfully",
      job_info,
      200,
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
