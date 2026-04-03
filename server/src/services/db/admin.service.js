import db from "../../config/db.js";

export const unfollowUser = async (followerId, followingId) => {
  try {
    const res =
      await db`DELETE FROM follow_users WHERE follower_id = ${followerId} AND following_id = ${followingId}`;

    return res;
  } catch (err) {
    throw err;
  }
};
