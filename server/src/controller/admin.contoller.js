import { unfollowUser, removeList } from "../services/db/admin.service.js";
import { errorResponse, successResponse } from "../util/response.js";

// unfollower user
export const unfollowUserController = async (req, res) => {
  const { followerId, followingId } = req.query;

  try {
    const res = await unfollowUser(followerId, followingId);

    return successResponse(res, "Unfollow successfull", res, 200);
  } catch (err) {
    return errorResponse(res, "Failed to delete", 400, err.message);
  }
};

// remove from list
export const removeListController = async (req, res) => {
  const { jobId, clientId } = req.query;

  try {
    const res = await removeList(jobId, clientId);

    return successResponse(res, "Remove list successfull", res, 200);
  } catch (err) {
    return errorResponse(res, "Failed to remove list", 400, err.message);
  }
};
