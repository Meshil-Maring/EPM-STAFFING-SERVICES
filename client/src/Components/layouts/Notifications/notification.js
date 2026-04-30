import {
  getByColumnName,
  updateByIdService,
} from "../../../services/dynamic.service";

export const getClientNotification = async () => {
  const res = await getByColumnName(
    "api/dr/get",
    "notifications",
    "user_type",
    "client",
  );

  return res;
};

export const getAdminNotification = async () => {
  const res = await getByColumnName(
    "api/dr/get",
    "notifications",
    "user_type",
    "admin",
  );

  return res;
};

export const updateNotification = async (notification_id) => {
  const res = await updateByIdService(
    "api/dr/update/id",
    {
      is_read: true,
    },
    "notifications",
    notification_id,
  );

  return res;
};
