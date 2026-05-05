import db from "../../config/db.js";

export const getClientNotification = async ({ user_id }) => {
  try {
    const res =
      await db`SELECT * FROM notifications WHERE user_to = ${user_id} AND user_type = admin`;

    return res;
  } catch (err) {
    throw err;
  }
};
