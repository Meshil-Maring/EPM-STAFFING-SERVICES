import db from "../../config/db.js";

export const getClientNotification = async (user_id) => {
  try {
    const res =
      await db`SELECT * FROM notifications WHERE user_to = ${user_id} ORDER BY created_at DESC`;

    return res;
  } catch (err) {
    throw err;
  }
};
