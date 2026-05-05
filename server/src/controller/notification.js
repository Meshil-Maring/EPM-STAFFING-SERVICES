import { getClientNotification } from "../services/db/notification.service.js";
import { errorResponse, successResponse } from "../util/response.js";

export const getClientNotificationController = async (req, res) => {
  const { user_id } = req.params;
  y;

  try {
    const result = await getClientNotification(user_id);

    successResponse(res, "Fetch successful", result);
  } catch (err) {
    errorResponse(res, "Failed", 400, err.message);
    console.log(err);
    throw err;
  }
};
