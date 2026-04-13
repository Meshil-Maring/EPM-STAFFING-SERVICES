import { successResponse, errorResponse } from "../util/response.js";
import {
  getAllUserJobInfo,
  getJobOverviewService,
} from "../services/db/jobs.service.db.js";

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

// ==========================================
//              GET
// ==========================================

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

export const getJobOverviewController = async (req, res) => {
  const { job_id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const per_page = 10;

  try {
    const result = await getJobOverviewService(job_id, page, per_page);
    return successResponse(res, "Job overview fetch successfully", result, 200);
  } catch (err) {
    return errorResponse(res, "Failed to fetched job overview", 404);
  }
};

// ==========================================
//              UPDATE
// ==========================================

// UPDATE (PATCH) : api/jobs/update/:job_id
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

// ==========================================
//              DELETE
// ==========================================

// DELETE : api/jobs/:job_id
export const deleteByJobIdController = async (req, res) => {
  const job_id = req.params.job_id;

  job_id;

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
//                  ALL
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
