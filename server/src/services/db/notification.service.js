import db from "../../config/db.js";

export const getClientNotification = async (user_id) => {
  try {
    // Delete read notifications older than 1 day for this user
    await db`
      DELETE FROM notifications
      WHERE user_to = ${user_id}
        AND is_read = true
        AND created_at < NOW() - INTERVAL '1 day'
    `;

    const res = await db`
      SELECT * FROM notifications
      WHERE user_to = ${user_id}
      ORDER BY created_at DESC
    `;

    return res;
  } catch (err) {
    throw err;
  }
};

export const getAdminNotification = async () => {
  try {
    // Delete read notifications older than 1 day visible to admin
    await db`
      DELETE FROM notifications
      WHERE user_type = 'client'
        AND is_read = true
        AND created_at < NOW() - INTERVAL '1 day'
    `;

    const res = await db`
      SELECT * FROM notifications
      WHERE user_type = 'client'
      ORDER BY created_at DESC
    `;

    return res;
  } catch (err) {
    throw err;
  }
};
