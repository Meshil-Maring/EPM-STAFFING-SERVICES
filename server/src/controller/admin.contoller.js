import { unfollowUser } from "../services/db/admin.service.js";
import { errorResponse, successResponse } from "../util/response.js";

export const unfollowUserController = async (req, res) => {
  const { followerId, followingId } = req.query;

  try {
    const res = await unfollowUser(followerId, followingId);

    return successResponse(res, "Unfollow successfull", res, 200);
  } catch (err) {
    return errorResponse(res, "Failed to delete", 400, err.message);
  }
};
