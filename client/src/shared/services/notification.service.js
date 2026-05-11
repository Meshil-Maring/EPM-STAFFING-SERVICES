import { insertDataService, updateByIdService } from '../../api/features/dynamic.service';
import { getAdminNotification as fetchAdminNotification } from '../../api/features/notification.service';

const API_URL = import.meta.env.VITE_URL;

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

export const getClientNotification = async (user_id) => {
  const res = await fetch(`${API_URL}/api/notifications/${user_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
};

export const getAdminNotification = fetchAdminNotification;

export const updateNotification = async (notification_id) => {
  const res = await updateByIdService(
    'api/dr/update/id',
    { is_read: true },
    'notifications',
    notification_id
  );
  return res;
};
