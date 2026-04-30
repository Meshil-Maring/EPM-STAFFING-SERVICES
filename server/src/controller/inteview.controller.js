import { getInterviewPipeline } from "../services/db/interview.service.js";
import { errorResponse, successResponse } from "../util/response.js";

export const getInterviewController = async (req, res) => {
  const { id } = req.params;
  const { stage } = req.query;

  try {
    const result = await getInterviewPipeline(stage, id);

    console.log(result);

    return successResponse(res, "Fetched successfully", result, 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
