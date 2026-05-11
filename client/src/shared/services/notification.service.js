import { getByColumnName, getByUserIdService, insertDataService, updateByIdService } from '../../api/features/dynamic.service';

/**
 * Push a new notification
 */
export const pushNotification = async (notificationData) => {
  const {
    reference_id,
    user_id,
    type,
    title,
    message,
    user_type,
    reference_type,
    user_to = null,
  } = notificationData;

  const res = await insertDataService('api/dr/insert', 'notifications', {
    reference_id,
    user_id,
    type,
    title,
    message,
    user_type,
    reference_type,
    user_to,
  });

  return res;
};

/**
 * Get client notifications
 */
export const getClientNotification = async (user_id) => {
  const res = await getByUserIdService('api/users/get', 'notifications', user_id);

  console.log(res);
  
  return res;
};

/**
 * Get admin notifications
 */
export const getAdminNotification = async () => {
  const res = await getByColumnName('api/dr/get', 'notifications', 'user_type', 'client');
  return res;
};

/**
 * Mark notification as read
 */
export const updateNotification = async (notification_id) => {
  const res = await updateByIdService(
    'api/dr/update/id',
    { is_read: true },
    'notifications',
    notification_id
  );

  return res;
};
