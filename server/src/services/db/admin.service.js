import db from "../../config/db.js";

export const unfollowUser = async (followerId, followingId) => {
  try {
    const res =
      await db`DELETE FROM follow_clients WHERE follower_id = ${followerId} AND following_id = ${followingId} RETURNING *`;

    return res;
  } catch (err) {
    throw err;
  }
};

// remove from list
export const removeList = async (jobId, clientId) => {
  console.log(jobId, clientId);

  try {
    const res =
      await db`DELETE FROM listed_jobs WHERE job_id = ${jobId} AND client_id = ${clientId}`;

    return res;
  } catch (err) {
    throw err;
  }
};
